/**
 * Tự động tạo mã QR Zalo Login, đếm ngược 180 giây và tự động làm mới khi hết hạn.
 * Tích hợp Zalo Bot tự động gửi cảnh báo và ảnh mã QR trực tiếp vào Zalo người dùng.
 * Khi người dùng quét mã thành công, tự động lưu ZMP_TOKEN vào .env.
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const zaloLogin = require('../node_modules/zmp-cli/login/utils/zalo-login');
const zaloBot = require('./zalo-bot');

const CWD = path.resolve(__dirname, '..');
const ENV_PATH = path.join(CWD, '.env');
const QR_IMG_PATH = path.join(CWD, 'zalo_login_qr.png');
const BRAIN_DIR = 'C:/Users/ACER/.gemini/antigravity/brain/4cdd7cfa-a229-4311-95b4-1596f11faffe';
const BRAIN_QR_PATH = path.join(BRAIN_DIR, 'zalo_login_qr.png');
const APP_ID = '2522725584854781271';
const SESSION_TTL_SEC = 180; // Thời gian sống phiên: 180 giây (3 phút)

function updateEnvToken(token) {
  let content = '';
  if (fs.existsSync(ENV_PATH)) {
    content = fs.readFileSync(ENV_PATH, 'utf8');
  }

  if (content.includes('ZMP_TOKEN=')) {
    content = content.replace(/ZMP_TOKEN=.*(?:\r?\n|$)/, `ZMP_TOKEN=${token}\n`);
  } else {
    content += (content.endsWith('\n') || !content ? '' : '\n') + `ZMP_TOKEN=${token}\n`;
  }

  fs.writeFileSync(ENV_PATH, content, 'utf8');
  console.log('\n======================================================');
  console.log('✓ ĐÃ LƯU ZMP_TOKEN MỚI VÀO .env THÀNH CÔNG!');
  console.log('======================================================\n');
}

async function requestAndRunSession(sessionIndex, chatId) {
  console.log(`\n------------------------------------------------------`);
  console.log(`[Phiên #${sessionIndex}] Đang yêu cầu mã QR đăng nhập từ Zalo...`);
  console.log(`------------------------------------------------------`);

  let res;
  try {
    res = await zaloLogin.getQRCode(APP_ID);
  } catch (err) {
    console.error('❌ Lỗi kết nối tới Zalo Gateway:', err.message);
    await new Promise(r => setTimeout(r, 3000));
    return false;
  }

  const payload = res && res.data && res.data.data;
  if (!payload || !payload.zmpsk || !payload.loginUrl) {
    console.error('❌ Phản hồi Zalo không hợp lệ:', res ? res.data : 'Empty');
    await new Promise(r => setTimeout(r, 3000));
    return false;
  }

  const { zmpsk, loginUrl } = payload;

  // 1. Tạo file ảnh PNG chất lượng cao
  try {
    await QRCode.toFile(QR_IMG_PATH, loginUrl, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' }
    });
    if (fs.existsSync(BRAIN_DIR)) {
      fs.copyFileSync(QR_IMG_PATH, BRAIN_QR_PATH);
    }
  } catch (e) {
    console.warn('Cảnh báo ghi file QR:', e.message);
  }

  console.log(`\n🔗 LINK XÁC THỰC ZALO (Bấm trực tiếp trên điện thoại):`);
  console.log(`👉 ${loginUrl}\n`);
  console.log(`📸 File ảnh QR đã được lưu/cập nhật tại: zalo_login_qr.png`);

  // Hiển thị mã QR dạng ASCII trong terminal
  qrcodeTerminal.generate(loginUrl, { small: true }, (ascii) => {
    console.log(ascii);
  });

  // 2. Gửi thông báo kèm ảnh QR qua Zalo Bot (nếu đã có chatId)
  let currentChatId = chatId || zaloBot.getStoredChatId();
  if (currentChatId) {
    console.log(`🤖 [ZaloBot] Đang tự động gửi cảnh báo & ảnh QR vào Zalo (${currentChatId})...`);
    zaloBot.sendLoginAlert(currentChatId, loginUrl, sessionIndex, SESSION_TTL_SEC).catch(err => {
      console.warn('⚠️ Lỗi gửi cảnh báo ZaloBot:', err.message);
    });
  } else {
    console.log(`💡 [Mẹo ZaloBot] Gửi bất kỳ tin nhắn nào tới "Bot WrenSoft" trên Zalo để bot tự gửi ảnh QR qua chat!`);
  }

  // 3. Vòng lặp đếm ngược và kiểm tra trạng thái xác thực
  let timeLeft = SESSION_TTL_SEC;
  const pollInterval = 2; // kiểm tra mỗi 2 giây

  while (timeLeft > 0) {
    process.stdout.write(`\r⏳ Đang chờ quét Zalo... [Còn ${String(timeLeft).padStart(3, ' ')}s / ${SESSION_TTL_SEC}s] `);

    // Nếu chưa có chatId, tranh thủ kiểm tra xem người dùng có vừa nhắn tin cho bot không
    if (!currentChatId && timeLeft % 6 === 0) {
      zaloBot.getUpdates(1).then(data => {
        if (data && data.ok) {
          const item = Array.isArray(data.result) ? data.result[0] : data.result;
          const newId = item && item.message && item.message.chat && item.message.chat.id;
          if (newId) {
            currentChatId = newId;
            zaloBot.updateEnv('ZALO_CHAT_ID', newId);
            console.log(`\n✓ [ZaloBot] Đã kết nối Zalo người dùng (${newId})! Gửi QR ngay lập tức...`);
            zaloBot.sendLoginAlert(currentChatId, loginUrl, sessionIndex, timeLeft);
          }
        }
      }).catch(() => {});
    }

    try {
      const statusRes = await zaloLogin.checkStatus(zmpsk);
      const data = statusRes && statusRes.data;

      if (data && data.err >= 0 && data.data && data.data.jwt) {
        process.stdout.write('\r                                                                       \r');
        console.log(`\n🎉 BẠN ĐÃ XÁC NHẬN ĐĂNG NHẬP THÀNH CÔNG!`);
        updateEnvToken(data.data.jwt);

        // Gửi thông báo hoàn tất qua bot
        if (currentChatId) {
          await zaloBot.sendSuccessAlert(currentChatId, sessionIndex).catch(() => {});
        }
        return true;
      }

      if (data && data.err === -2003) {
        break;
      }
    } catch (err) {
      // bỏ qua lỗi mạng chập chờn khi polling
    }

    await new Promise(r => setTimeout(r, pollInterval * 1000));
    timeLeft -= pollInterval;
  }

  process.stdout.write('\r                                                                       \r');
  console.log(`⚠️ Phiên QR #${sessionIndex} đã hết hạn (${SESSION_TTL_SEC}s). Đang tự động làm mới phiên tiếp theo...`);
  return false;
}

async function main() {
  console.log('======================================================');
  console.log('  ZALO MINI APP - ĐẾM NGƯỢC, LÀM MỚI & BÁO QUA ZALOBOT');
  console.log(`  Thời hạn phiên: ${SESSION_TTL_SEC} giây (3 phút) | Bot: Bot WrenSoft`);
  console.log('======================================================');

  let chatId = zaloBot.getStoredChatId();
  if (!chatId) {
    console.log('🔍 Chưa có ZALO_CHAT_ID trong .env.');
    console.log('👉 Vui lòng mở Zalo trên điện thoại, tìm bot "Bot WrenSoft" (bot.owLAvTnS)');
    console.log('   và gửi 1 tin nhắn (ví dụ: "hi" hoặc "ok") để bot nhận diện.');
    console.log('   (Script sẽ tự động bắt và gửi ảnh QR ngay khi bạn nhắn)\n');
  } else {
    console.log(`✓ Đã nhận diện ZALO_CHAT_ID: ${chatId}`);
  }

  let sessionCount = 1;
  while (true) {
    const success = await requestAndRunSession(sessionCount, chatId);
    if (success) {
      process.exit(0);
    }
    sessionCount++;
  }
}

main();
