/**
 * Script kết nối và kiểm tra Zalo Bot
 * Dùng để bắt chat_id khi người dùng nhắn tin cho bot và kiểm tra gửi tin nhắn/ảnh.
 */

const zaloBot = require('./zalo-bot');

async function test() {
  console.log('========================================================');
  console.log('🤖 KIỂM TRA & KẾT NỐI ZALO BOT (Bot WrenSoft)');
  console.log('========================================================');

  let chatId = zaloBot.getStoredChatId();

  if (!chatId) {
    console.log('⏳ Đang chờ bạn gửi tin nhắn tới bot...');
    console.log('👉 Hướng dẫn:');
    console.log('   1. Mở ứng dụng Zalo trên điện thoại.');
    console.log('   2. Tìm kiếm tên bot: "Bot WrenSoft" hoặc tài khoản "bot.owLAvTnS".');
    console.log('   3. Nhấn "Bắt đầu" hoặc gửi tin nhắn bất kỳ (ví dụ: "xin chào" hoặc "1").');
    console.log('--------------------------------------------------------');

    chatId = await zaloBot.waitForUserChatId(120);

    if (!chatId) {
      console.log('❌ Hết thời gian chờ (120s). Chưa nhận được tin nhắn từ bạn.');
      console.log('   Vui lòng thử lại sau khi đã tìm thấy bot trên Zalo.');
      process.exit(1);
    }
  }

  console.log(`\n✓ Chat ID hiện tại: ${chatId}`);
  console.log('🚀 Đang gửi tin nhắn & ảnh test qua Zalo Bot...');

  // Test gửi tin nhắn
  const msgRes = await zaloBot.sendMessage(
    chatId,
    `✅ **KẾT NỐI ZALO BOT THÀNH CÔNG!**\n\nHệ thống Zalo Mini App "Tra cứu bưu chính và giá xăng By Wren" đã liên kết với tài khoản Zalo của bạn.\n\nTừ bây giờ, mã QR đăng nhập và cảnh báo hết hạn sẽ được tự động gửi trực tiếp tại đây!`
  );
  console.log('✓ Kết quả gửi text:', msgRes);

  // Test gửi ảnh
  const testImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=https%3A%2F%2Fzalo.me';
  const photoRes = await zaloBot.sendPhoto(
    chatId,
    testImageUrl,
    '📸 Test gửi ảnh từ Zalo Bot Platform: Sẵn sàng gửi mã QR!'
  );
  console.log('✓ Kết quả gửi ảnh:', photoRes);

  console.log('\n========================================================');
  console.log('🎉 HOÀN TẤT KIỂM TRA BOT!');
  console.log('========================================================');
}

test();
