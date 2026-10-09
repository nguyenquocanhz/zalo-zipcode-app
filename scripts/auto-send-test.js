/**
 * Script lắng nghe và tự động gửi tin nhắn test ngay khi người dùng nhắn tin cho bot
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const zaloBot = require('./zalo-bot');

const CWD = path.resolve(__dirname, '..');
const BOT_QR_PATH = path.join(CWD, 'bot_chat_qr.png');
const BRAIN_DIR = 'C:/Users/ACER/.gemini/antigravity/brain/4cdd7cfa-a229-4311-95b4-1596f11faffe';
const BOT_LINK = 'https://zalo.me/bot.owLAvTnS';

async function main() {
  console.log('========================================================');
  console.log('🤖 ZALO BOT - ĐANG ĐỢI BẠN MỞ CHAT ĐỂ GỬI TIN NHẮN TEST');
  console.log('========================================================');

  // Tạo mã QR mở trực tiếp đoạn chat với Bot
  try {
    await QRCode.toFile(BOT_QR_PATH, BOT_LINK, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' }
    });
    if (fs.existsSync(BRAIN_DIR)) {
      fs.copyFileSync(BOT_QR_PATH, path.join(BRAIN_DIR, 'bot_chat_qr.png'));
    }
  } catch (e) {
    console.warn('Lỗi tạo ảnh QR:', e.message);
  }

  console.log('\n📱 Link mở chat trực tiếp với bot trên điện thoại:');
  console.log(`👉 ${BOT_LINK}\n`);

  console.log('📸 Quét mã QR này bằng Zalo để mở chat ngay:');
  qrcodeTerminal.generate(BOT_LINK, { small: true }, (ascii) => {
    console.log(ascii);
  });

  console.log('\n⏳ Đang lắng nghe tin nhắn từ bạn (trong 3 phút)...');

  const startTime = Date.now();
  const maxWaitMs = 180 * 1000;

  while (Date.now() - startTime < maxWaitMs) {
    const data = await zaloBot.getUpdates(5);
    if (data && data.ok) {
      let chatId = null;
      let userName = 'bạn';

      if (Array.isArray(data.result)) {
        for (const item of data.result) {
          if (item && item.message && item.message.chat && item.message.chat.id) {
            chatId = item.message.chat.id;
            if (item.message.from && item.message.from.display_name) {
              userName = item.message.from.display_name;
            }
            break;
          }
        }
      } else if (data.result && data.result.message && data.result.message.chat) {
        chatId = data.result.message.chat.id;
        if (data.result.message.from && data.result.message.from.display_name) {
          userName = data.result.message.from.display_name;
        }
      }

      if (chatId) {
        console.log(`\n🎉 ĐÃ NHẬN TIN NHẮN TỪ: ${userName} (chat_id: ${chatId})!`);
        zaloBot.updateEnv('ZALO_CHAT_ID', chatId);

        console.log('🚀 Đang gửi tin nhắn chào mừng và ảnh test...');

        // 1. Gửi tin nhắn text
        const textRes = await zaloBot.sendMessage(
          chatId,
          `👋 **Xin chào ${userName}!**\n\nĐây là tin nhắn test từ **Bot WrenSoft** theo yêu cầu của bạn!\n\n✨ Hệ thống Zalo Mini App **"Tra cứu bưu chính và giá xăng By Wren"** đã kết nối thành công 100% với tài khoản Zalo của bạn.\n\nTừ bây giờ, tất cả thông báo cập nhật, mã QR đăng nhập và cảnh báo sẽ được bot gửi trực tiếp tại đây!`,
          'markdown'
        );
        console.log('✓ Kết quả gửi text:', textRes);

        // 2. Gửi ảnh test qua sendPhoto
        const photoUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=15&data=https%3A%2F%2Fzalo.me';
        const photoRes = await zaloBot.sendPhoto(
          chatId,
          photoUrl,
          '📸 Test gửi hình ảnh thành công từ Bot WrenSoft!'
        );
        console.log('✓ Kết quả gửi photo:', photoRes);

        console.log('\n========================================================');
        console.log('✅ ĐÃ GỬI THÀNH CÔNG TIN NHẮN & ẢNH TEST QUA ZALO CỦA BẠN!');
        console.log('========================================================\n');
        process.exit(0);
      }
    }
  }

  console.log('\n⚠️ Hết thời gian chờ 180s. Bạn chưa mở chat hoặc chưa nhắn cho bot.');
}

main();
