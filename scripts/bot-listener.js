/**
 * Tiến trình thường trực (Daemon) lắng nghe tin nhắn từ Zalo Bot
 * Khi nhận được tin nhắn đầu tiên từ người dùng hoặc nhóm:
 * - Lưu ngay ZALO_CHAT_ID vào .env
 * - Lập tức phản hồi tin nhắn test và ảnh xác nhận
 */

const fs = require('fs');
const path = require('path');
const zaloBot = require('./zalo-bot');

console.log('========================================================');
console.log('🤖 ZALO BOT LISTENER DAEMON (Bot WrenSoft)');
console.log('Đang chạy thường trực để đón tin nhắn từ Zalo...');
console.log('========================================================\n');

async function runLoop() {
  while (true) {
    try {
      const data = await zaloBot.getUpdates(10);
      if (data && data.ok) {
        let chatId = null;
        let userName = 'bạn';
        let textReceived = '';

        const updates = Array.isArray(data.result) ? data.result : [data.result];

        for (const item of updates) {
          if (item && item.message && item.message.chat && item.message.chat.id) {
            chatId = item.message.chat.id;
            textReceived = item.message.text || '';
            if (item.message.from && item.message.from.display_name) {
              userName = item.message.from.display_name;
            }
            break;
          }
        }

        if (chatId) {
          console.log(`\n🎉 [PHÁT HIỆN TIN NHẮN TỪ ZALO!]`);
          console.log(`- Người gửi: ${userName}`);
          console.log(`- Chat ID: ${chatId}`);
          console.log(`- Nội dung: "${textReceived}"`);

          zaloBot.updateEnv('ZALO_CHAT_ID', chatId);
          process.env.ZALO_CHAT_ID = chatId;

          // 1. Phản hồi tin nhắn chào mừng ngay
          console.log('🚀 Đang phản hồi tin nhắn test tới Zalo...');
          const replyText = `👋 **Chào ${userName}!**\n\nBot WrenSoft đã nhận được tin nhắn của bạn: _"${textReceived}"_.\n\n✅ **KẾT NỐI ZALO BOT THÀNH CÔNG 100%!**\nĐịnh danh \`chat_id: ${chatId}\` đã được lưu vào hệ thống Mini App **"Tra cứu bưu chính và giá xăng By Wren"**.\nTừ nay, mọi mã QR và cảnh báo đăng nhập sẽ được tự động gửi trực tiếp qua đây.`;
          
          const textRes = await zaloBot.sendMessage(chatId, replyText, 'markdown');
          console.log('✓ Kết quả gửi text:', textRes);

          // 2. Gửi ảnh test qua sendPhoto
          const photoUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=15&data=https%3A%2F%2Fzalo.me';
          const photoRes = await zaloBot.sendPhoto(
            chatId,
            photoUrl,
            '📸 Test gửi ảnh thành công từ Bot WrenSoft!'
          );
          console.log('✓ Kết quả gửi photo:', photoRes);
          console.log('\n[ZaloBot] Đã hoàn tất gửi tin nhắn test & ảnh! Tiếp tục lắng nghe...\n');
        }
      }
    } catch (err) {
      // bỏ qua lỗi timeout polling thông thường
    }
    await new Promise(r => setTimeout(r, 1000));
  }
}

runLoop();
