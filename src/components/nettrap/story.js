export const TEXT_SPEEDS = ['Chậm', 'Bình thường', 'Nhanh'];
export const LANGUAGES = ['Tiếng Việt', 'English'];
export const DIFFICULTIES = ['Dễ', 'Trung Bình', 'Khó'];

export const CHAPTERS = [
  {
    key_c: 'tin-nhan-nua-dem', number_c: '01', title_c: 'Tin nhắn lúc nửa đêm',
    title_en_c: 'Messages at midnight', category_c: 'Lừa đảo tình cảm', short_c: 'Tình cảm',
    difficulty_c: DIFFICULTIES[0], victim_c: 'Linh · 17 tuổi', suspect_c: 'K',
    setting_c: 'Sân thượng trường học', scene_c: 'school',
    hook_c: 'Một người chưa từng gặp. Một lời hứa. Một khoản tiền không trở lại.',
    intro_c: '23:47. Linh gọi cho An. Người bạn qua mạng tên K vừa biến mất sau khi cô chuyển tiền “viện phí”. Chỉ còn một đoạn chat chưa bị xóa.',
    lure_c: 'K: “Chỉ có em hiểu anh. Anh muốn gặp em, nhưng mẹ anh vừa nhập viện. Đừng kể chuyện của mình cho ai nhé.”',
    pressure_c: 'Linh mở ảnh hóa đơn. Tên bệnh viện bị che, người nhận tiền lại là một tài khoản khác. K bảo: “Em không tin anh sao?”',
    twist_c: 'An tìm bằng hình ảnh và thấy cùng chân dung xuất hiện trên một hồ sơ nước ngoài. Trong lúc đó, K nhắn rằng chỉ còn mười phút để đóng viện phí.',
    ending_c: 'Linh định vay bạn để chuyển thêm. An đặt điện thoại xuống: “Chúng ta có thể quan tâm một người mà vẫn kiểm chứng điều họ nói.”',
    questions_c: [
      ['Bạn sẽ kiểm tra điều gì trước?', 'Tìm nguồn ảnh đại diện và đề nghị xác minh độc lập.', 'Chuyển một ít để thử lòng.', 'Hứa giữ bí mật giúp K.'],
      ['Hóa đơn này có đáng tin?', 'Gọi bệnh viện qua số tự tìm, không dùng số K gửi.', 'Tin vì ảnh có dấu đỏ.', 'Chỉ hỏi K một lần nữa.'],
      ['Linh nên phản hồi áp lực này ra sao?', 'Dừng chuyển tiền và nhờ người tin cậy cùng kiểm tra.', 'Vay nhanh để kịp mười phút.', 'Gửi giấy tờ để chứng minh tình cảm.']
    ],
    clues_c: [
      ['Chân dung bị đánh cắp', 'Ảnh đại diện có nguồn từ một người hoàn toàn khác.', 'Ảnh K trùng với một hồ sơ công khai không liên quan.', 'Danh tính trên mạng cần được xác minh bằng nhiều nguồn.'],
      ['Đề nghị giữ bí mật', 'K muốn Linh không hỏi ý kiến bạn bè hoặc gia đình.', '“Đừng kể cho ai. Chuyện của chúng mình thôi.”', 'Cô lập nạn nhân giúp kẻ gian kiểm soát quyết định.'],
      ['Tài khoản nhận tiền lạ', 'Tên người nhận không khớp người cần hỗ trợ.', 'Người nhận: một bên thứ ba. Nội dung: “hỗ trợ khẩn”.', 'Một lời giải thích cảm động không thay thế được xác minh.'],
      ['Đếm ngược mười phút', 'Thời hạn gấp được dùng để ngăn kiểm tra.', '“Còn 10 phút. Nếu chậm thì mẹ anh không được chữa.”', 'Áp lực thời gian là tín hiệu phải dừng lại.'],
      ['Đòi chuyển thêm tiền', 'Khoản đầu tiên không giải quyết được “sự cố”.', '“Anh cần thêm một khoản cuối cùng. Anh hứa.”', 'Không tiếp tục trả tiền để cứu khoản đã mất.']
    ],
    action_c: 'Dừng chuyển tiền; lưu bằng chứng và nhờ người tin cậy hỗ trợ.',
    definition_c: 'Kẻ gian xây dựng quan hệ tình cảm giả để tạo lòng tin, sau đó dựng tình huống khẩn cấp nhằm xin tiền hoặc lấy thông tin.',
    mechanism_c: ['Kết bạn bằng danh tính hấp dẫn hoặc ảnh đánh cắp.', 'Tạo cảm giác thân thiết và yêu cầu giữ bí mật.', 'Dựng chuyện khẩn cấp rồi liên tục yêu cầu chuyển tiền.']
  },
  {
    key_c: 'duong-link-mau-xanh', number_c: '02', title_c: 'Đường link màu xanh',
    title_en_c: 'The blue link', category_c: 'Phishing', short_c: 'Phishing',
    difficulty_c: DIFFICULTIES[0], victim_c: 'Minh · 19 tuổi', suspect_c: 'Nhân viên hỗ trợ',
    setting_c: 'Quán cà phê sau giờ học', scene_c: 'cafe',
    hook_c: 'Thông báo hoàn tiền đến đúng lúc. Nhưng ai đang đứng sau màn hình?',
    intro_c: 'Minh vừa đặt vé xem nhạc. Một tin nhắn “hoàn tiền” xuất hiện trong lúc cậu ngồi ở quán cà phê. Trang mở ra giống hệt ứng dụng ngân hàng.',
    lure_c: '“Vé của bạn được hoàn 850.000đ. Xác nhận tài khoản trong 15 phút tại bank-hoan-tien.example.”',
    pressure_c: 'Trang web yêu cầu mật khẩu và mã OTP để “nhận tiền”. Người hỗ trợ quả quyết rằng biểu tượng ổ khóa chứng minh đây là trang chính thức.',
    twist_c: 'Tên miền không trùng tên miền ngân hàng. OTP trên điện thoại thực ra ghi “xác nhận chuyển tiền”, không phải nhận hoàn tiền.',
    ending_c: 'An đối chiếu thông báo với ứng dụng chính thức. Không có yêu cầu hoàn tiền nào. Minh kịp đóng trang trước khi gửi OTP.',
    questions_c: [
      ['Kiểm tra đường link bằng cách nào?', 'Mở ứng dụng chính thức để kiểm tra thông báo.', 'Bấm link vì đúng tên sự kiện.', 'Tin biểu tượng ổ khóa.'],
      ['Có nên nhập OTP để nhận tiền?', 'Không; đọc mục đích giao dịch và không chia sẻ OTP.', 'Có, nếu người hỗ trợ hứa không lưu.', 'Gửi OTP qua chat sẽ an toàn hơn.'],
      ['Nếu đã nhập mật khẩu thì sao?', 'Đổi mật khẩu qua kênh chính thức và liên hệ ngân hàng ngay.', 'Chờ xem có mất tiền không.', 'Trả phí để trang web xóa thông tin.']
    ],
    clues_c: [
      ['Tên miền không khớp', 'Địa chỉ web không phải tên miền chính thức.', 'bank-hoan-tien.example — địa chỉ minh họa, không phải ngân hàng.', 'Logo và HTTPS không chứng minh tổ chức sở hữu trang web.'],
      ['Khoản hoàn tiền bất ngờ', 'Yêu cầu không có trong ứng dụng đã cài.', 'Ứng dụng chính thức: không có giao dịch hoàn tiền.', 'Tự mở ứng dụng thay vì đi theo liên kết trong tin nhắn.'],
      ['OTP để chuyển tiền', 'Mã được dùng cho một giao dịch khác lời quảng cáo.', '“Mã xác nhận CHUYỂN TIỀN. Không cung cấp cho bất kỳ ai.”', 'Đọc toàn bộ nội dung OTP và không cung cấp mã.'],
      ['Đe dọa hết hạn', 'Thời hạn giả khiến Minh vội vàng.', '“15 phút cuối để giữ quyền hoàn tiền.”', 'Ưu đãi khẩn cấp không phải lý do bỏ qua kiểm chứng.'],
      ['Thu thập mật khẩu', 'Trang hoàn tiền đòi thông tin đăng nhập ngân hàng.', 'Các ô: tên đăng nhập / mật khẩu / OTP.', 'Không nhập thông tin ngân hàng trên trang được gửi qua chat.']
    ],
    action_c: 'Đóng trang giả; kiểm tra qua ứng dụng và liên hệ ngân hàng chính thức.',
    definition_c: 'Phishing là việc giả mạo tin nhắn, email hoặc website để đánh cắp thông tin đăng nhập, OTP và dữ liệu cá nhân.',
    mechanism_c: ['Gửi thông điệp hấp dẫn hoặc đáng sợ.', 'Dẫn đến trang có logo và giao diện giả.', 'Thu mật khẩu, OTP rồi dùng chúng để chiếm tài khoản.']
  },
  {
    key_c: 'loi-nhuan-khong-bong', number_c: '03', title_c: 'Lợi nhuận không bóng',
    title_en_c: 'Profit without a shadow', category_c: 'Đầu tư ảo', short_c: 'Đầu tư',
    difficulty_c: DIFFICULTIES[1], victim_c: 'Huy · 21 tuổi', suspect_c: 'Mentor X',
    setting_c: 'Phòng máy của câu lạc bộ', scene_c: 'digital',
    hook_c: 'Số dư tăng mỗi ngày. Cho đến lần đầu tiên muốn rút tiền.',
    intro_c: 'Huy khoe một ứng dụng đầu tư tăng 8% mỗi ngày. Nhóm chat toàn lời cảm ơn Mentor X. Nhưng lệnh rút tiền đầu tiên của Huy đang bị treo.',
    lure_c: 'Mentor X: “Không có rủi ro. Nạp thêm hôm nay để lên hạng VIP. Ai mời bạn mới sẽ nhận hoa hồng ngay.”',
    pressure_c: 'Để rút số dư, hệ thống đòi đóng “thuế xác minh” vào tài khoản cá nhân. Khoản thuế không có văn bản hay cơ quan thu nào.',
    twist_c: 'An thấy nhiều thành viên nhóm dùng cùng ảnh chụp lợi nhuận. Không ai đưa được hồ sơ pháp lý độc lập hoặc chứng từ đầu tư.',
    ending_c: 'Huy nhận ra con số trong ứng dụng chỉ là lời hứa của người vận hành. Nạp thêm sẽ không chứng minh được rằng tiền có thể rút.',
    questions_c: [
      ['Cam kết 8% mỗi ngày nói lên điều gì?', 'Lợi nhuận cao được bảo đảm là dấu hiệu cần kiểm tra kỹ.', 'Đây là cơ hội chắc thắng.', 'Chỉ cần nhóm chat đông là đủ.'],
      ['Có nên đóng “thuế rút tiền”?', 'Không nạp thêm; yêu cầu căn cứ pháp lý và lưu bằng chứng.', 'Đóng ngay để cứu khoản cũ.', 'Mời bạn vào để lấy tiền đóng thuế.'],
      ['Bạn sẽ khuyên Huy điều gì?', 'Dừng nạp, lưu giao dịch và trình báo nếu có dấu hiệu chiếm đoạt.', 'Xóa hết chat vì xấu hổ.', 'Vay tiền để lên VIP.']
    ],
    clues_c: [
      ['Lợi nhuận bảo đảm', '8% mỗi ngày được quảng cáo như không có rủi ro.', '“Lãi 8%/ngày. Bảo đảm vốn. Không thể lỗ.”', 'Không có khoản đầu tư sinh lời cao nào mặc nhiên không rủi ro.'],
      ['Thưởng mời người mới', 'Thu nhập phụ thuộc việc kéo thêm người nạp tiền.', 'VIP tăng khi mời thêm ba tài khoản nạp vốn.', 'Mô hình tuyển người và trả hoa hồng có thể che giấu dòng tiền.'],
      ['Phí để được rút', 'Tiền mới được yêu cầu để mở khóa khoản tiền cũ.', '“Đóng thuế xác minh trước khi hệ thống giải ngân.”', 'Đừng trả thêm tiền chỉ vì muốn cứu khoản đã nạp.'],
      ['Ảnh lãi sao chép', 'Nhiều lời chứng thực dùng cùng một hình ảnh.', 'Ba tài khoản gửi cùng ảnh số dư, cùng thời điểm.', 'Lời chứng thực trong nhóm do người bán quản lý không độc lập.'],
      ['Không có hồ sơ rõ ràng', 'Không xác minh được tổ chức và hoạt động đầu tư.', 'Mentor từ chối cung cấp hồ sơ, chỉ gửi ảnh logo.', 'Kiểm tra pháp lý qua nguồn độc lập trước khi giao tiền.']
    ],
    action_c: 'Dừng nạp tiền; lưu giao dịch và trình báo dấu hiệu chiếm đoạt.',
    definition_c: 'Đầu tư ảo dùng lời hứa lợi nhuận và số dư giả để hút tiền; có thể trả khoản nhỏ ban đầu rồi chặn rút và đòi nạp thêm.',
    mechanism_c: ['Dùng nhóm chat và lợi nhuận giả để tạo niềm tin.', 'Khuyến khích nạp thêm và giới thiệu người mới.', 'Chặn rút tiền, đòi phí hoặc biến mất.']
  },
  {
    key_c: 'cong-viec-mot-cham', number_c: '04', title_c: 'Công việc một chạm',
    title_en_c: 'The one-tap job', category_c: 'Việc làm giả', short_c: 'Việc làm',
    difficulty_c: DIFFICULTIES[1], victim_c: 'Mai · 18 tuổi', suspect_c: 'Tuyển dụng viên',
    setting_c: 'Trạm xe buýt lúc tan học', scene_c: 'city',
    hook_c: 'Một việc làm không cần kinh nghiệm. Tại sao người đi làm phải trả tiền?',
    intro_c: 'Mai muốn kiếm tiền học thêm. Một “nhà tuyển dụng” mời cô đánh giá sản phẩm, nhận hoa hồng ngay. Hai nhiệm vụ đầu trả tiền thật.',
    lure_c: '“Mỗi ngày 30 phút, thu nhập cao. Em chỉ cần ứng tiền cho đơn hàng rồi hệ thống trả cả vốn lẫn hoa hồng.”',
    pressure_c: 'Nhiệm vụ thứ ba lớn gấp mười lần. Mai không thể rút tiền vì hệ thống báo “sai thao tác” và đòi nạp để sửa.',
    twist_c: 'An gọi số trên website chính thức của công ty được nhắc đến. Công ty xác nhận không tuyển vị trí này qua nhóm chat.',
    ending_c: 'Khoản trả nhỏ ban đầu là mồi nhử. Mai không cần hoàn thành “chuỗi nhiệm vụ” để có quyền dừng lại.',
    questions_c: [
      ['Hai lần trả tiền có chứng minh công việc thật?', 'Không; khoản trả nhỏ có thể là mồi tạo lòng tin.', 'Có; chuyển tiền là bằng chứng đủ.', 'Có nếu tuyển dụng viên thân thiện.'],
      ['Hệ thống đòi tiền để sửa lỗi, nên làm gì?', 'Dừng nạp và giữ lại bằng chứng yêu cầu.', 'Nạp để không mất chuỗi nhiệm vụ.', 'Mượn tài khoản bạn để làm tiếp.'],
      ['Xác minh nhà tuyển dụng ở đâu?', 'Liên hệ công ty qua thông tin chính thức tự tìm.', 'Hỏi quản trị nhóm tuyển dụng.', 'Tin ảnh thẻ nhân viên trong chat.']
    ],
    clues_c: [
      ['Ứng tiền làm nhiệm vụ', 'Người làm phải chuyển tiền trước để được trả công.', '“Nạp tiền đơn hàng trước, nhận hoa hồng sau.”', 'Cảnh giác công việc yêu cầu ứng vốn hoặc nạp tiền qua chat.'],
      ['Hoa hồng mồi nhử', 'Hai khoản nhỏ khiến Mai tin vào các khoản lớn.', 'Nhiệm vụ nhỏ được trả ngay; nhiệm vụ sau tăng mạnh.', 'Thanh toán ban đầu không chứng minh mô hình an toàn.'],
      ['Lỗi thao tác giả', 'Một “lỗi” chỉ được sửa bằng cách nạp thêm tiền.', '“Nạp bổ sung để sửa đơn và mở khóa rút tiền.”', 'Không trả phí để sửa lỗi do hệ thống không rõ nguồn tạo ra.'],
      ['Mạo danh công ty', 'Doanh nghiệp chính thức không có vị trí tuyển dụng này.', 'Bộ phận tuyển dụng: “Đây không phải kênh của chúng tôi.”', 'Tự tìm thông tin liên hệ công ty để kiểm tra.'],
      ['Không có hợp đồng', 'Điều kiện trả công thay đổi ngay trong chat.', 'Tuyển dụng viên từ chối gửi hợp đồng và địa chỉ làm việc.', 'Yêu cầu thông tin công việc rõ ràng trước khi cung cấp dữ liệu.']
    ],
    action_c: 'Dừng ứng tiền; xác minh công ty qua kênh chính thức và lưu chứng cứ.',
    definition_c: 'Việc làm giả hứa thu nhập dễ dàng, dùng nhiệm vụ hoặc đơn hàng để khiến người tìm việc ứng tiền rồi chặn rút.',
    mechanism_c: ['Mời việc nhẹ, lương cao, không yêu cầu kinh nghiệm.', 'Trả một khoản nhỏ để tạo lòng tin.', 'Tăng khoản ứng trước rồi dựng lỗi và yêu cầu nạp thêm.']
  },
  {
    key_c: 'cuoc-goi-khong-danh-tinh', number_c: '05', title_c: 'Cuộc gọi không danh tính',
    title_en_c: 'The faceless call', category_c: 'Giả mạo cơ quan', short_c: 'Cơ quan',
    difficulty_c: DIFFICULTIES[2], victim_c: 'Nam · 20 tuổi', suspect_c: 'Cán bộ giả',
    setting_c: 'Hành lang ký túc xá', scene_c: 'school',
    hook_c: 'Một lệnh bắt trên màn hình. Một giọng nói không cho phép bạn đặt câu hỏi.',
    intro_c: 'Nam nhận cuộc gọi nói rằng căn cước của cậu liên quan đến đường dây rửa tiền. Người gọi gửi hình “lệnh bắt” và yêu cầu giữ máy.',
    lure_c: '“Không được báo gia đình. Chuyển tiền vào tài khoản kiểm tra để chứng minh trong sạch. Nếu ngắt máy, chúng tôi sẽ xử lý ngay.”',
    pressure_c: 'Người gọi yêu cầu Nam cài ứng dụng “hỗ trợ điều tra” từ một tệp gửi qua chat và bật quyền truy cập màn hình.',
    twist_c: 'Hình lệnh có lỗi tên cơ quan. An đề nghị Nam ngắt cuộc gọi và tự liên hệ cơ quan công an gần nhất, thay vì gọi số đối tượng đưa.',
    ending_c: 'Không một hình ảnh đồng phục hay con dấu nào có quyền buộc Nam chuyển tiền qua điện thoại. Cậu có quyền dừng để xác minh.',
    questions_c: [
      ['Yêu cầu “chuyển tiền kiểm tra” có đáng tin?', 'Không; dừng và xác minh trực tiếp qua kênh độc lập.', 'Có nếu người gọi biết số căn cước.', 'Có vì ảnh lệnh có con dấu.'],
      ['Có nên cài tệp hỗ trợ điều tra?', 'Không cài tệp lạ hay cấp quyền điều khiển thiết bị.', 'Cài nhưng giấu ứng dụng ngân hàng.', 'Cài vì được đe dọa khẩn cấp.'],
      ['Nam nên tìm hỗ trợ thế nào?', 'Báo người tin cậy và liên hệ cơ quan công an qua kênh tự tìm.', 'Giữ bí mật như người gọi yêu cầu.', 'Gọi lại số trong ảnh lệnh.']
    ],
    clues_c: [
      ['Chuyển tiền kiểm tra', 'Đối tượng yêu cầu chuyển tiền để chứng minh vô tội.', '“Chuyển toàn bộ số dư vào tài khoản kiểm tra.”', 'Không chuyển tiền theo yêu cầu điều tra qua cuộc gọi lạ.'],
      ['Cô lập nạn nhân', 'Nam bị cấm hỏi người thân và ngắt máy.', '“Không báo cho bất cứ ai. Không được tắt cuộc gọi.”', 'Dừng cuộc gọi và nhờ người tin cậy giúp xác minh.'],
      ['Ứng dụng điều khiển', 'Tệp ngoài kho ứng dụng xin quyền màn hình.', 'Tệp cài đặt lạ yêu cầu quyền trợ năng và chia sẻ màn hình.', 'Không cài ứng dụng hoặc cấp quyền theo chỉ dẫn người lạ.'],
      ['Văn bản giả', 'Hình lệnh có lỗi tên cơ quan và không được xác minh.', 'Tên cơ quan sai; ảnh chỉ được gửi trong chat.', 'Con dấu trong ảnh dễ làm giả; kiểm chứng qua nguồn độc lập.'],
      ['Đe dọa tức thì', 'Sợ hãi được dùng để ngăn Nam suy nghĩ.', '“Nếu ngắt máy, em sẽ bị bắt ngay.”', 'Áp lực và đe dọa là lý do để dừng, không phải để chuyển tiền.']
    ],
    action_c: 'Ngắt cuộc gọi; không chuyển tiền hoặc cài tệp; xác minh độc lập.',
    definition_c: 'Kẻ gian giả danh công an, tòa án hoặc cơ quan khác để đe dọa, lấy dữ liệu và ép nạn nhân chuyển tiền hoặc cài ứng dụng độc hại.',
    mechanism_c: ['Dùng thông tin cá nhân để tạo vẻ đáng tin.', 'Đe dọa và yêu cầu giữ bí mật.', 'Ép chuyển tiền hoặc cài ứng dụng để kiểm soát thiết bị.']
  },
  {
    key_c: 'nguoi-ban-sau-man-hinh', number_c: '06', title_c: 'Người bạn sau màn hình',
    title_en_c: 'The friend behind the screen', category_c: 'Chiếm đoạt tài khoản', short_c: 'Tài khoản',
    difficulty_c: DIFFICULTIES[2], victim_c: 'Vy · 22 tuổi', suspect_c: 'Bạn thân giả',
    setting_c: 'Phòng máy lúc mất điện', scene_c: 'digital',
    hook_c: 'Đúng ảnh đại diện. Đúng cách xưng hô. Nhưng không còn là bạn của bạn.',
    intro_c: 'Vy nhận tin nhắn từ tài khoản bạn thân: “Tớ mất máy, cho tớ mượn mã vừa gửi đến điện thoại cậu.” An nhận thấy câu chuyện có một điểm bất thường.',
    lure_c: '“Mã của tớ gửi nhầm sang cậu. Đưa mã đây nhanh nhé. Tớ cần đăng nhập để gọi cho mẹ.”',
    pressure_c: 'Mã thực ra là mã khôi phục tài khoản của Vy. Khi Vy đề nghị gọi qua số quen thuộc, người nhắn tránh né và chỉ gửi một đoạn video ngắn.',
    twist_c: 'Bạn thật của Vy xác nhận qua số điện thoại đã lưu: tài khoản mạng xã hội vừa bị chiếm. Kẻ gian đang nhắn xin tiền và mã của nhiều người.',
    ending_c: 'An và Vy cảnh báo nhóm bạn bằng kênh khác. Một tài khoản quen thuộc không đồng nghĩa với một người gửi đáng tin.',
    questions_c: [
      ['Bạn xử lý mã vừa nhận thế nào?', 'Không chia sẻ; đọc rõ mã dùng cho tài khoản nào.', 'Gửi vì đây là bạn thân.', 'Chụp màn hình thay vì gõ mã.'],
      ['Xác minh người đang nhắn bằng cách nào?', 'Gọi số đã lưu từ trước hoặc xác minh trực tiếp.', 'Tin video vài giây được gửi trong chat.', 'Hỏi họ có phải bạn mình không.'],
      ['Nếu tài khoản đã bị chiếm?', 'Dùng quy trình khôi phục chính thức, thoát phiên lạ và cảnh báo bạn bè.', 'Trả tiền người hứa lấy lại tài khoản.', 'Gửi căn cước cho dịch vụ qua tin nhắn lạ.']
    ],
    clues_c: [
      ['Mã khôi phục của Vy', 'Mã không dành cho người bạn đang xin trợ giúp.', '“Mã khôi phục tài khoản của bạn. Không chia sẻ.”', 'OTP và mã khôi phục không được cho mượn.'],
      ['Lời nhắn từ tài khoản quen', 'Danh tính tài khoản tạo lòng tin quá nhanh.', 'Cùng ảnh đại diện và tên bạn thân.', 'Tài khoản quen thuộc vẫn có thể bị chiếm đoạt.'],
      ['Né cuộc gọi độc lập', 'Người nhắn không muốn xác minh qua số đã lưu.', '“Không gọi được đâu. Gửi mã trước đi.”', 'Gọi qua số đã biết, không dùng số mới được gửi trong chat.'],
      ['Bạn thật xác nhận', 'Nguồn độc lập cho biết tài khoản đã bị chiếm.', 'Cuộc gọi đến số cũ: “Tài khoản của tớ bị mất rồi.”', 'Một kênh độc lập có thể phá vỡ trò giả danh.'],
      ['Nhắn hàng loạt xin mã', 'Kẻ gian dùng tài khoản để mở rộng số nạn nhân.', 'Nhiều bạn cùng nhận yêu cầu mã và chuyển tiền.', 'Cảnh báo người quen bằng kênh không bị kiểm soát.']
    ],
    action_c: 'Không gửi mã; xác minh qua số đã lưu và dùng quy trình khôi phục chính thức.',
    definition_c: 'Sau khi lấy quyền truy cập tài khoản, kẻ gian giả làm chủ tài khoản để xin mã, vay tiền hoặc tiếp tục chiếm tài khoản của người quen.',
    mechanism_c: ['Lấy mật khẩu hoặc mã khôi phục.', 'Dùng tài khoản quen thuộc để nhắn cho bạn bè.', 'Xin tiền và mã để mở rộng việc chiếm đoạt.']
  }
];

export const CAST = [
  { key_c: 'an', name_c: 'An', role_c: 'Thám tử', chapter_c: 0, variant_c: 'detective', bio_c: '19 tuổi. Thành viên câu lạc bộ báo chí. Không tin một lời hứa trước khi kiểm tra nguồn.' },
  { key_c: 'linh', name_c: 'Linh', role_c: 'Nạn nhân', chapter_c: 0, variant_c: 'victim', bio_c: '17 tuổi. Vẽ tranh trong giờ nghỉ. Học cách tìm hỗ trợ mà không tự trách mình.' },
  { key_c: 'shadow', name_c: 'Ẩn Danh', role_c: 'Kẻ gian', chapter_c: 1, variant_c: 'suspect', bio_c: 'Một khuôn mặt, nhiều vai diễn. Không phải nhân vật nào trên mạng cũng là người họ tự nhận.' }
];

export function scenesFor(chapter) {
  if (!chapter) return [];
  const question = (index, clue) => ({
    speaker_c: 'An', text_c: chapter.questions_c[index][0],
    english_c: 'Which response protects the victim? Review the evidence before deciding.',
    choices_c: chapter.questions_c[index].slice(1), clue_c: clue,
    emotion_c: 'suspicious', warning_c: true
  });
  return [
    { speaker_c: 'An', text_c: chapter.intro_c, english_c: 'A suspicious message has reached a student. Your investigation begins.', emotion_c: 'neutral' },
    { speaker_c: chapter.suspect_c, text_c: chapter.lure_c, english_c: 'The sender offers trust, rewards or urgent help. Something does not add up.', auto_clue_c: 1, emotion_c: 'happy', warning_c: true },
    question(0, 0),
    { speaker_c: chapter.victim_c.split(' · ')[0], text_c: chapter.pressure_c, english_c: 'The victim is pressured to act before checking the request.', emotion_c: 'scared', warning_c: true },
    question(1, 2),
    { speaker_c: 'An', text_c: chapter.twist_c, english_c: 'An independent source contradicts the sender. Keep this evidence.', auto_clue_c: 3, emotion_c: 'shocked' },
    question(2, 4),
    { speaker_c: 'An', text_c: chapter.ending_c, english_c: 'You can pause, verify and ask for help. Review your evidence and make a verdict.', emotion_c: 'neutral' }
  ];
}

export const REPORT_TEXT = 'Nếu đã chuyển tiền, liên hệ ngay ngân hàng qua ứng dụng hoặc số chính thức để đề nghị hỗ trợ. Lưu tin nhắn, số tài khoản, biên lai và trình báo cơ quan công an gần nhất. Nếu có nguy hiểm tức thời, gọi 113. Không trả tiền cho người hứa “thu hồi tiền lừa đảo”.';
export const REFERENCE_URL = 'https://bocongan.gov.vn/';