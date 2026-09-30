# Xây Dựng AI Agent Skills Xuất Sắc: Cẩm Nang Còn Thiếu
**Diễn giả:** Matt Pocock (Sáng lập AI Hero)
**Sự kiện:** AI Engineer World's Fair 2026
**Link Video gốc:** https://www.youtube.com/watch?v=UNzCG3lw6O0

---

## Toàn Bộ Bản Dịch Transcript Chi Tiết (Kèm Mốc Thời Gian)

### [0:00] 
Xin chào các bạn. Tôi thực sự rất hy vọng có thể đến tham dự AI Engineer World's Fair, nhưng việc gia đình đột xuất đã xảy ra và tôi không thể có mặt trực tiếp. Tuy nhiên, tôi sẽ không để các bạn phải ra về tay không.

### [0:09] 
Tôi sẽ trình bày cho các bạn bài nói chuyện mà lẽ ra tôi đã trình bày ở San Francisco. Bài nói này có tên là 'The Missing Manual: How to Write Great Skills' (Cẩm nang còn thiếu: Cách viết các kỹ năng xuất sắc), và tôi nghĩ rằng khả năng phân biệt kỹ năng tốt với kỹ năng tồi đang ngày càng trở nên quan trọng hơn.

### [0:22] 
Là những lập trình viên, chúng ta dường như khá tài ba trong việc tìm ra những 'địa ngục' khác nhau để tự lao vào. Cách đây vài năm, chúng ta có 'tutorial hell' (địa ngục xem hướng dẫn) - nơi bạn đọc hết khóa học này đến bài hướng dẫn khác nhằm học một điều gì đó, nhưng không thể lắp ghép chúng lại và cứ thế mắc kẹt trong vòng lặp luẩn quẩn không lối thoát.

### [0:38] 
Rồi chúng ta có 'framework hell' (địa ngục framework), nơi cứ mỗi 10 phút lại có một framework JavaScript mới ra đời, và bạn luôn phải chạy theo học những thứ thời thượng mới nhất.

### [0:48] 
Và bây giờ, tôi nghĩ chúng ta lại có một phiên bản địa ngục mới: 'skill hell' (địa ngục kỹ năng). Skill hell là khi bạn có sẵn vô số skill miễn phí trên mạng, bạn có thể tải về, đóng góp hoặc tự mày mò.

### [0:59] 
Nhưng bạn không thực sự hiểu các mảnh ghép đó phối hợp với nhau ra sao. Bạn không thể phân biệt được một skill tốt với một skill tệ. Điều này khiến mọi người cố gắng chắp vá các framework, thử mọi thứ cùng lúc, và kết quả là họ không nhận được những giá trị mà các skill đó đã hứa hẹn.

### [1:15] 
Điều này đúng ở cấp độ cá nhân, nhưng cũng hoàn toàn đúng ở cấp độ tổ chức. Các doanh nghiệp không biết cách xây dựng skill tốt, không biết cách chuyển hóa quy trình vận hành nội bộ (SOP) thành những việc mà AI agent có thể thực thi.

### [1:28] 
Và nếu không làm được điều đó, bạn khó mà gặt hái được những lợi ích to lớn mà skill mang lại. 'Cứ thêm một skill nữa đi bro' - dường như đó là tâm lý chung của chúng ta lúc này.

### [1:37] 
Bản thân tôi cũng cảm thấy có chút áy náy, bởi vì kho lưu trữ Matt Pocock Skills của tôi là một trong những bộ skill kỹ thuật phổ biến nhất hiện nay.

### [1:45] 
Vì thế, tôi muốn giúp những người đang sử dụng skill của mình thoát khỏi 'địa ngục skill'. Vậy làm thế nào để chúng ta làm được điều đó?

### [1:51] 
Thực sự chúng ta đang thiếu điều gì? Theo tôi, điều chúng ta thiếu là một tiêu chuẩn để biết điều gì làm nên một skill xuất sắc. Chúng ta chưa thể nhìn vào một skill và nói ngay: 'Kỹ năng này làm tốt ở điểm này và dở ở điểm kia'.

### [2:04] 
Chưa có một barem đánh giá chung, chưa có một khung sườn (framework) để soi xét một skill và cải thiện nó. Đó chính là những gì tôi sẽ cung cấp cho các bạn trong bài nói này: một bộ checklist đánh giá kỹ năng để đảm bảo nó làm đúng những gì nó tuyên bố và giúp bạn viết ra những skill tốt hơn.

### [2:19] 
Bảng checklist này gồm 4 phần:
1. Trigger (Cơ chế kích hoạt): Skill được gọi như thế nào và các quyết định thiết kế đi kèm.
2. Structure (Cấu trúc nội dung bên trong): Skill được tổ chức và sắp xếp ra sao.
3. Steering (Định hướng hành vi): Làm sao để skill dẫn dắt agent thực hiện đúng điều bạn muốn.
4. Pruning (Cắt tỉa tối giản): Khi đã có một skill hoạt động được, làm sao tinh giản tối đa, loại bỏ rác thừa và những chỉ dẫn vô dụng (no-ops).

### [2:53] 
Có một điểm lợi khi tôi không ở cùng phòng với các bạn: các bạn có thể mở máy ra thử nghiệm ngay lập tức, vì tôi đã mã hóa toàn bộ khung sườn này vào một skill mới trong repo của tôi tên là 'Writing Great Skills'.

### [3:03] 
Nếu bạn có nhu cầu ngay lúc này, bạn có thể ghé thăm repo skill của tôi, tải về và dùng nó để cải thiện các skill của bạn hoặc viết ra những skill mới.

### [3:14] 
Bây giờ, hãy bắt đầu đi qua từng mục trong checklist. Mục 1: Trigger (Cơ chế kích hoạt skill). Để nói về điều này, tôi xin làm một phép so sánh nhỏ: Bộ skill của tôi thường được đem ra so sánh với một bộ skill kỹ thuật cực kỳ nổi tiếng khác tên là 'Superpowers'.

### [3:28] 
Tôi thường xuyên nhận được câu hỏi: 'Skill của anh khác gì so với Superpowers?' Để hiểu điều đó, chúng ta cần nắm rõ sự khác biệt giữa kỹ năng do Người dùng kích hoạt (User-invoked) và do Model tự kích hoạt (Model-invoked).

### [3:39] 
Bất kỳ skill nào bạn cũng có thể gọi thủ công. Skill nằm trên ổ đĩa của bạn, agent chỉ cần mở ra và đọc nội dung. Bạn có thể gọi nó bằng cách ra lệnh cho agent (ví dụ dùng dấu gạch chéo `/` hoặc lệnh tùy môi trường).

### [3:58] 
Cách thứ hai là skill do chính agent tự quyết định gọi (Model-invoked). Khi đó, phần mô tả (description) của skill sẽ luôn nằm sẵn trong context của agent. Agent sẽ đọc mô tả đó và tự quyết định: 'Dựa vào mô tả này, tôi sẽ kích hoạt skill này', và nó sẽ đọc toàn bộ nội dung file SKILL.md vào context window.

### [4:26] 
Như vậy, phần mô tả đóng vai trò như một 'con trỏ ngữ cảnh' (context pointer). Nó nằm trong context của agent, chỉ tới một file khác nếu agent cần thêm thông tin.

### [4:35] 
Nhưng con trỏ ngữ cảnh đó không nhất thiết phải đưa vào context của agent. Nó hoàn toàn có thể ẩn đi trước mắt agent, và đó chính là kỹ năng do Người dùng kích hoạt (User-invoked).

### [4:45] 
Một số skill chỉ người dùng mới gọi được vì chúng không có con trỏ ngữ cảnh này. Ví dụ trong repo của tôi, skill 'codebase design' là model-invoked, nó có mô tả hiển thị cho agent. Nhưng skill 'Grill Me' thì tôi đặt `disable-model-invocation: true`. Mô tả đó chỉ hiển thị cho người dùng, agent không nhìn thấy.

### [5:04] 
Lời khuyên số 1: Hãy quyết định rõ skill của bạn là User-invoked hay Model-invoked.

### [5:14] 
Bạn có thể nghĩ: Model-invoked tốt hơn chứ, vì cả model lẫn người dùng đều gọi được, linh hoạt hơn! Nhưng mỗi khi bạn thêm một model-invoked skill vào môi trường agent, bạn đang tăng 'Context Load' (gánh nặng ngữ cảnh) lên agent đó.

### [5:31] 
Nó thêm một mô tả mới, làm tốn token trong mỗi request, và tạo thêm một lựa chọn khiến agent phải phân tâm cân nhắc. Nếu bạn có 100 model-invoked skills, context của agent sẽ bị nhồi nhét bởi 100 đoạn mô tả.

### [5:45] 
Vì thế, giải pháp có vẻ là giảm bớt số lượng model-invoked skills hoặc chuyển hết sang user-invoked. Nhưng user-invoked lại sinh ra một cái giá khác: 'Cognitive Load' (gánh nặng nhận thức) đè lên vai người dùng.

### [6:00] 
Nói cách khác, người dùng phải nhớ trong đầu có những skill nào và khi nào cần gọi chúng — đòi hỏi người 'lái' phải có kỹ năng cao hơn.

### [6:13] 
So sánh Matt Pocock Skills với Superpowers: Superpowers chủ yếu dùng model-invoked skills — trao 'siêu năng lực' cho agent. Còn với bộ skill của tôi, tôi thích kiểm soát 100%. Tôi giữ context load của agent ở mức tối thiểu, nhưng bù lại gánh nặng nhận thức đặt lên vai tôi.

### [6:27] 
Tôi cần hiểu các skill thật sâu sắc để khai thác chúng hiệu quả nhất.

### [6:35] 
Tại sao tôi ưu tiên user-invoked skills? Bởi vì mỗi khi dùng model-invoked skill, bạn phải trả giá bằng sự 'bất định' (unpredictability). Agent có thể từ chối đi theo con trỏ ngữ cảnh đó dù skill hoàn toàn phù hợp với tác vụ.

### [6:55] 
Tôi thà chấp nhận chịu thêm một chút gánh nặng nhận thức để loại bỏ hoàn toàn sự bất định này. Bạn sẽ loại bỏ cả một nhóm vấn đề phức tạp, không còn phải tốn công viết các bài kiểm thử (evals) chỉ để xem agent có gọi skill đúng lúc hay không.

### [7:16] 
Cả hai cách đều có cái giá phải trả riêng, không có lựa chọn nào hoàn hảo tuyệt đối.

### [7:24] 
Đó là phần Trigger (kích hoạt). Bây giờ hãy chuyển sang phần Structure (cấu trúc bên trong của skill). Tôi quan niệm có hai thành phần chính cần đưa vào hầu hết các skill: Steps (các bước) và Reference (tài liệu tham chiếu).

### [7:37] 
Steps là quy trình từng bước mà skill sẽ dẫn dắt agent thực hiện, còn Reference là bất kỳ thông tin hỗ trợ nào giúp agent hoàn thành các bước đó.

### [7:49] 
Bạn có thể có những skill không có bước nào mà chỉ toàn tài liệu tham khảo, hoặc những skill chỉ có các bước đơn giản mà không cần tài liệu hỗ trợ.

### [7:58] 
Nhưng nếu bắt đầu nhìn nhận skill được cấu thành từ hai đơn vị này, việc phân rã và thiết kế skill sẽ trở nên sáng sủa hơn rất nhiều. Lấy ví dụ skill '2PRD' của tôi: nó tạo ra tài liệu yêu cầu sản phẩm (PRD) từ context hiện tại.

### [8:10] 
Nó có 3 bước: 1) Tìm context liên quan; 2) Xác nhận 'test seams' (khớp nối kiểm thử) với người dùng - đây là điểm kiểm soát có con người can thiệp (human-in-the-loop); 3) Viết tài liệu PRD.

### [8:28] 
Để phục vụ 3 bước đó, chúng ta có 2 tài liệu tham chiếu: định nghĩa thế nào là một 'test seam', và một biểu mẫu (template) Markdown mẫu của tài liệu PRD.

### [8:37] 
Đây là cách tuyệt vời để bạn viết một skill từ con số 0: Xác định các bước cần làm -> Viết các bước -> Xác định tài liệu nào các bước đó cần -> Đặt tài liệu vào khu vực tham chiếu riêng.

### [8:53] 
Tuy nhiên, có một ràng buộc cực kỳ quan trọng: Lời khuyên số 3 - Hãy giữ cho file SKILL.md chính càng nhỏ gọn càng tốt.

### [9:04] 
Mỗi skill gồm có mô tả, file SKILL.md chính, và các tài liệu tham chiếu phân nhánh. Nếu ta làm cho SKILL.md thật nhỏ gọn, ta sẽ tiết kiệm được rất nhiều thứ.

### [9:16] 
Skill càng nhỏ thì càng dễ bảo trì, dễ kiểm toán (audit), ít chữ để model phải bận tâm hơn. Cứ mỗi từ bạn cắt giảm được là bạn tiết kiệm được nhiều token chi phí cho mỗi lần chạy.

### [9:28] 
Một cách hữu ích để thu nhỏ skill là suy nghĩ về các nhánh rẽ (branches) khác nhau của skill - tức các tình huống sử dụng khác nhau.

### [9:42] 
Nếu bạn có một tài liệu tham chiếu chỉ dùng cho một nhánh rẽ cụ thể, đó là ứng viên sáng giá để bóc tách ra khỏi file SKILL.md chính. Ví dụ trong '2PRD', ta luôn tạo PRD và luôn cần hỏi về test seams, nên cả 2 tài liệu đều cần thiết mỗi lần chạy và xứng đáng nằm trong file chính.

### [10:07] 
Nhưng hãy nhìn vào một skill khác của tôi: 'domain modeling'. Nó làm hai việc: 1) Cập nhật thuật ngữ dự án vào file context.md; 2) Tạo biên bản quyết định kiến trúc (ADR). Hoặc nó có thể không làm việc nào trong hai việc đó cả.

### [10:37] 
Tức là domain modeling có 2 hoặc 3 nhánh rẽ. Điều đó có nghĩa là ta KHÔNG NÊN nhét template ADR hay template context.md vào file SKILL.md chính!

### [10:47] 
Chúng cần được tách sang các file riêng biệt. Cách làm là: trong file SKILL.md, bạn đặt một con trỏ ngữ cảnh (context pointer) trỏ tới file Markdown riêng trong thư mục của skill.

### [11:01] 
Con trỏ ngữ cảnh đó chỉ đơn giản ghi: 'Nếu bạn cần template hoặc cần cập nhật context.md, hãy đọc file này'. Tôi gọi đó là 'External Reference' (Tham chiếu bên ngoài).

### [11:11] 
Đó là tài liệu nằm ngoài SKILL.md nhưng agent có thể đọc vào rất dễ dàng khi cần vì nó được đóng gói kèm theo skill. Kỹ thuật này mang lại vô số lợi ích.

### [11:26] 
Lời khuyên số 4: Hãy giấu các tài liệu tham chiếu phân nhánh ra sau các con trỏ ngữ cảnh.

### [11:38] 
Tóm lại về Structure: Làm file SKILL.md siêu nhỏ gọn; xác định các nhánh rẽ và đưa tài liệu nhánh ra ngoài; phân chia rõ ràng giữa Steps (các bước) và Reference (tham chiếu).

### [11:48] 
Tiếp theo là phần Steering (Định hướng hành vi): Các cách thức để bắt agent làm đúng theo ý muốn của chúng ta.

### [11:58] 
Với tôi, định hướng quy về một kỹ thuật tuyệt vời - cũng là điều quan trọng nhất tôi muốn các bạn nắm được trong bài nói này. Kỹ thuật này giải quyết tận gốc vấn đề: 'Agent không làm những gì tôi muốn'.

### [12:11] 
Bạn ghi rất rõ trong skill, tưởng rằng mình đã giải thích sáng tỏ, nhưng agent vẫn làm trật lất. Lý do chính là vì bạn chưa sử dụng kỹ thuật gọi là 'Leading Words' (Từ khóa dẫn dắt).

### [12:23] 
Ý tưởng của Leading Words (hay leitwort trong lý thuyết văn học) là có những từ ngữ cô đọng được một lượng ngữ nghĩa khổng lồ trong một phạm vi rất nhỏ.

### [12:33] 
Những từ khóa dẫn dắt này cực kỳ quyền năng với agent. Bạn đặt từ khóa đó vào trong skill, và agent sẽ lặp lại chính từ khóa đó trong quá trình suy luận (thinking tokens / reasoning trace) cũng như trong câu trả lời xuất ra cho bạn.

### [12:49] 
Và khi nó liên tục tự củng cố từ ngữ đó trong đầu - một từ ngữ mô tả chính xác kết quả bạn mong muốn - hành vi của nó sẽ thay đổi.

### [13:00] 
Hãy lấy ví dụ thực tế: Một vấn đề kinh điển của agent là chúng thường viết code 'theo từng tầng ngang' (layer by layer). Nghĩa là khi giao một tác vụ lớn, agent sẽ code hết toàn bộ tầng database, rồi viết hết toàn bộ schemas, rồi viết hết các API endpoints, rồi mới quay sang làm frontend.

### [13:15] 
Chúng không làm theo thói quen điển hình của con người: làm một phần nhỏ hoàn chỉnh trước, chạy thử để nhận phản hồi sớm, rồi từ đó mới mở rộng ra.

### [13:25] 
Ta có thể bảo nó: 'Đừng code theo từng tầng. Hãy tạo một lát cắt nhỏ trước rồi phát triển tiếp'. Nhưng thay vì giải thích dài dòng, nếu ta dùng một từ khóa dẫn dắt: 'Vertical Slice' (Lát cắt dọc)?

### [13:44] 
'Vertical slice' là một thuật ngữ rất nổi tiếng trong phát triển phần mềm, nó kích hoạt ngay các kiến thức nền (priors) có sẵn trong model và model hiểu ngay ta muốn gì.

### [13:56] 
Chúng ta cô đọng ý nghĩa sâu xa vào một cụm từ ngắn gọn và lặp lại nó xuyên suốt skill. Điểm hay là bạn có thể biết ngay nó có tác dụng hay không bằng cách nhìn vào chuỗi suy luận (reasoning trace): Nếu agent tự nhủ 'Chúng ta sẽ triển khai tính năng này dưới dạng một thin vertical slice', bạn sẽ nhận được một kế hoạch triển khai tốt hơn hẳn!

### [14:25] 
Hãy sử dụng các từ khóa dẫn dắt này một cách nhất quán trong skill và quan sát chuỗi suy luận của agent khi nó tiếp thu cách tiếp cận của bạn.

### [14:42] 
Tiếng Anh là một 'API' rất rộng lớn với vô vàn từ ngữ để bạn thử nghiệm, và bản thân agent cũng có thể giúp bạn gợi ý những từ khóa dẫn dắt mạnh mẽ.

### [14:54] 
Một đòn bẩy khác trong việc định hướng: Đôi khi agent không chịu bỏ đủ công sức đào sâu nghiên cứu ('legwork').

### [15:13] 
Ví dụ ở bước đặt câu hỏi làm rõ hoặc bước thám thính codebase, agent làm việc rất hời hợt.

### [15:24] 
Trường hợp kinh điển nhất là 'Plan mode' (Chế độ lập kế hoạch). Trong plan mode, thường có 2 bước: 1) Đặt câu hỏi làm rõ yêu cầu; 2) Lập kế hoạch chi tiết. Và ở hầu hết các công cụ hiện nay, bước đặt câu hỏi làm rõ luôn bị làm qua loa.

### [15:36] 
Agent nhìn thấy mục tiêu tối hậu phía sau là tạo ra plan, nên nó chỉ hỏi chiếu lệ 1-2 câu rồi nhảy tót sang lập plan ngay lập tức!

### [15:46] 
Giải pháp của tôi là gì? Thay vì gom chung vào một plan mode, tôi tách bước hỏi làm rõ thành một skill riêng tên là 'Grill with Docs'. Sau đó tôi mới cho chạy skill '2PRD'.

### [15:59] 
Khi ở trong 'Grill with Docs', agent CHỈ THẤY bước làm rõ yêu cầu và không nhìn thấy bước lập kế hoạch phía sau!

### [16:12] 
Nói cách khác, ta giấu mục tiêu tương lai đi để ép agent dồn 100% công lực vào bước hiện tại. Đây là kỹ thuật tuyệt đỉnh để tăng cường độ đào sâu (legwork) cho các khâu quan trọng.

### [16:37] 
Đó là Steering: Dùng leading words để đóng gói tư tưởng vào các token nhỏ gọn, và giấu mục tiêu sau để ép agent làm kỹ từng khâu.

### [16:48] 
Bây giờ ta chuyển sang phần cuối cùng: Pruning (Cắt tỉa & Tối giản). Pruning thực chất là xử lý các dạng sai lầm phổ biến khiến skill bị phình to.

### [17:00] 
Một skill khổng lồ thường là triệu chứng của việc thiết kế kém. Sai lầm đầu tiên rất đơn giản: Đừng lặp lại chính mình (Don't Repeat Yourself). Hãy đảm bảo nguyên tắc 'Single Source of Truth' (Một nguồn chân lý duy nhất).

### [17:19] 
Đừng lặp lại template hoặc các định nghĩa ở nhiều nơi khác nhau trong skill.

### [17:32] 
Nguyên nhân thứ hai khiến skill bị phình to là 'Sediment' (Cặn lắng). Điều này rất hay xảy ra khi nhiều người cùng đóng góp vào một file Markdown: mỗi người thêm vào một đoạn, nhưng không ai dám sửa hay xóa phần của người khác. Kết quả là tạo nên một mớ cặn lắng khổng lồ chứa đầy thông tin lạc đề và lộn xộn.

### [18:05] 
Cách xử lý cặn lắng: Xem lại cấu trúc, bóc tách thông tin riêng vào đúng nhánh, và dũng cảm xóa bỏ hoàn toàn những thứ đã lỗi thời.

### [18:24] 
Sai lầm thứ ba cực kỳ phổ biến khi để agent tự viết skill cho bạn: 'No-ops' (Những chỉ dẫn vô tác dụng). Đó là những câu văn nhìn có vẻ hữu ích nhưng thực tế không hề làm thay đổi hành vi của agent.

### [18:38] 
Ví dụ trong skill implement, bạn viết hẳn một đoạn văn dài bắt agent phải viết commit message thật chi tiết. Chuyện gì xảy ra nếu bạn xóa phăng đoạn văn đó đi?

### [18:48] 
Thực tế là agent vẫn sẽ viết một commit message đầy đủ và chuẩn chỉ! Hãy dùng 'Phép thử xóa bỏ' (Deletion test): Xóa thử câu đó đi, nếu hành vi agent không thay đổi, hãy xóa vĩnh viễn để tiết kiệm context.

### [19:06] 
Và đó là toàn bộ 4 trụ cột:
1. Trigger: Cân bằng giữa context load và cognitive load.
2. Structure: Phân tách Steps và Reference; đưa tài liệu nhánh ra ngoài SKILL.md.
3. Steering: Dùng Leading Words và giấu mục tiêu sau để tăng đào sâu.
4. Pruning: Dọn cặn lắng, triệt tiêu No-ops và giữ một nguồn chân lý duy nhất.

### [20:02] 
Cách tốt nhất để bắt đầu là ghé thăm repo skill của tôi tại `mattpocock/skills`, tải skill 'Writing Great Skills' về dùng thử để nâng cấp các skill của bạn hoặc kiểm tra các skill trên cộng đồng xem chúng có thực sự tốt hay không.

### [20:15] 
Nếu muốn theo dõi các chia sẻ tiếp theo, các bạn có thể đăng ký nhận bản tin của tôi tại aihero.dev. Sắp tới tôi sẽ ra mắt khóa học AI Coding Crash Course hướng dẫn cách làm việc thực chiến giữa kỹ thuật phần mềm và AI.

### [20:30] 
Tôi hy vọng những gì tôi chia sẻ hôm nay đủ để giúp các bạn thoát khỏi 'Skill Hell'. Rất tiếc vì không thể gặp trực tiếp, cảm ơn các bạn đã theo dõi!

### [20:41] 
Hẹn gặp lại các bạn sớm!

