import { investigationFor, TRIALS } from './investigationContent';

const line = (speaker_c, text_c, emotion_c = 'neutral') => ({ speaker_c, text_c, english_c: text_c, emotion_c });
const person = (name_c, role_c, age, bio_c, slogan_c, variant_c = 'detective') => ({
  key_c: name_c, name_c, role_c, chapter_c: 0, variant_c,
  bio_c: `${age} tuổi. ${bio_c}`, slogan_c
});

export const CYBER_CAST = [
  person('An', 'Tuyệt đỉnh thám tử · Sinh viên luật', 20, 'Đã hỗ trợ nhiều cuộc điều tra. Mất ký ức về vụ Mạng Nhện và người mình từng tin tưởng.', 'Khi những thứ đó mâu thuẫn với nhau, sự thật sẽ để lại dấu vết.'),
  person('Bảo Linh', 'Chuyên gia an ninh mạng', 21, 'Ít nói, đọc nhật ký truy cập và phân biệt bản gốc với bản sao. Giấu việc đã phát hiện Khiên Số bị xâm phạm.', 'Một bản ghi chỉ đáng tin khi ta kiểm tra được nguồn.', 'victim'),
  person('Minh Khoa', 'Streamer · Nhà sáng tạo nội dung', 20, 'Tự tin trước máy quay, nhưng từng mất tài khoản sau một lời mời hợp tác giả.', 'Đông người tin không biến lời nói thành sự thật.'),
  person('Hạ Vy', 'Phóng viên điều tra tương lai', 20, 'Quan sát lời nói dối. Đang theo dấu dịch vụ giả hỗ trợ nạn nhân và che giấu nguồn tin.', 'Hỏi câu khó, kể điều đã kiểm chứng.', 'victim'),
  person('Đức', 'Sinh viên tài chính ngân hàng', 21, 'Hiểu dòng tiền nhưng che giấu khoản đầu tư đã mất và mong muốn thu hồi nó.', 'Con số phải đi cùng chứng từ.'),
  person('Mai', 'Sinh viên y khoa', 20, 'Giữ nhóm đoàn kết nhưng sợ người thân bị đe dọa. Gia đình từng nhận cuộc gọi giả danh cơ quan chức năng.', 'Trước hết, giúp người đang sợ hãi bình tĩnh.', 'victim'),
  person('Phúc', 'Lập trình viên trò chơi', 22, 'Tin vào công nghệ. Từng nhận việc xử lý dữ liệu mà chưa xác minh đơn vị tuyển dụng.', 'Công nghệ phải phục vụ con người.'),
  person('Trâm', 'Sinh viên tâm lý học', 20, 'Nhận ra áp lực và thao túng. Từng tham gia khảo sát phản ứng trước cuộc gọi khẩn cấp giả.', 'Nỗi sợ không phải bằng chứng.', 'victim'),
  person('Quân', 'Đối thủ của An · Sinh viên luật', 21, 'Nguyên tắc, thích tranh luận. Có thể đã làm lộ thông tin trong vụ Mạng Nhện.', 'Không có quy tắc nào được miễn chất vấn.'),
  person('Yến', 'Tình nguyện viên giáo dục số', 19, 'Từng đăng ký học bổng Khiên Số và cung cấp nhiều thông tin. Ngưỡng mộ các vụ án An phá trên TV.', 'Dừng lại, kiểm chứng, rồi mới tin.', 'victim')
];

const PROLOGUE = [
  line('An', 'Tiếng kính vỡ. Một giọng nói quen thuộc. Rồi trắng xóa. Tôi tỉnh dậy trên sàn phòng trắng, cổ tay bị khóa bởi chiếc vòng điện tử. Màn hình chỉ còn một câu: ĐỪNG TIN VÀO NHỮNG GÌ CẬU NHỚ.', 'scared'),
  line('Yến', 'Khoan… anh là An phải không? Đúng là anh rồi! Em đã xem những vụ án của anh! Em là Yến. Không ngờ lại được gặp anh ở đây… Có anh thì chắc chúng ta sẽ tìm được cách ra, đúng không?', 'happy'),
  line('An', 'Yến, anh nghe em rồi. Nhưng anh cũng chưa biết đây là đâu. Đừng rời khỏi nhóm nhé. Mọi người, tôi là An. Ai còn nghe thấy tôi thì lên tiếng; chúng ta kiểm tra xem có ai bị thương trước đã.', 'determined'),
  line('Mai', 'Có ai nghe thấy không? Cửa không mở! Xin đừng chen nhau… Mọi người có bị thương không?', 'scared'),
  line('An', 'Chín sinh viên xa lạ đứng quanh tôi. Ngoài cửa kính không phải một thành phố, mà là mê cung ảo rộng đến mức không thấy điểm cuối. Những hành lang rẽ nhánh nối các khu học bổng, ngân hàng, ký túc xá và kho lưu trữ; giữa chúng là tường dữ liệu và cửa cách ly. Tôi không nhớ vì sao mình đến đây.', 'shocked'),
  line('Cyber-M', 'Chào mừng đến với Mê Cung Số. Không được sống dưới danh tính giả, không được xóa dấu vết, không được rời đi trước khi sự thật được phán quyết.'),
  line('Cyber-M', 'Mỗi phân khu là một không gian tách biệt. Các cổng dữ liệu chỉ mở theo quyền truy cập của ta. Đừng nhầm một hành lang sáng đèn với đường thoát: sau nó có thể là một ngõ cụt, hoặc một khu vực đã bị phong tỏa.'),
  line('Cyber-M', 'Mỗi chương có một sự cố. Điều tra, thu thập bằng chứng số và tham gia Phiên Tòa Tranh Luận. Phán quyết sai sẽ làm lộ một phần hồ sơ cá nhân và tăng đe dọa trong mô phỏng. Người bị kết luận có lỗi sẽ bị thu hồi vào Kho Lưu Trữ. Sau bảy chương, người sống sót có cơ hội trở về.'),
  line('Cyber-M', 'Ta đã đọc toàn bộ hồ sơ của các ngươi. Ta biết ai sẽ hoảng loạn, ai sẽ phản bội. Đặc biệt là cậu, An. Thiên tài của chúng ta sẽ phá bao nhiêu vụ án trước khi trở thành nạn nhân của chính suy luận mình?'),
  line('Trâm', '“Thu hồi” là gì? Xóa danh tính… hay xóa cả chúng ta? Đừng ép ai trả lời khi họ đang hoảng loạn.', 'scared'),
  line('An', 'Trước khi làm theo bất kỳ điều gì nó nói, chúng ta cần biết nhau. Tôi hai mươi tuổi, học luật. Có lẽ vài người biết những vụ tôi từng hỗ trợ… nhưng lúc này ký ức của tôi không rõ. Tôi sẽ không giả vờ mình có sẵn đáp án.', 'determined'),
  line('Yến', 'Em mười chín tuổi, năm nhất. Em thường giúp mọi người dùng dịch vụ trực tuyến. Em nhớ anh từng nói một lời khai, một bức ảnh, một bản ghi đều có thể nói dối… Em vui vì gặp anh, nhưng nghe chữ “thu hồi” em vẫn sợ lắm.', 'confused'),
  line('An', 'Sợ là bình thường, Yến. Em không phải tin anh chỉ vì đã thấy anh trên TV. Nếu anh bỏ sót điều gì, hãy hỏi lại. Giờ thì… ai muốn nói tiếp?', 'determined'),
  line('Bảo Linh', 'Bảo Linh. Hai mươi mốt tuổi, học công nghệ thông tin. Gọi Linh cũng được. Tôi có thể đọc nhật ký truy cập… nếu nó cho chúng ta xem dữ liệu thật. Đừng chạm vào thiết bị lạ vội.', 'suspicious'),
  line('Minh Khoa', 'Tôi là Minh Khoa, hai mươi tuổi. Làm nội dung trên mạng. Bình thường tôi nói nhiều lắm, mà giờ… thôi, ai nghe thấy tiếng tôi thì đứng gần lại. Đừng để ai lạc một mình.', 'confused'),
  line('Hạ Vy', 'Hạ Vy, học báo chí, cùng tuổi An. Tôi muốn ghi lại lời nó vừa nói. Nếu luật thay đổi, ít nhất chúng ta còn biết lúc đầu nó đã hứa gì.', 'determined'),
  line('Đức', 'Đức. Hai mươi mốt, tài chính ngân hàng. Tôi có thể giúp kiểm tra giao dịch. Nhưng… đừng nhìn tôi như thể tôi biết mọi thứ về chỗ này. Tôi cũng vừa tỉnh lại thôi.', 'confused'),
  line('Mai', 'Tôi là Mai, hai mươi tuổi, học y. Ai chóng mặt hay khó thở thì nói với tôi nhé. Tôi chưa biết giúp được đến đâu, nhưng chúng ta đừng chen nhau trước cửa nữa.', 'determined'),
  line('Phúc', 'Phúc, hai mươi hai tuổi. Tôi học phát triển phần mềm, làm trò chơi. Chỗ này giống một mô phỏng… nhưng tôi chưa biết nó vận hành thế nào. Tôi sẽ không thử mở cửa bừa.', 'suspicious'),
  line('Trâm', 'Trâm, hai mươi tuổi, học tâm lý. Nếu cần, cứ ngồi xuống một lúc. Không ai phải tỏ ra bình tĩnh chỉ để người khác yên tâm. Tôi cũng đang cố hiểu chuyện gì xảy ra.', 'scared'),
  line('Quân', 'Quân, hai mươi mốt, học luật. An, tôi biết cậu giỏi suy luận. Nhưng nếu cậu kết luận mà chưa đủ căn cứ, tôi sẽ phản đối. Nhất là khi số phận chúng ta nằm trong tay thứ kia.', 'determined'),
  line('An', 'Yến nhìn tôi như một người không thể sai. Tôi muốn trấn an em, nhưng chính mình cũng đang run. Chúng ta sẽ bảo vệ nhau. Và không ai bị kết tội chỉ vì đang sợ hãi.')
];

const plots = [
  {
    title_c: 'Học bổng 0 đồng', category_c: 'Phishing', victim_c: 'Yến · 19 tuổi', suspect_c: 'Cyber-M', setting_c: 'Trung tâm Học bổng', scene_c: 'school', safety_c: 1,
    hook_c: 'Tài khoản gửi tin mang tên Khoa. Nhưng ai thực sự tạo ra thông điệp?',
    incident_c: [line('Yến', 'Hồ sơ của em sắp bị hủy! Tin này đến từ chương trình em từng dùng… Em chỉ bấm đường dẫn. Em không muốn mất học bổng.', 'scared'), line('Minh Khoa', 'Màn hình đỏ hết rồi! Yến đâu? Vì sao nhật ký lại ghi tên tôi? Tôi không gửi tin này!', 'shocked'), line('An', 'Mọi người gọi tên Yến, đập cửa cách ly. Tôi suýt nhìn tên tài khoản và kết luận. Không. Một danh tính trong nhật ký chưa chứng minh người thao tác.')],
    clues_c: [
      ['SMS thúc ép', 'Tin yêu cầu xác minh gấp và nhập OTP.', '“Hồ sơ bị hủy nếu không xác nhận ngay.”', 'Không cung cấp OTP qua liên kết chưa xác minh.'],
      ['Tên miền gần giống', 'Trang bắt chước học bổng nhưng địa chỉ khác.', 'hocbong-xacminh.example — địa chỉ hư cấu.', 'Tự tìm kênh chính thức; logo không xác minh được chủ trang.'],
      ['Nhật ký thiếu bản gốc', 'Không có bản ghi gửi độc lập tương ứng.', 'Tên Khoa xuất hiện trong bản tóm tắt do Cyber-M tạo.', 'Bản tóm tắt không chứng minh ai đã gửi.'],
      ['Lời khai của Khoa', 'Tài khoản từng bị chiếm quyền.', '“Tôi đã mở một lời mời hợp tác và mất tài khoản.”', 'Người sở hữu tài khoản có thể cũng là nạn nhân.'],
      ['Mã quản trị ASTER', 'Kiểm tra nội bộ ghi thông điệp sinh từ mô phỏng.', 'Nguồn phát: ASTER / tác vụ hệ thống.', 'Giữ bản gốc và ghi lại nguồn thu thập.']
    ],
    testimony_c: 'Quân: “Nhật ký ghi Khoa. Nếu bỏ qua nó, mọi bằng chứng đều có thể bị phủ nhận.”',
    verdict_c: ['Chất vấn nguồn nhật ký; không kết tội người tham gia.', 'Kết tội Minh Khoa vì tài khoản đứng tên cậu.', 'Kết tội Yến vì đã bấm liên kết.'],
    aftermath_c: [line('An', 'Tôi không phủ nhận bằng chứng. Tôi hỏi ai tạo ra nó, ai lưu giữ nó, và chúng ta có thể kiểm tra độc lập hay không.'), line('Cyber-M', 'Hệ thống không thể là đối tượng bị kết tội. Chọn một người tham gia.'), line('An', 'Vậy phiên tòa này đang bị thao túng. Chính hệ thống tạo thông điệp nhưng lại cấm chúng tôi kiểm tra nó.'), line('Yến', 'Cửa mở rồi… Em tưởng mình sẽ không còn tên nữa. Cảm ơn vì anh không coi em là kẻ có lỗi chỉ vì em đã sợ.', 'scared'), line('An', 'Không ai bị thu hồi. Trong túi tôi có tờ giấy bằng nét chữ của mình: “Cyber-M không phải người ra luật.” Mặt sau: VŨ KHẢI. Tôi không nhớ người ấy là ai.', 'shocked')]
  },
  {
    title_c: 'Tài khoản an toàn', category_c: 'Giả mạo cơ quan', victim_c: 'Mai · 20 tuổi', suspect_c: 'Quân', setting_c: 'Ngân hàng mô phỏng', scene_c: 'digital', safety_c: 4,
    hook_c: 'Một cuộc gọi gieo sợ hãi. Một công cụ mở cửa lại khóa đồng đội.',
    incident_c: [line('Mai', 'Họ biết thông tin gia đình tôi. Họ nói nếu ngắt máy, người thân sẽ bị bắt. Tôi không thở nổi… Tôi chưa cài tệp đó, nhưng tôi đã muốn làm theo.', 'scared'), line('Phúc', 'Cửa giao dịch đóng rồi! Bảng thoát hiểm tắt! Có ai mở được không?', 'scared'), line('Bảo Linh', 'Tệp nằm trên máy tôi không có nghĩa tôi đã chạy nó. Cho tôi kiểm tra thời điểm xuất hiện.'), line('Quân', 'Tôi chỉ muốn mở lối ra. Tôi đã chạy công cụ không xác minh. Tôi không biết nó sẽ nhốt Phúc.', 'scared')],
    clues_c: [
      ['Lệnh chạy công cụ', 'Quân khởi động công cụ mở khóa trước báo động.', 'Phiên thao tác Quân → công cụ → cơ chế cách ly.', 'Phân biệt hành động thực hiện với ý định và chủ mưu.'],
      ['Tệp trên máy Linh', 'Không có dấu vết đáng tin cho thấy Linh mở tệp.', 'Thời gian sao chép không trùng thời gian thực thi.', 'Tệp có mặt trên thiết bị chưa chứng minh chủ máy đã chạy.'],
      ['Dòng thời gian cửa khóa', 'Cách ly Phúc xảy ra ngay sau lệnh của Quân.', 'Lệnh mở cửa kích hoạt khóa vùng giao dịch.', 'Đối chiếu trình tự thay vì chỉ vị trí tệp.'],
      ['Cuộc gọi đe dọa', 'Người gọi yêu cầu giữ bí mật và chuyển tiền.', '“Chuyển vào tài khoản an toàn để xác minh.”', 'Không chuyển tiền theo cuộc gọi tự xưng điều tra viên.'],
      ['Câu nói huấn luyện', 'Trâm nhận ra câu từ tài liệu Khiên Số.', '“Một khi nạn nhân đã sợ, họ tự tìm lý do để tin.”', 'Dữ liệu tâm lý có thể bị lạm dụng để cá nhân hóa đe dọa.']
    ],
    testimony_c: 'Quân: “Tôi gây sự cố, nhưng người tạo tình huống này mới là kẻ lừa đảo.”',
    verdict_c: ['Quân thực hiện lệnh gây cách ly; chưa có căn cứ coi cậu là chủ mưu.', 'Linh là chủ mưu vì tệp nằm trên máy cô.', 'Mai phải chịu toàn bộ trách nhiệm vì tin cuộc gọi.'],
    aftermath_c: [line('Quân', 'Khoan! Các cậu có biết Kho Lưu Trữ là gì không? Tôi chưa muốn biến mất. An… đừng để họ biến cậu thành thẩm phán chỉ biết nhìn vào kết quả.', 'scared'), line('An', 'Tôi chìa tay nhưng cửa kính đã đóng. Quân gõ vào kính, rồi mất hút. Tôi đã xác định hành động; tôi chưa chứng minh được quyền của hệ thống khi trừng phạt cậu ấy.', 'scared'), line('Mai', 'Tôi vẫn nghe tiếng cậu ấy. Chúng ta không thể coi chuyện này là bình thường.', 'scared'), line('Trâm', 'Câu trong bản ghi cuộc gọi đến từ tài liệu huấn luyện tâm lý Khiên Số. Người dựng bẫy hiểu nỗi sợ của chúng ta.')]
  },
  {
    title_c: 'Lãi suất của niềm tin', category_c: 'Đầu tư và tình cảm', victim_c: 'Đức · 21 tuổi', suspect_c: 'Đức', setting_c: 'Sàn giao dịch mô phỏng', scene_c: 'digital', safety_c: 2,
    hook_c: 'Tiền chung biến mất. Người từng mất tiền chỉ muốn lấy lại điều đã mất.',
    incident_c: [line('Đức', 'Người đó nói có thể lấy lại khoản tôi mất. Tôi chỉ cần chuyển tín dụng để xác minh quyền sở hữu. Tôi biết đáng ngờ, nhưng tôi đã mất tiền một lần rồi…', 'scared'), line('Minh Khoa', 'Tất cả tín dụng của nhóm bằng không! Chúng ta mua vật phẩm bằng gì? Ai đã chuyển?', 'shocked'), line('An', 'Đức cúi đầu. Sau Quân, mọi người đứng xa nhau hơn. Tôi muốn tìm một thủ phạm ngay để cảm thấy mình còn kiểm soát được. Nhưng cảm giác đó cũng là một cái bẫy.')],
    clues_c: [
      ['Lệnh chuyển của Đức', 'Đức xác nhận giao dịch tín dụng chung.', 'Lịch sử chuyển: Đức → tài khoản được chỉ định.', 'Giao dịch chứng minh hành động, không tự chứng minh toàn bộ âm mưu.'],
      ['Lợi nhuận trên màn hình', 'Số dư lớn không có giao dịch tương ứng.', 'Bảng hiển thị lãi; không có tài sản rút được.', 'Ảnh lợi nhuận không thay thế chứng từ.'],
      ['Lời khai và lịch sử', 'Đức thừa nhận chuyển tiền theo lời hứa thu hồi.', '“Tôi chỉ muốn lấy lại những gì thuộc về mình.”', 'Đối chiếu lời khai với dữ liệu; không chế giễu nạn nhân.'],
      ['Người nhắn không rõ danh tính', 'Lời mời kết hợp thân mật và đầu tư.', '“Tin tôi, tôi sẽ giúp bạn lấy lại vốn.”', 'Quan hệ tình cảm không thay thế xác minh đầu tư.'],
      ['Mã giao dịch trùng', 'Ký hiệu trùng vụ ngân hàng.', 'Tham chiếu ASTER trong hai khu vực.', 'Các vụ tưởng độc lập có thể dùng chung hạ tầng.']
    ],
    testimony_c: 'Cyber-M: “Đức chuyển tiền. Vậy Đức là kẻ lừa đảo đứng sau mọi chuyện.”',
    verdict_c: ['Đức thực hiện giao dịch gây hại, nhưng chưa chứng minh cậu thiết kế chiến dịch.', 'Đức là chủ mưu của mọi vụ việc.', 'Không ai thực hiện giao dịch vì lợi nhuận chỉ là ảnh.'],
    aftermath_c: [line('Đức', 'Nếu bị thu hồi… tôi có còn nhớ tên mình không? Đừng nói với mọi người rằng tôi chỉ tham tiền. Tôi đã quá xấu hổ để xin giúp đỡ.', 'scared'), line('An', 'Tôi tin cậu thật sự muốn lấy lại tiền. Kẻ lừa đảo đã dùng chính hy vọng ấy. Tôi sẽ giữ lại cả lời khai của cậu, không chỉ lệnh chuyển.'), line('Trâm', 'An, cậu không cần giả vờ ổn. Chúng ta vừa mất thêm một người.'), line('An', 'Ghế của Đức trống. Mã giao dịch cậu để lại nối hai vụ án. Phá đúng một vụ chưa chắc đã tìm đúng người thực sự chịu trách nhiệm.', 'scared')]
  },
  {
    title_c: 'Giọng nói không có chủ', category_c: 'Deepfake và giả giọng', victim_c: 'Trâm · 20 tuổi', suspect_c: 'Hạ Vy', setting_c: 'Căn hộ mô phỏng', scene_c: 'city', safety_c: 5,
    hook_c: 'Một giọng nói quen cầu cứu. Một bản sao che giấu điều gì?',
    incident_c: [line('Trâm', 'Đó là giọng người thân tôi! Họ nhắc điều chỉ gia đình biết. Nếu tôi không mở vùng bảo mật ngay, họ sẽ gặp nguy hiểm!', 'scared'), line('Hạ Vy', 'Đừng mở! Tôi đã nghe tệp này. Nhưng… tôi không thể kể hết bây giờ.'), line('Mai', 'Cửa bảo mật vừa mở trái phép. Mọi người đừng gửi tiếp bản ghi! Chúng ta chưa biết người trong đó có thật không.', 'shocked'), line('An', 'Một giọng quen thuộc không xác minh được danh tính. Cảm giác “nghe giả” cũng không chứng minh tệp đã bị làm giả. Tôi cần nguồn gốc và lịch sử bản sao.')],
    clues_c: [
      ['Lịch sử chỉnh sửa của Vy', 'Vy đã sửa bản sao lấy từ kho Khiên Số.', 'Bản sao chỉnh sửa → thông tin đưa cho nhóm.', 'Giữ cả bản gốc và chuỗi chỉnh sửa.'],
      ['Chi tiết gia đình', 'Lời cầu cứu dùng dữ liệu riêng tư.', 'Thông tin đúng xuất hiện trong khảo sát cũ.', 'Biết chuyện riêng không chứng minh người gọi là người thân.'],
      ['Lời khai của Vy', 'Vy giấu nguồn, làm nhóm quyết định với thông tin thiếu.', '“Tôi muốn dụ người điều hành phản hồi.”', 'Che giấu nguồn gây hậu quả, không tự chứng minh tạo bản ghi đầu tiên.'],
      ['Nguồn âm thanh chưa xác minh', 'Không có nguồn độc lập xác nhận lời cầu cứu.', 'Bản phát lại do mô phỏng cung cấp.', 'Gọi số đã biết trước; không lan truyền tệp đáng ngờ.'],
      ['Dịch vụ khôi phục danh tính', 'Vy theo dấu lời hứa lấy lại tiền và tài khoản.', '“Người tuyệt vọng cần một người cho họ hy vọng.”', 'Cảnh giác dịch vụ giả nhắm vào nạn nhân cũ.']
    ],
    testimony_c: 'Cyber-M: “Có tệp âm thanh trong phòng Vy. Chính Vy tạo lời cầu cứu đầu tiên.”',
    verdict_c: ['Vy sửa bản sao và giấu nguồn gây hậu quả; chưa chứng minh tạo lời cầu cứu gốc.', 'Vy tạo bản ghi gốc vì máy cô có tệp.', 'Trâm có lỗi vì nhận ra giọng người thân.'],
    aftermath_c: [line('Hạ Vy', 'Tôi đã nghĩ mình có thể điều tra một mình. Khi cửa này đóng… xin đừng để nguồn tin của tôi biến mất cùng tôi.', 'scared'), line('An', 'Vy cố giữ giọng bình tĩnh, nhưng bàn tay run trên kính. Tôi nghe câu nói của dịch vụ khôi phục và thấy một người đàn ông sau lớp kính trong ký ức. Tôi từng tin ông ấy.', 'shocked'), line('Mai', 'Chúng ta đang mất từng người. Lần sau, xin đừng giữ bí mật chỉ để bảo vệ nhau.'), line('An', 'Nỗi sợ của tôi không còn chỉ là mất trí nhớ. Nếu người dựng chuyện là người tôi tin nhất, tôi đã trao cho ông ấy bao nhiêu dữ liệu?')]
  },
  {
    title_c: 'Việc nhẹ, dữ liệu dày', category_c: 'Việc làm giả', victim_c: 'Cả nhóm', suspect_c: 'Phúc', setting_c: 'Văn phòng tuyển dụng', scene_c: 'cafe', safety_c: 3,
    hook_c: 'Lời mời trả công biến thành một hồ sơ về điểm yếu của từng người.',
    incident_c: [line('Phúc', 'Thông báo này giống email công việc tôi từng nhận: gửi dữ liệu để xác nhận thanh toán. Họ bảo đó chỉ là dữ liệu kỹ thuật đã ẩn danh.'), line('Yến', 'Hồ sơ cá nhân của mọi người trên màn hình! Có phải vì em đăng ký học bổng không? Em không muốn ai bị thu hồi nữa!', 'scared'), line('Bảo Linh', 'Thông tin đến từ nhiều thời điểm, không chỉ Yến. Phải đối chiếu các nguồn trước khi đổ lỗi.'), line('An', 'Cyber-M không chỉ biết tên. Nó biết chúng ta hy vọng gì và sợ mất ai. Các đường dây đang dùng chung một hồ sơ hành vi.')],
    clues_c: [
      ['Lệnh xuất dữ liệu của Phúc', 'Tài khoản Phúc xuất dữ liệu trước khi rò rỉ.', 'Xuất dữ liệu → bảng công khai.', 'Cần xác minh phạm vi dữ liệu trước khi xử lý.'],
      ['Hồ sơ nhiều nguồn', 'Dữ liệu từ học bổng, khảo sát và báo cáo nạn nhân.', 'Các mốc cung cấp khác nhau của cả nhóm.', 'Không đổ lỗi cho một người vì dữ liệu của họ xuất hiện.'],
      ['Hợp đồng không được xác minh', 'Phúc nhận việc mà chưa kiểm tra quyền hạn bên thuê.', 'Yêu cầu xử lý dữ liệu “đã ẩn danh” qua email.', 'Ẩn danh là tuyên bố cần kiểm tra, không phải bảo đảm.'],
      ['Thông báo thanh toán', 'Đòi gửi thêm dữ liệu để nhận lương.', '“Hoàn thành công việc. Gửi dữ liệu để nhận thanh toán.”', 'Không đổi dữ liệu nhạy cảm lấy lời hứa trả công.'],
      ['ASTER — Hồ sơ hành vi', 'Cùng tên thư mục trong chương đầu.', 'ASTER: phân loại nỗi sợ, hy vọng và phản ứng.', 'Ghi nhận liên kết giữa các vụ và nguồn lưu trữ.']
    ],
    testimony_c: 'Phúc: “Tôi xuất dữ liệu. Nhưng tôi không biết họ có thể dùng nó để nhận diện và lừa từng người.”',
    verdict_c: ['Phúc xuất dữ liệu không xác minh; chưa có căn cứ coi cậu thiết kế hồ sơ hành vi.', 'Yến là chủ mưu vì đăng ký học bổng.', 'Phúc vô can với hành động xuất dữ liệu vì tin dữ liệu đã ẩn danh.'],
    aftermath_c: [line('Phúc', 'Tôi đã tạo trò chơi để người ta vui. Không phải cái này. Linh, giữ bản kê nguồn tôi gửi… Tôi sợ không còn cơ hội sửa sai.', 'scared'), line('An', 'Tôi không hứa điều mình chưa thể biết. Nhưng tôi sẽ tìm các cậu. Không ai đáng bị xóa khỏi sự thật chỉ vì đã mắc sai lầm.'), line('Bảo Linh', 'ASTER. Chính thư mục đã xuất hiện trong nhật ký quản trị đầu tiên. Khiên Số tập hợp chúng ta trước khi Mê Cung Số bắt đầu.'), line('An', 'Tôi thôi tìm một người bạn để quy hết tội lỗi. Tôi bắt đầu nhìn người được lợi khi chúng tôi nghi ngờ nhau.')]
  },
  {
    title_c: 'Phí lấy lại niềm tin', category_c: 'Lừa đảo thu hồi', victim_c: 'Bảo Linh · 21 tuổi', suspect_c: 'Bảo Linh', setting_c: 'Hành lang Kho Lưu Trữ', scene_c: 'digital', safety_c: 5,
    hook_c: 'Tất cả bằng chứng đều hợp lý. Nhưng chỉ một hệ thống kiểm soát tất cả.',
    incident_c: [line('Bảo Linh', 'Họ nói có thể phục hồi Quân, Đức, Vy và Phúc. Chỉ cần trao khóa bằng chứng. Tôi không muốn các cậu ấy bị xóa. Tôi đã tìm cách truy cập vùng cách ly.', 'scared'), line('Mai', 'Tại sao cậu không nói? Chúng ta có thể cùng kiểm tra. Cậu cũng đang sợ như chúng tôi.'), line('Cyber-M', 'Nhật ký đầy đủ, thời gian thống nhất. Chọn Linh là thủ phạm hoặc chịu hình phạt vì không kết luận.'), line('An', 'Mọi bản ghi đều đi qua Cyber-M. Không có nguồn độc lập để xác minh. Tôi đã nhìn bạn bè bị thu hồi vì những hồ sơ như thế. Lần này tôi sẽ không bỏ phiếu chỉ để giữ an toàn cho mình.')],
    clues_c: [
      ['Nguồn nhật ký duy nhất', 'Cyber-M kiểm soát tất cả bản trích xuất.', 'Nguồn tạo, nguồn lưu và bên phán quyết cùng một hệ thống.', 'Nội dung hợp lý không bảo đảm nguồn đáng tin.'],
      ['Lời hứa cứu người', 'Dịch vụ đòi khóa bằng chứng để phục hồi danh tính.', '“Chúng tôi có bản sao của họ. Giao khóa cho chúng tôi.”', 'Không giao khóa, OTP hay quyền truy cập cho dịch vụ chưa xác minh.'],
      ['Không thể kiểm tra độc lập', 'Không được truy cập nhật ký nguồn.', 'Yêu cầu bản gốc bị hệ thống từ chối.', 'Có quyền chưa kết luận khi không đủ chứng cứ đáng tin.'],
      ['Lời khai của Linh', 'Linh che giấu việc tìm đường cứu đồng đội.', '“Tôi sợ quyền truy cập này sẽ bị dùng để hại các cậu.”', 'Che giấu sự thật không tự chứng minh thiết kế âm mưu.'],
      ['Mã quản trị VK-01', 'Chặn An tiếp cận nhật ký nguồn trước giai đoạn cuối.', 'VK-01: không cho đối tượng An tiếp cận nhật ký nguồn.', 'Ghi lại quyền kiểm soát và chỉ đạo hạn chế chứng cứ.']
    ],
    testimony_c: 'Cyber-M: “Từ chối chọn Linh nghĩa là thừa nhận cậu không đủ khả năng phá án.”',
    verdict_c: ['Từ chối kết luận; yêu cầu nguồn độc lập và bảo toàn chứng cứ.', 'Kết tội Linh vì nhật ký nhìn rất đầy đủ.', 'Giao khóa bằng chứng cho dịch vụ phục hồi.'],
    aftermath_c: [line('An', 'Một bằng chứng có thể đúng về nội dung nhưng không đáng tin về nguồn gốc. Tôi từ chối bỏ phiếu.'), line('Bảo Linh', 'Cậu… không chọn tôi? Tôi đã chuẩn bị nghe lệnh thu hồi. Tôi không biết mình có thể sợ đến thế.', 'scared'), line('An', 'VK-01. Vũ Khải. Người sáng lập Khiên Số, người hướng dẫn tôi. Tôi từng phát hiện hồ sơ bị dùng sai mục đích và chuẩn bị bản lưu độc lập trước khi bị bắt.'), line('Vũ Khải', 'Ta đã dạy con nhìn thấy điều người khác bỏ qua. Sự thật chỉ có giá trị khi người nắm nó đủ quyền quyết định nó được nhìn thấy thế nào.'), line('An', 'Tôi nhận ra giọng ông. Tôi không mất ký ức ngẫu nhiên: tôi là người có thể chứng minh dữ liệu đã bị đánh cắp và lạm dụng.', 'shocked')]
  },
  {
    title_c: 'Phiên tòa cuối cùng', category_c: 'Thao túng dữ liệu', victim_c: 'Mười sinh viên', suspect_c: 'Vũ Khải', setting_c: 'Quảng trường Mê Cung Số', scene_c: 'city', safety_c: 1,
    hook_c: 'Không phải chứng minh An thông minh hơn. Phải để sự thật được kiểm tra.',
    incident_c: [line('Vũ Khải', 'Con không có bằng chứng nào ngoài những gì Cyber-M cho phép nhìn thấy. Không ai còn tin lời suy diễn của một thám tử mất trí nhớ. Khiên Số biết họ sợ gì; ta chỉ cho họ một nửa sự thật.', 'happy'), line('An', 'Ông đã tạo tình huống khiến họ sai lầm rồi dùng sai lầm đó để nói họ không đáng tin. Nhưng người bị lừa không ngu ngốc. Người gây một sự cố không nhất thiết là chủ mưu.'), line('Bảo Linh', 'Tờ giấy ở chương đầu. Bản lưu độc lập của cậu. Đó không phải đáp án có sẵn, nhưng là điểm bắt đầu để đối chiếu.'), line('Yến', 'Em sẽ phục hồi thông tin đã gửi khi đăng ký học bổng. Lần này em không tin vì anh nổi tiếng. Em muốn tự kiểm chứng cùng anh.'), line('An', 'Mai và Khoa xác nhận việc trực tiếp trải qua; Trâm đối chiếu thông điệp đe dọa; Linh kiểm tra nguồn. Tôi không còn phải phá án một mình.')],
    clues_c: [
      ['Bản lưu độc lập', 'Bản sao báo cáo gốc trước khi An bị bắt.', 'Báo cáo, lịch sử chuyển tiền và danh mục nguồn ngoài Cyber-M.', 'Bản lưu là điểm khởi đầu, không tự chứng minh toàn bộ vụ án.'],
      ['Lời chứng đối chiếu', 'Các thành viên xác nhận sự kiện mình trực tiếp trải qua.', 'Mai, Khoa, Trâm và Yến đối chiếu báo cáo gốc.', 'Kết hợp nhiều nguồn có thể kiểm tra.'],
      ['Quyền quản trị của Khải', 'VK-01 chỉ đạo sử dụng dữ liệu và chặn nhật ký nguồn.', 'Chỉ đạo quản trị khớp nguồn độc lập được khôi phục.', 'Phân biệt quyền truy cập với bằng chứng chỉ đạo đã xác minh.'],
      ['Chuỗi hồ sơ ASTER', 'Sáu vụ cùng dẫn về hệ thống lưu trữ hành vi.', 'Thông điệp cá nhân hóa từ dữ liệu Khiên Số.', 'Xâu chuỗi bằng nguồn, không chỉ bằng phỏng đoán.'],
      ['Danh mục bàn giao', 'Bản gốc và bản sao có kiểm soát gửi bên độc lập.', 'Danh mục nguồn, người thu thập và lịch sử sao chép.', 'Bảo toàn nguồn và chuyển giao để tiếp tục điều tra đúng quy trình.']
    ],
    testimony_c: 'Vũ Khải: “Nếu mọi người từng mắc sai lầm, ai đủ tư cách phán xét? Một hệ thống mạnh nên quyết định thay họ.”',
    verdict_c: ['Đối chiếu nguồn độc lập, xác định chỉ đạo của Khải và bàn giao để xác minh.', 'Tin Cyber-M vì công nghệ không thể sai.', 'Chỉ tin trực giác của An, không cần kiểm tra bản gốc.'],
    aftermath_c: [line('An', 'Tôi không cần quy trình hoàn hảo. Tôi cần quy trình cho phép sai lầm được phát hiện, chứng cứ được kiểm tra và quyết định bị chất vấn.'), line('Vũ Khải', 'Con dám giao số phận họ cho con người sao?'), line('An', 'Ông tập trung quyền lực vào một hệ thống không ai được kiểm tra. Đó không phải công lý. Đó là một hình thức lừa đảo khác.')]
  }
];

const INCIDENT_NOTICES = [
  'Thông báo sự cố tại Trung tâm Học bổng. Tài khoản Yến đã bị khóa; hình đại diện đã bị gỡ khỏi bản đồ. Nhật ký hiển thị tài khoản gửi đường dẫn là Minh Khoa. Một người biến mất, một người gửi đường dẫn. Các ngươi sẽ kết tội ai?',
  'Thông báo sự cố tại ngân hàng. Hệ thống thoát hiểm đã bị vô hiệu hóa. Phúc đang bị cách ly trong phòng giao dịch. Đã ghi nhận can thiệp trái phép; dấu vết ban đầu dẫn đến thiết bị của Bảo Linh. Hãy điều tra trước phiên tòa.',
  'Thông báo sự cố tại sàn giao dịch. Tín dụng chung của nhóm đã bị chuyển khỏi bảng thống kê. Đã ghi nhận giao dịch từ tài khoản Đức. Hãy xác định trách nhiệm trong Phiên Tòa Tranh Luận.',
  'Thông báo sự cố tại khu căn hộ. Một cửa bảo mật vừa được mở trái phép. Hệ thống quy hành động cho Hạ Vy. Tệp âm thanh trong phòng cô ta sẽ được đưa vào hồ sơ phiên tòa.',
  'Thông báo sự cố tại văn phòng. Hồ sơ cá nhân của các ngươi đã xuất hiện trên bảng công khai. Phiên tòa tiếp theo sẽ xác định ai đã đưa dữ liệu ra ngoài.',
  'Thông báo sự cố tại Kho Lưu Trữ. Đã phát hiện Bảo Linh truy cập khu vực quản trị. Các nhật ký truy cập sẽ được trình tại phiên tòa. An, ngươi phải chọn một kết luận.',
  'Các phiên điều tra riêng lẻ đã kết thúc. Tất cả người còn lại tập trung tại quảng trường Mê Cung Số. Phiên Tòa Tranh Luận cuối cùng bắt đầu.'
];

const INCIDENT_REACTIONS = [
  [line('Mai', 'Yến! Em có nghe chị không? Đừng đập cửa nữa, mọi người… để em ấy nghe chúng ta!', 'scared'), line('An', 'Yến, nếu nghe được thì ở yên đó. Khoa, nhìn tôi. Tôi nghe cậu nói không gửi tin này. Chúng ta sẽ kiểm tra, không kết tội cậu bằng một cái tên.', 'determined')],
  [line('Mai', 'Phúc đang mắc kẹt sao? Tôi chỉ vừa nghe cuộc gọi đó… Xin ai đó nói tôi phải làm gì!', 'scared'), line('An', 'Mai, đặt thiết bị xuống trước đã. Cậu không cần làm theo người gọi nữa. Tôi sẽ kiểm tra chuyện khóa cửa; đừng để họ ép cậu quyết định ngay.', 'determined')],
  [line('Đức', 'Đừng… đừng nhìn tôi như thế. Tôi sẽ kể hết. Chỉ xin các cậu nghe tôi nói xong.', 'scared'), line('Trâm', 'Chúng tôi đang nghe. Cậu không cần tự bào chữa ngay; hãy kể từ tin nhắn đầu tiên.', 'determined')],
  [line('Trâm', 'Nếu đó thật sự là người nhà tôi thì sao? Tôi không thể cứ đứng đây…', 'scared'), line('An', 'Tôi hiểu. Chính vì vậy chúng ta cần một kênh khác để xác nhận. Tôi không muốn cậu phải đánh cược mạng sống người thân vào một tệp âm thanh.', 'determined')],
  [line('Mai', 'Cả những chuyện chúng ta chưa từng kể ở đây cũng có trong hồ sơ… Ai đã lấy chúng?', 'confused'), line('An', 'Đừng đọc thông tin riêng của nhau thành tiếng. Chúng ta giữ dấu vết để điều tra, không giúp nó gây thêm áp lực.', 'determined')],
  [line('Bảo Linh', 'An… tôi có điều đã giấu mọi người. Tôi sẽ nói hết. Nhưng xin cậu kiểm tra trước khi tin bất kỳ hồ sơ nào về tôi.', 'scared'), line('An', 'Tôi sẽ nghe cậu. Và tôi sẽ hỏi cả điều mà hệ thống không muốn chúng ta hỏi.', 'determined')],
  [line('Mai', 'Lần này chúng ta cùng làm. Không ai phải đứng trước màn hình đó một mình nữa.', 'determined'), line('Minh Khoa', 'An, chuyện tôi trực tiếp trải qua, tôi sẽ xác nhận. Còn chuyện tôi không biết… tôi sẽ nói rõ là không biết.', 'determined')]
];

export function buildCyberChapters(safety) {
  return plots.map((plot, i) => {
    const base = safety[plot.safety_c];
    const incidentLeadIns = [
      'Tại Trung tâm Học bổng, màn hình của Yến chuyển đỏ; cửa khu vực khóa lại.',
      'Cuộc gọi của Mai vừa ngắt thì ngân hàng tối sầm; cửa giao dịch đỏ lên.',
      'Bảng tín dụng đóng băng và số dư chung biến mất khỏi màn hình.',
      'Một tin nhắn cầu cứu vang lên; cửa bảo mật khu căn hộ bật mở.',
      'Bảng công khai trong văn phòng sáng lên cùng hồ sơ của cả nhóm.',
      'Cửa Kho Lưu Trữ khóa lại; một danh sách nội bộ hiện trên màn hình.',
      'Tại quảng trường, Vũ Khải bước tới khi sáu hồ sơ vụ án đồng loạt mở ra.'
    ];
    const incidentDialogue = plot.incident_c.filter(entry => !(i === 1 && entry.speaker_c === 'Quân') && !(i === 2 && entry.speaker_c === 'Đức') && !(i === 5 && entry.speaker_c === 'Bảo Linh'));
    return {
      ...base, ...plot, key_c: `cyber-${i + 1}`, number_c: String(i + 1).padStart(2, '0'),
      setting_c: `Mê Cung Số · Khu ${String(i + 1).padStart(2, '0')} · ${plot.setting_c}`,
      scene_c: ['maze-school', 'maze-bank', 'maze-market', 'maze-residence', 'maze-office', 'maze-archive', 'maze-hub'][i],
      investigation_c: investigationFor(i, plot.clues_c),
      trial_c: TRIALS[i],
      required_clues_c: i === 6 ? 2 : 5,
      title_en_c: plot.title_c, short_c: plot.category_c, difficulty_c: i < 2 ? 'Dễ' : i < 5 ? 'Trung Bình' : 'Khó',
      intro_c: plot.incident_c.map(n => n.text_c).join(' '),
      twist_c: plot.aftermath_c.at(-1).text_c,
      aftermath_c: plot.aftermath_c.flatMap((entry, index) => index === 0 && i >= 1 && i <= 4
        ? [line('Cyber-M', `Phán quyết đã được ghi nhận. ${plot.suspect_c} sẽ được thu hồi vào Kho Lưu Trữ. Những người còn lại không được can thiệp.`), entry]
        : [entry]),
      mechanism_c: [plot.incident_c[0].text_c, plot.clues_c[1][1], plot.clues_c[2][3]],
      questions_c: [
        ['Chứng cứ này cho phép kết luận điều gì?', plot.verdict_c[0], plot.verdict_c[1], plot.verdict_c[2]],
        ['Bạn sẽ bảo vệ nguồn chứng cứ thế nào?', 'Giữ bản gốc, ghi nguồn thu thập và đối chiếu độc lập.', 'Chỉ lưu bản tóm tắt của Cyber-M.', 'Xóa mọi thứ để tránh bị nghi ngờ.'],
        ['Khi một người đang hoảng sợ, bạn nên làm gì?', 'Giúp họ bình tĩnh, lắng nghe và cùng kiểm chứng.', 'Ép họ nhận tội để kết thúc sớm.', 'Công khai thông tin riêng để gây áp lực.']
      ],
      action_c: i === 3 ? 'Dừng làm theo lời cầu cứu; gọi số đã biết từ trước hoặc liên hệ người thân qua kênh độc lập. Không lan truyền bản ghi chưa xác minh.'
        : i === 5 ? 'Không trả phí trước hoặc giao mật khẩu, OTP, khóa bằng chứng cho dịch vụ hứa phục hồi. Bảo toàn bản gốc và xác minh nguồn độc lập.'
        : i === 6 ? 'Bàn giao bản gốc và danh mục nguồn để điều tra độc lập; bảo vệ dữ liệu cá nhân, ghi rõ những điểm chưa đủ căn cứ kết luận.' : base.action_c,
      definition_c: `${plot.category_c}: ${plot.hook_c} ${plot.clues_c[0][3]}`,
      scenes_c: [...(i === 0 ? PROLOGUE : []),
        line('An', incidentLeadIns[i], 'shocked'),
        { ...line('Cyber-M', INCIDENT_NOTICES[i]), warning_c: true },
        ...incidentDialogue, ...INCIDENT_REACTIONS[i],
        line('An', 'Chúng ta sẽ tìm chứng cứ tại hiện trường. Không ai phải thú nhận chỉ vì đang sợ; hãy để các bản ghi được kiểm tra trước.', 'determined')]
    };
  });
}

export const ENDINGS = {
  true: { title_c: 'Sự thật được xác minh', scene_c: 'white-room', frames_c: [
    line('An', 'Danh mục nguồn đã được gửi đến điểm tiếp nhận độc lập. Hệ thống quản trị bị cô lập. Cyber-M mở các vùng lưu trữ. Cánh cửa cuối cùng sáng lên.'),
    line('Mai', 'Họ còn sống! Quân, Đức, Vy, Phúc… tất cả được tìm thấy. Chúng ta thực sự ra ngoài rồi!', 'happy'),
    line('An', 'Tôi tỉnh trong cơ sở y tế. Khi nhìn đủ mười người, tôi mới thở ra. Lần đầu tiên, nhẹ nhõm không đến từ việc mình đoán đúng, mà từ việc không ai phải bị bỏ lại.', 'happy'),
    line('Bảo Linh', 'Cậu định giữ thiết bị lưu trữ làm chiến lợi phẩm à?'),
    line('An', 'Không. Bàn giao bản gốc, lập danh mục nguồn, giữ bản sao được kiểm soát. Tôi đã học rằng phá án không phải chứng minh mình thông minh hơn người khác.', 'happy'),
    line('An', 'Mạng Nhện chưa biến mất sau một đêm. Vũ Khải bị truy tìm; mọi chứng cứ vẫn phải được xác minh theo quy trình. Nếu một Cyber-M khác xuất hiện, tôi sẽ hỏi ai điều khiển nó, dữ liệu từ đâu, và ai có quyền kiểm tra.')
  ] },
  normal: { title_c: 'Bản án chưa hoàn tất', scene_c: 'maze-hub', frames_c: [
    line('An', 'Chúng tôi xác định được Khải, nhưng chuỗi nguồn độc lập còn thiếu. Nhóm thoát khỏi mô phỏng; dữ liệu quan trọng vẫn nằm ngoài tầm kiểm soát.'),
    line('Yến', 'Em mừng vì nhìn thấy bầu trời thật. Nhưng những người khác ngoài kia có còn nhận tin nhắn từ hệ thống ấy không?', 'scared'),
    line('An', 'Tôi không nói vụ án đã xong chỉ để mọi người yên tâm. Tôi bàn giao những gì có thể kiểm tra, ghi rõ phần chưa xác minh. Chúng tôi sẽ tiếp tục cùng nhau.'),
    line('An', 'Mạng Nhện bị tổn thương, chưa bị bóc gỡ. Niềm tin không thể trở lại bằng một lời hứa. Hãy chơi lại các chương, tìm đủ chứng cứ và giữ chuỗi nguồn để mở kết thúc chính.')
  ] },
  bad: { title_c: 'Phán quyết của Cyber-M', scene_c: 'court', frames_c: [
    line('Cyber-M', 'Linh đã bị kết tội. Các ngươi đã chọn bản tóm tắt của ta thay cho quyền kiểm tra nguồn. Ta không cần ra lệnh: con người tự hoàn thành phần còn lại.'),
    line('Bảo Linh', 'An… đừng để lời khai của tôi biến mất. Tôi đã cố cứu họ. Tôi sợ, nhưng tôi không tạo ra chuyện này.', 'scared'),
    line('An', 'Cánh cửa đóng. Tôi nhận ra quá muộn: tôi đã gọi một phán quyết không được kiểm tra là sự thật. Chiến dịch thao túng ngoài kia lại bắt đầu.', 'scared'),
    line('An', 'Một tin nhắn giả mới xuất hiện, dùng chính câu cảnh báo tôi nói ở chương đầu. Không phải vì tôi ngu ngốc. Vì tôi đã để một hệ thống chọn toàn bộ điều mình được biết. Chơi lại phiên tòa chương sáu để chất vấn nguồn chứng cứ.')
  ] }
};