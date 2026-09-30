/**
 * Zalo Mini App Production-Grade Webhook Receiver Server
 * 
 * Complies with Zalo Platform Open API specifications:
 * - Standard HTTP POST receiver at /api/zalo-webhook
 * - Verifies x-zevent-signature using SHA-256 (Alphabetical key sorting + API Key)
 * - Immediate HTTP 200 response within 2000ms SLA
 * - Supports Decree 13 (Nghị định 13/2023/NĐ-CP) user data deletion events
 * - Pure Node.js (zero external dependencies)
 */

const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 1. Load configuration from .env if present
function loadEnv() {
  const envPath = path.resolve(__dirname, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        env[key] = val;
      }
    }
  }
  return env;
}

const env = loadEnv();
const PORT = process.env.PORT || env.WEBHOOK_PORT || 8086;
const API_KEY = process.env.ZALO_API_KEY || env.ZALO_API_KEY || '';
const APP_ID = process.env.APP_ID || env.APP_ID || '2522725584854781271';

/**
 * 2. Zalo Webhook Signature Verification Algorithm:
 * - Extract all keys from payload object (except signature headers)
 * - Sort keys alphabetically (A-Z)
 * - Concatenate values + apiKey
 * - sha256 hex digest
 */
function buildConcatenatedContent(payload, apiKey) {
  const sortedKeys = Object.keys(payload)
    .filter((k) => k !== 'signature' && k !== 'mac' && k !== 'x-zevent-signature')
    .sort();

  let concatenated = '';
  for (const key of sortedKeys) {
    const val = payload[key];
    if (val !== undefined && val !== null) {
      if (typeof val === 'object') {
        concatenated += JSON.stringify(val);
      } else {
        concatenated += String(val);
      }
    }
  }

  concatenated += apiKey;
  return { concatenated, sortedKeys };
}

function verifyZaloSignature(payload, apiKey, receivedSignature) {
  if (!apiKey) {
    // If no API Key configured, skip verification with a warning
    return {
      isValid: true,
      skipped: true,
      message: 'No ZALO_API_KEY set in .env. Signature verification skipped.',
    };
  }

  if (!receivedSignature) {
    return {
      isValid: false,
      skipped: false,
      message: 'Missing x-zevent-signature header in request.',
    };
  }

  const { concatenated, sortedKeys } = buildConcatenatedContent(payload, apiKey);
  const expectedSignature = crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');
  const isValid = receivedSignature.trim().toLowerCase() === expectedSignature.toLowerCase();

  return {
    isValid,
    expectedSignature,
    sortedKeys,
    concatenated,
    skipped: false,
  };
}

function generateSignature(payload, apiKey) {
  const { concatenated } = buildConcatenatedContent(payload, apiKey);
  return crypto.createHash('sha256').update(concatenated, 'utf8').digest('hex');
}

/**
 * 3. Event Handlers
 */
async function handleWebhookEvent(eventPayload) {
  const eventName = eventPayload.event || 'unknown';
  console.log(`[Zalo Webhook] Received Event: "${eventName}" at ${new Date().toISOString()}`);

  switch (eventName) {
    case 'user.revoke.consent':
    case 'user_delete_data':
      // Compliance with Decree 13/2023/ND-CP on Personal Data Protection
      console.log('[Decree 13] User revoked consent or requested data deletion:');
      console.log(`  -> User ID: ${eventPayload.userId || eventPayload.uid}`);
      console.log(`  -> App ID: ${eventPayload.appId}`);
      console.log(`  -> Timestamp: ${eventPayload.timestamp}`);
      // Perform database cleanup or flag user as deleted here
      break;

    case 'app_version_status':
      console.log('[App Version Status Update]:');
      console.log(`  -> Version: ${eventPayload.version}`);
      console.log(`  -> Status: ${eventPayload.status} (${eventPayload.status === 'APPROVED' ? 'Approved' : 'Rejected'})`);
      break;

    case 'payment_callback':
      console.log('[Payment Transaction Update]:');
      console.log(`  -> Order ID: ${eventPayload.orderId}`);
      console.log(`  -> Status: ${eventPayload.status}`);
      console.log(`  -> Amount: ${eventPayload.amount}`);
      break;

    default:
      console.log('[Unhandled Event]:', JSON.stringify(eventPayload, null, 2));
      break;
  }
}

/**
 * 4. HTTP Server
 */
const server = http.createServer(async (req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-zevent-signature, authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'UP',
        service: 'Zalo Mini App Webhook Receiver',
        appId: APP_ID,
        apiKeyConfigured: Boolean(API_KEY),
        endpoint: '/api/zalo-webhook',
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // Webhook receiver endpoint
  if (req.method === 'POST') {
    let rawBody = '';
    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', async () => {
      let payload = null;
      try {
        payload = JSON.parse(rawBody);
      } catch (err) {
        console.error('[Zalo Webhook] Failed to parse JSON body:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 400, message: 'Invalid JSON payload' }));
        return;
      }

      const receivedSignature =
        req.headers['x-zevent-signature'] ||
        req.headers['x-event-signature'] ||
        req.headers['signature'];

      const verifyResult = verifyZaloSignature(payload, API_KEY, receivedSignature);

      if (!verifyResult.isValid) {
        console.warn('[Zalo Webhook] Signature verification FAILED!');
        console.warn(`  -> Received: ${receivedSignature}`);
        console.warn(`  -> Expected: ${verifyResult.expectedSignature}`);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 401,
            message: 'Invalid signature',
          })
        );
        return;
      }

      // Immediately respond 200 OK (Strict Zalo requirement: < 2000ms)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: 0,
          message: 'Success',
        })
      );

      // Asynchronously process the event
      try {
        await handleWebhookEvent(payload);
      } catch (err) {
        console.error('[Zalo Webhook] Error processing event asynchronously:', err);
      }
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 405, message: 'Method Not Allowed' }));
});

// 5. Self-test CLI Mode
if (process.argv.includes('--test') || process.argv.includes('test')) {
  console.log('--- Testing Zalo Webhook Signature Generation & Verification ---');
  const testKey = API_KEY || 'sample_secret_api_key_123';
  const testPayload = {
    appId: APP_ID,
    event: 'user.revoke.consent',
    timestamp: 1727438400000,
    userId: 'zalo_user_test_999',
  };

  const sig = generateSignature(testPayload, testKey);
  console.log('Payload:', JSON.stringify(testPayload, null, 2));
  console.log('API Key:', testKey);
  console.log('Generated Signature (x-zevent-signature):', sig);

  const verification = verifyZaloSignature(testPayload, testKey, sig);
  console.log('Self Verification Test:', verification.isValid ? 'PASSED' : 'FAILED');
  console.log('-----------------------------------------------------------------');
  process.exit(0);
}

// 6. Start server
server.listen(PORT, () => {
  console.log('========================================================');
  console.log(` Zalo Mini App Webhook Receiver running on port ${PORT}`);
  console.log(` Webhook URL endpoint: http://localhost:${PORT}/api/zalo-webhook`);
  console.log(` Target Mini App ID:   ${APP_ID}`);
  console.log(` API Key Configured:   ${API_KEY ? 'YES (Signature Verification ON)' : 'NO (Skipped until ZALO_API_KEY is provided in .env)'}`);
  console.log('--------------------------------------------------------');
  console.log(' For local testing with Zalo Developer Portal:');
  console.log(` 1. Run: ngrok http ${PORT}`);
  console.log(` 2. Copy HTTPS URL: https://xxxx.ngrok-free.app/api/zalo-webhook`);
  console.log(' 3. Paste into https://mini.zalo.me/developers -> Open APIS -> Webhook URL');
  console.log('========================================================');
});
