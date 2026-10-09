/**
 * HTTP helper: timeout, thử lại, User-Agent nhận diện được.
 * Petrolimex là nguồn công khai, mỗi lần chạy chỉ gọi vài request.
 */
const USER_AGENT =
  "Mozilla/5.0 (compatible; WrenAppGasUpdater/1.0; +https://github.com/nguyenquocanhz/zalo-zipcode-app)";

async function request(url, { timeoutMs = 20000, retries = 2 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} khi tải ${url}`);
      return res;
    } catch (err) {
      lastError = err;
      if (attempt < retries) await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function fetchText(url, opts) {
  return (await request(url, opts)).text();
}

async function fetchBuffer(url, opts) {
  return Buffer.from(await (await request(url, opts)).arrayBuffer());
}

module.exports = { fetchText, fetchBuffer, USER_AGENT };
