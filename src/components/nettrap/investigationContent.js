const inspect = (hotspot_c, title_c, prompt_c, frame_c, header_c, body_c, artifact_c, hint_c) => ({
  type_c: 'inspect', hotspot_c, title_c, prompt_c, frame_c, header_c, body_c, artifact_c, hint_c
});
const confront = (hotspot_c, title_c, prompt_c, prerequisite_clue_c, position_c, present_clue_c, deflection_c, admission_c, hint_c) => ({
  type_c: 'confront', hotspot_c, title_c, prompt_c, prerequisite_clue_c, position_c, present_clue_c, deflection_c, admission_c, hint_c
});
const compare = (hotspot_c, title_c, prompt_c, records_c, rows_c, targets_c, artifact_c, hint_c) => ({
  type_c: 'compare', hotspot_c, title_c, prompt_c, records_c, rows_c, targets_c, artifact_c, hint_c
});
const search = (hotspot_c, title_c, prompt_c, places_c, target_c, artifact_c, hint_c) => ({
  type_c: 'search', hotspot_c, title_c, prompt_c, places_c, target_c, artifact_c, hint_c
});
const connect = (hotspot_c, title_c, prompt_c, source_c, ports_c, target_c, artifact_c, hint_c) => ({
  type_c: 'connect', hotspot_c, title_c, prompt_c, source_c, ports_c, target_c, artifact_c, hint_c
});
const audio = (hotspot_c, title_c, prompt_c, segments_c, targets_c, artifact_c, hint_c) => ({
  type_c: 'audio', hotspot_c, title_c, prompt_c, segments_c, targets_c, artifact_c, hint_c
});

export const INVESTIGATION_TASKS = [
  [
    inspect('Tin nhắn Yến', 'SMS thúc ép', 'Đánh dấu câu thúc ép, yêu cầu OTP và tên miền gửi đi.', 'sms',
      { from_c: 'KHIEN-SO-HB', time_c: '23:41' }, [
        'Chúc mừng Yến! Hồ sơ của bạn đã được duyệt Học bổng Khiên Số 2026. ',
        { t: 'Hồ sơ sẽ bị hủy sau 10 phút', bad: true, note: 'Hạn chót gấp để bạn không kịp kiểm tra.' },
        ' nếu chưa xác minh. ',
        { t: 'Nhập mã OTP vừa gửi đến số của bạn', bad: true, note: 'Tổ chức thật không bao giờ xin OTP.' },
        ' tại ',
        { t: 'hocbong-khienso.vn-xacminh.top', bad: true, note: 'Tên miền thật nằm ở cuối: .top.' },
        '. ',
        { t: 'Chúc mừng Yến!', note: 'Lời chào bằng tên không chứng minh người gửi thật.' }
      ], 'Tin nhắn lúc 23:41 từ KHIEN-SO-HB đe dọa hủy hồ sơ, xin OTP và dẫn đến tên miền .top.', 'Tìm lời thúc ép, yêu cầu mã và địa chỉ giả trong chính tin nhắn.'),
    inspect('Trang học bổng', 'Trang giả mạo', 'Kiểm tra địa chỉ và thông tin nhạy cảm mà biểu mẫu đòi hỏi.', 'browser',
      { url_c: ['https://', { t: 'hocbong-khienso.vn', note: 'Tên tổ chức nằm trong địa chỉ nhưng chưa xác nhận chủ sở hữu.' }, { t: '-xacminh.top', bad: true, note: 'Tên miền kết thúc bằng .top, không phải cổng học bổng chính thức.' }] }, [
        'HỌC BỔNG KHIÊN SỐ 2026 · XÁC NHẬN HỒ SƠ\n',
        { t: 'Nhập mật khẩu ngân hàng để xác nhận danh tính', bad: true, note: 'Cổng học bổng không cần mật khẩu ngân hàng.' },
        '\n',
        { t: 'Mã OTP bắt buộc để nhận học bổng', bad: true, note: 'OTP có thể cho phép truy cập hoặc xác nhận giao dịch.' },
        '\nMã hồ sơ: ',
        { t: 'YS-2026-0412', note: 'Mã hồ sơ là chi tiết bình thường, không chứng minh trang thuộc tổ chức.' }
      ], 'Trang học bổng giả yêu cầu mật khẩu ngân hàng và OTP trên tên miền không chính thức.', 'Logo có thể sao chép. Hãy kiểm tra tên miền, lời yêu cầu và các trường đăng nhập.'),
    connect('Bàn thiết bị', 'Nguồn gốc đường dẫn', 'Kết nối điện thoại của Yến với máy tính của Linh để trích xuất metadata.', 'Điện thoại Yến · cáp dữ liệu', ['Cổng USB-C / máy Linh', 'Cổng sạc / màn hình quầy'], 0, 'Trình xem dữ liệu: URL được gửi từ nguồn mô phỏng; thời điểm không khớp phiên đăng nhập của Khoa; không có bản ghi người gửi độc lập.', 'Chọn máy tính Linh để trích xuất metadata, không phải cổng sạc.'),
    search('Hộp thư cũ', 'Email khôi phục tài khoản', 'Tìm thư cũ giúp xác định ai từng chiếm tài khoản của Khoa.', ['Thư rác', 'Bản nháp', 'Lưu trữ / cảnh báo đổi email khôi phục', 'Tệp quảng cáo'], 2, 'Email khôi phục cũ ghi nhận Khoa mất quyền truy cập sau một lời mời hợp tác giả.', 'Tìm thư cảnh báo đổi thông tin khôi phục, không phải thư quảng cáo.'),
    compare('Hai bản ghi gửi', 'Bản tóm tắt và nguồn gửi', 'Đối chiếu nhật ký Cyber-M với dữ liệu gửi độc lập.', ['Người gửi hiển thị', 'Thời điểm phát', 'Nguồn / tác vụ'], [
      ['Nhật ký Cyber-M', 'Tài khoản: Minh Khoa', '23:41', 'ASTER / mô phỏng'],
      ['Bản ghi người gửi độc lập', 'Không có phiên gửi của Khoa', 'Không có bản phát tương ứng', 'Không được cung cấp'],
      ['Thiết bị Khoa', 'Phiên đăng nhập đã chấm dứt', 'Lần truy cập trước sự cố', 'Tài khoản từng bị chiếm']
    ], [0, 2], 'Hai nguồn không khớp: Cyber-M tạo bản tóm tắt gán tên Khoa; ASTER xuất hiện như nguồn tác vụ.', 'Tên Khoa chỉ nằm trong bản tóm tắt; hãy chọn dòng thể hiện khác biệt nguồn.'),
  ],
  [
    inspect('Điện thoại Mai', 'Cuộc gọi giả danh', 'Kiểm tra yêu cầu giữ bí mật, chuyển tiền và mở tệp.', 'call',
      { caller_c: '+84 24 7308 1***', duration_c: '06:12', attachment_c: 'bien-ban-xac-minh.pdf' }, [
        '“Tôi gọi từ bộ phận điều tra. Mã hồ sơ của cô là ',
        { t: '204-17', note: 'Mã tham chiếu không xác minh được người gọi.' },
        '.”\n',
        { t: '“Không được gọi cho người thân; vụ việc phải giữ bí mật.”', bad: true, note: 'Cô lập người nghe để họ không kịp xác minh.' },
        '\n',
        { t: '“Chuyển tiền vào tài khoản an toàn trước khi phiên xử lý đóng.”', bad: true, note: 'Cơ quan chức năng không yêu cầu chuyển tiền vào tài khoản cá nhân.' },
        '\n',
        { t: '“Mở tệp hỗ trợ điều tra rồi đọc mã xác nhận cho tôi.”', bad: true, note: 'Tệp lạ và mã xác nhận có thể bị dùng để chiếm quyền.' }
      ], 'Cuộc gọi 06:12 dùng chiêu giữ bí mật, yêu cầu chuyển tiền và mở tệp đính kèm.', 'Đừng tin tên cơ quan tự xưng; kiểm tra các yêu cầu cụ thể trong cuộc gọi.'),
    search('Máy Linh', 'Công cụ mở cửa', 'Tìm trong thiết bị Linh gói công cụ vừa được chép vào.', ['Thư mục ảnh', 'Bản ghi nhật ký', 'Tệp tải xuống / open-door-tool', 'Tệp trò chơi'], 2, 'Công cụ được chép vào máy Linh, nhưng thời điểm sao chép chưa chứng minh nó đã được chạy.', 'Tìm trong thư mục tải xuống, rồi phân biệt tệp có mặt với tệp đã thực thi.'),
    compare('Thời điểm tệp và thực thi', 'Bản sao không phải lệnh chạy', 'So thời điểm chép tệp với nhật ký thực thi độc lập.', ['Thời điểm chép', 'Thời điểm chạy', 'Người thao tác'], [
      ['Bản sao trên máy Linh', '09:18', 'Không ghi nhận', 'Linh'],
      ['Nhật ký thực thi', '—', '09:24 · lệnh mở cửa', 'Quân'],
      ['Báo động cách ly', '—', '09:25', 'Hệ thống']
    ], [1], 'Nhật ký không ghi Linh chạy công cụ; lệnh của Quân xuất hiện trước báo động.', 'So dòng “không ghi nhận” với lệnh thực thi có tên người thao tác.'),
    compare('Cửa và lịch trình', 'Lệnh mở cửa và khu cách ly', 'Đối chiếu cửa ngân hàng, vị trí Quân và thời điểm Phúc bị khóa.', ['Thời điểm', 'Sự kiện', 'Nguồn'], [
      ['09:21', 'Quân rời phòng sinh hoạt chung', 'Bản ghi hành lang'],
      ['09:24', 'Quân chạy công cụ mở cửa', 'Nhật ký lệnh'],
      ['09:25', 'Phúc bị cách ly', 'Cảnh báo cửa']
    ], [1, 2], 'Chuỗi thời gian cho thấy Quân chạy công cụ trước khi cửa khóa Phúc.', 'Tìm hành động ngay trước cảnh báo và người đã rời phòng.'),
    audio('Tai nghe Mai', 'Ghi âm cuộc gọi', 'Phát lại lời nhắn và đánh dấu câu nhận diện từ tài liệu Khiên Số.', ['Lời chào', 'Yêu cầu giữ máy', 'Câu huấn luyện về nỗi sợ', 'Số tài khoản đọc nhanh', 'Âm cuối'], [2], 'Trâm nhận ra câu “khi nạn nhân đã sợ, họ tự tìm lý do để tin” từ tài liệu Khiên Số.', 'Tìm đoạn nói về cách nỗi sợ được dùng để tạo lòng tin.'),
  ],
  [
    inspect('Ảnh số dư', 'Lợi nhuận không có giao dịch', 'Đánh dấu lời hứa lợi nhuận và khoản phí để rút tiền.', 'screenshot',
      { device_c: 'Ảnh chụp ứng dụng đầu tư', captured_c: '18:06', filename_c: 'so-du-vip.png' }, [
        'TÀI KHOẢN HUY · GÓI VIP\n',
        { t: 'Lãi 8% mỗi ngày · bảo đảm vốn', bad: true, note: 'Lợi nhuận cao được bảo đảm là lời hứa cần kiểm chứng.' },
        '\nSố dư hiển thị: 18.400.000₫ · ',
        { t: 'Giao dịch ngân hàng: không có mã', note: 'Một con số trong ảnh không phải chứng từ tiền đã chuyển.' },
        '\n',
        { t: 'Đóng “thuế xác minh” 1.200.000₫ để mở lệnh rút', bad: true, note: 'Yêu cầu trả thêm tiền để lấy tiền cũ là dấu hiệu lừa đảo.' },
        '\n',
        { t: 'Mã chiến dịch ASTER-204', note: 'Mã chiến dịch cần đối chiếu với nguồn độc lập.' }
      ], 'Ảnh số dư hứa lợi nhuận 8% mỗi ngày và đòi phí xác minh để rút tiền.', 'Đối chiếu lời hứa lợi nhuận và phí rút với chứng từ giao dịch thật.'),
    compare('Lịch sử tín dụng', 'Bản ghi chuyển tín dụng', 'Đối chiếu số dư nhóm với lịch sử chuyển khoản.', ['Số dư trước', 'Mã tham chiếu', 'Số dư sau'], [
      ['Bảng tín dụng nhóm', '1.240', 'ASTER-204', '0'],
      ['Nhật ký sàn', '1.240', 'ASTER-204', '0'],
      ['Biên nhận ngân hàng', 'Không có giao dịch tiền thật', 'Không có', 'Không áp dụng']
    ], [2], 'Tín dụng nội bộ được chuyển khỏi bảng nhóm; không có giao dịch ngân hàng tương ứng.', 'Đối chiếu số dư ảo với biên nhận giao dịch tiền thật.'),
    search('Tin nhắn riêng', 'Lời mời đầu tư và thu hồi', 'Tìm cuộc trò chuyện nặc danh hứa sinh lời rồi đòi phí lấy lại tiền.', ['Nhóm lớp', 'Tin nhắn của An', 'Tài khoản nặc danh / đầu tư và khôi phục', 'Thông báo hệ thống'], 2, 'Cùng tài khoản hứa lợi nhuận rồi gửi tin nhắn riêng đòi phí khôi phục.', 'Tìm người lạ chuyển cuộc trò chuyện sang lời hứa đầu tư và thu hồi.'),
    confront('Lời khai Đức', 'Đức đối chiếu tin nhắn', 'Trình một chứng cứ đã thu thập để hỏi về khoản chuyển và phí rút.', 2, [
      'Đức: “Tôi không tham gia điều hành sàn.”',
      'Đức: “Tôi chỉ thấy số dư tăng trên màn hình.”',
      'Đức: “Đừng biến việc tôi chuyển tiền thành lời buộc tội.”'
    ], 2, 'Đức: “Mã trong bảng tín dụng không chứng minh tin nhắn đó gửi cho tôi. Cậu có gì cho thấy họ đã nhắn riêng?”', [
      'Đức: “Đúng… tôi đã chuyển tín dụng.”',
      'Đức: “Họ bảo lợi nhuận sẽ giúp tôi lấy lại khoản đã mất. Tôi đã không kiểm tra.”',
      'Đức: “Khi muốn rút, họ đòi phí khôi phục. Tôi xấu hổ nên im lặng.”'
    ], 'Hãy đối chiếu đúng cuộc trò chuyện nặc danh về đầu tư và khôi phục.'),
    compare('Tham chiếu giao dịch', 'ASTER nối hai vụ', 'So mã của sàn với mã đã thấy trong sự cố ngân hàng.', ['Mã giao dịch', 'Thời điểm', 'Nguồn dữ liệu'], [
      ['Vụ ngân hàng', 'ASTER-204', '09:24', 'Bản ghi hệ thống'],
      ['Vụ sàn', 'ASTER-204', '18:06', 'Bảng tín dụng'],
      ['Nguồn độc lập', 'Cùng mẫu tham chiếu', 'Hai thời điểm khác nhau', 'Hồ sơ Khiên Số']
    ], [0, 2], 'Mã ASTER-204 xuất hiện ở hai vụ và hai nguồn thời gian khác nhau.', 'Chọn dòng mã lặp lại và dòng chỉ ra nguồn độc lập.'),
  ],
  [
    audio('Máy ghi âm', 'Metadata tệp cầu cứu', 'Đánh dấu metadata và dấu cắt có thể kiểm tra độc lập.', ['Đoạn nền', 'Mẫu giọng nói', 'Metadata bị xóa', 'Điểm cắt giữa câu', 'Nguồn ghi'], [2, 4], 'Tệp do mô phỏng cung cấp; metadata nguồn đã bị xóa, nên chưa thể quy danh tính người nói.', 'Tìm chỗ metadata nguồn trống và đoạn bị cắt.'),
    search('Phòng Vy', 'Tệp âm thanh bị giấu', 'Tìm thiết bị lưu bản ghi và lịch sử tệp trong phòng Vy.', ['Ngăn bàn', 'Kệ hồ sơ', 'Ngăn kéo khóa / thẻ nhớ', 'Tủ áo'], 2, 'Thẻ nhớ chứa bản sao âm thanh đã chỉnh sửa; chưa có dữ liệu chứng minh Vy tạo bản gốc.', 'Tìm ngăn kéo có thẻ nhớ, không phải thiết bị phát lại công khai.'),
    compare('Lịch sử chỉnh sửa', 'Bản sao và kho Khiên Số', 'So thời điểm chỉnh sửa với bản lưu trong kho Khiên Số.', ['Thời điểm sửa', 'Nguồn đầu vào', 'Người lưu bản gốc'], [
      ['Bản sao của Vy', 'Sau khi nhận tệp', 'Kho Khiên Số', 'Không rõ'],
      ['Kho lưu trữ', 'Trước khi Vy nhận tệp', 'ASTER / Khiên Số', 'Tài khoản quản trị'],
      ['Thông tin tạo tệp gốc', 'Không có', 'Không có metadata', 'Chưa xác minh']
    ], [1, 2], 'Vy sửa bản sao từ kho lưu trữ; nguồn và người tạo bản gốc chưa được xác minh.', 'Phân biệt lịch sử chỉnh sửa của bản sao với nguồn tệp đầu tiên.'),
    confront('Ghi chú của Vy', 'Vy đối chất về bản ghi', 'Đưa ra một vật chứng để hỏi Vy đã sửa và giấu điều gì.', 2, [
      'Hạ Vy: “Tôi không tạo bản ghi đầu tiên.”',
      'Hạ Vy: “Tôi chỉ giữ bản sao để tìm người đã gửi nó.”',
      'Hạ Vy: “Nếu tôi nói sớm, các cậu sẽ nghĩ tôi là người đứng sau.”'
    ], 2, 'Hạ Vy: “Lịch sử của một tệp không chứng minh tôi sửa nó. Cậu đã đối chiếu bản sao với kho lưu chưa?”', [
      'Hạ Vy: “Được… tôi đã sửa bản sao sau khi nhận thẻ nhớ.”',
      'Hạ Vy: “Tôi giấu nguồn để người gửi tưởng rằng tôi chưa lần ra họ.”',
      'Hạ Vy: “Nhưng tôi không tạo lời cầu cứu ban đầu. Tôi sợ các cậu sẽ không tin.”'
    ], 'Dùng lịch sử chỉnh sửa và mốc nhận tệp, không dựa vào lời đồn.'),
    audio('Tin nhắn dịch vụ', 'Câu lặp trong dịch vụ khôi phục', 'Nghe các đoạn và đánh dấu câu dịch vụ lặp lại từ tệp trước.', ['Lời mở đầu', '“Người tuyệt vọng cần một người cho họ hy vọng.”', 'Tiếng nhiễu', 'Lời hứa khôi phục'], [1], 'Câu của dịch vụ khôi phục lặp lại trong bản ghi; đó là mối liên hệ cần kiểm tra, không phải nhận diện người nói.', 'Tìm câu giống hệt lời dịch vụ đã gửi cho Vy.'),
  ],
  [
    inspect('Bảng tuyển dụng', 'Thông báo việc nhẹ lương cao', 'Kiểm tra lời hứa công việc và điều kiện bàn giao dữ liệu.', 'notice',
      { issuer_c: 'Tuyển dụng · Trung tâm Dữ liệu', issued_c: '18/05/2026', reference_c: 'JOB-204' }, [
        'CỘNG TÁC VIÊN XỬ LÝ DỮ LIỆU · 30 PHÚT MỖI NGÀY\n',
        { t: 'Thu nhập cao, không cần kinh nghiệm', bad: true, note: 'Lời hứa hấp dẫn nhưng không nêu công việc hay bên tuyển dụng cụ thể.' },
        '\nĐầu việc: ',
        { t: 'Xuất danh sách hồ sơ trước 17:00 để nhận thù lao', bad: true, note: 'Yêu cầu bàn giao dữ liệu cá nhân không nêu quyền nhận hoặc mục đích.' },
        '\nĐăng tuyển: ',
        { t: 'JOB-204', note: 'Mã đăng tuyển không xác thực pháp nhân.' },
        '\n',
        { t: 'Trao đổi và nhận hướng dẫn qua tài khoản chat riêng', bad: true, note: 'Không có kênh tuyển dụng chính thức để kiểm tra.' }
      ], 'Thông báo JOB-204 hứa lương cao nhưng yêu cầu xuất dữ liệu qua kênh chat riêng.', 'Tìm lời hứa, yêu cầu xuất dữ liệu và dấu hiệu thiếu đơn vị tuyển dụng thật.'),
    inspect('Dashboard công khai', 'Hồ sơ từ nhiều nguồn', 'Đối chiếu nguồn và mốc thời gian bị trộn trên dashboard.', 'dashboard',
      { title_c: 'Bảng tổng hợp hồ sơ công khai', updated_c: '18/05/2026 · 09:12' }, [
        'HỒ SƠ: Yến · đăng ký học bổng Khiên Số\n',
        { t: 'Nguồn tổng hợp: học bổng / khảo sát tâm lý / báo cáo nhiều nạn nhân', bad: true, note: 'Các nhóm dữ liệu khác mục đích bị gộp vào cùng một hồ sơ.' },
        '\nMốc hồ sơ học bổng: ',
        { t: '11/06/2026', note: 'Ngày gửi hồ sơ cá nhân là một mốc bình thường để đối chiếu.' },
        '\n',
        { t: 'Bản khảo sát cũ và báo cáo nạn nhân mới cùng xuất hiện trong lượt xuất này', bad: true, note: 'Các thời điểm không thuộc cùng một lần thu thập dữ liệu.' },
        '\nSố dòng hiển thị: ',
        { t: '216', note: 'Tổng số dòng không chứng minh nguồn dữ liệu hợp lệ.' }
      ], 'Dashboard trộn hồ sơ học bổng, khảo sát cũ và báo cáo nạn nhân mới trong một lượt xuất.', 'Tìm nhiều nguồn và thời điểm khác nhau, không chỉ nhìn tên Yến.'),
    compare('Quyền truy cập', 'Yến và lệnh xuất của Phúc', 'So quyền xem hồ sơ của Yến với lệnh xuất dữ liệu của Phúc.', ['Thời điểm', 'Tài khoản', 'Hành động'], [
      ['Yến', 'Trước khi rò rỉ', 'Chỉ gửi hồ sơ học bổng'],
      ['Phúc', 'Ngay trước dashboard công khai', 'Xuất tập dữ liệu nhiều nguồn'],
      ['Hồ sơ công khai', 'Sau lệnh xuất', 'Nhiều mốc / nhiều người']
    ], [1, 2], 'Yến chỉ gửi hồ sơ học bổng; lệnh của Phúc xuất tập dữ liệu nhiều nguồn ngay trước lúc công khai.', 'So hành động xuất tập dữ liệu với quyền gửi hồ sơ cá nhân của Yến.'),
    inspect('Email hợp đồng', 'Lời hứa ẩn danh', 'Kiểm tra lời hứa bảo vệ dữ liệu và điều khoản bàn giao.', 'email',
      { from_c: 'Tuyển dụng dữ liệu <jobs@aster-career.example>', to_c: 'Phúc', subject_c: 'Hợp đồng cộng tác · JOB-204' }, [
        'Chào Phúc,\n',
        { t: 'Dữ liệu đã được ẩn danh hoàn toàn', bad: true, note: 'Không có cách kiểm tra hay mô tả phương pháp ẩn danh.' },
        '\nBên nhận dữ liệu: ',
        { t: '[không ghi]', bad: true, note: 'Không nêu bên nhận nên không biết dữ liệu sẽ đến đâu.' },
        '\nThời hạn lưu: ',
        { t: '[không ghi]', bad: true, note: 'Không có giới hạn thời gian lưu trữ hoặc xóa dữ liệu.' },
        '\nMã thỏa thuận: ',
        { t: 'HD-204', note: 'Mã hợp đồng không thay thế tên pháp nhân và điều khoản.' },
        '\nVui lòng xuất thêm hồ sơ trước 17:00 để nhận thanh toán.'
      ], 'Hợp đồng JOB-204 hứa ẩn danh nhưng bỏ trống bên nhận và thời hạn lưu dữ liệu.', 'Đánh dấu lời hứa không thể kiểm chứng và các trường điều khoản còn bỏ trống.'),
    search('Danh mục nguồn', 'ASTER — HỒ SƠ HÀNH VI', 'Tìm thư mục nguồn trong danh sách xuất của Phúc.', ['Tài liệu trò chơi', 'Hồ sơ học bổng', 'ASTER — HỒ SƠ HÀNH VI', 'Bảng thanh toán'], 2, 'Danh mục nguồn nêu ASTER — HỒ SƠ HÀNH VI, cùng hệ thống xuất hiện ở các vụ trước.', 'Tìm tên thư mục có cả ASTER và hồ sơ hành vi.'),
  ],
  [
    inspect('Tin nhắn gửi Linh', 'Danh sách tệp nội bộ', 'Tìm thông tin nội bộ và cách người gửi gây sức ép.', 'chat',
      { from_c: 'Recovery Desk', time_c: '22:14', room_c: 'Tin nhắn riêng · chưa xác minh' }, [
        '“Tôi đã xem vùng cách ly ',
        { t: 'Q-17 · danh sách Mai, Khoa và Yến', bad: true, note: 'Danh sách nội bộ chưa từng được công khai.' },
        '.”\n',
        { t: '“Đừng nói với nhóm. Chỉ cô có thể chọn ai được trở về.”', bad: true, note: 'Tin nhắn dùng thông tin nội bộ và cô lập Linh để ép quyết định.' },
        '\nTài khoản gửi: ',
        { t: 'Recovery Desk', note: 'Tên hiển thị không xác minh được dịch vụ hay người gửi.' }
      ], 'Tin nhắn riêng nêu danh sách người bị cách ly và gây sức ép buộc Linh giữ bí mật.', 'Đối chiếu chi tiết nội bộ với lời hứa riêng và danh tính người gửi.'),
    compare('Tin nhắn khôi phục', 'Dịch vụ và lời hứa với Vy', 'Đối chiếu lời nhắn gửi Vy với lời mời khôi phục Linh nhận được.', ['Câu hứa', 'Yêu cầu', 'Nguồn liên hệ'], [
      ['Tin gửi Vy', 'Lấy lại tài khoản và tiền', 'Giao phí trước', 'Tài khoản nặc danh'],
      ['Tin gửi Linh', 'Phục hồi người đã mất', 'Giao khóa bằng chứng', 'Cùng câu chữ ASTER'],
      ['Nguồn độc lập', 'Không xác minh được dịch vụ', 'Không có pháp nhân', 'Chưa có']
    ], [0, 1, 2], 'Hai lời hứa dùng cùng cách gây hy vọng, đòi giao quyền trước và không có nguồn dịch vụ độc lập.', 'So lời hứa, thứ họ yêu cầu và phần danh tính dịch vụ không xác minh được.'),
    connect('Bảng quản trị', 'Trích xuất nhật ký cách ly', 'Kết nối thiết bị điều tra với bảng Cyber-M để đọc bản trích xuất.', 'Thiết bị Linh · cáp dữ liệu', ['Cổng Cyber-M / bản trích xuất', 'Cổng lưu trữ ngoại vi'], 0, 'Trình xem dữ liệu: mọi nhật ký truy cập Linh được lấy qua Cyber-M; hệ thống đồng thời kiểm soát nguồn và bản sao.', 'Chỉ bảng Cyber-M có quyền mở nhật ký này; lưu ý nguồn trích xuất.'),
    confront('Lời khai Linh', 'Linh đối chất về quyền truy cập', 'Trình chứng cứ đã thu thập để hỏi Linh về nhật ký vùng cách ly.', 2, [
      'Bảo Linh: “Tôi không tạo lệnh thu hồi.”',
      'Bảo Linh: “Tôi chỉ có quyền khẩn cấp khi có người gặp nguy hiểm.”',
      'Bảo Linh: “Tôi biết im lặng khiến mọi người nghi ngờ, nhưng nhật ký không nằm trong tay tôi.”'
    ], 2, 'Bảo Linh: “Bản trích xuất đó do Cyber-M đưa ra. Cậu có nguồn nào xác nhận tôi đã dùng quyền ấy?”', [
      'Bảo Linh: “Đúng… tôi đã dùng quyền khẩn cấp để tìm đường cứu các bạn.”',
      'Bảo Linh: “Tôi sợ nhật ký bị dùng để buộc tội mình nên đã không nói.”',
      'Bảo Linh: “Tôi không tạo lệnh thu hồi. Tôi xin lỗi vì đã giấu việc mình truy cập.”'
    ], 'Hãy đưa ra nhật ký truy cập đã trích xuất trước khi hỏi về quyền khẩn cấp.'),
    inspect('Yêu cầu nhật ký gốc', 'Nguồn bị từ chối', 'Kiểm tra phản hồi của hệ thống và dữ liệu gốc còn thiếu.', 'notice',
      { issuer_c: 'Cyber-M · Quản trị nhật ký', issued_c: '03:20', reference_c: 'CM-OR-17' }, [
        'YÊU CẦU: Bản ghi thô của phiên truy cập vùng cách ly\n',
        { t: 'Dữ liệu thô không được cung cấp', bad: true, note: 'Hệ thống từ chối đưa ra bản gốc.' },
        '\nMã đối soát độc lập: ',
        { t: '[không có]', bad: true, note: 'Không có hash hoặc mã độc lập để kiểm tra bản trích xuất.' },
        '\nPhiên bản nhật ký: ',
        { t: '2.4', note: 'Số phiên bản nội bộ không xác minh được nguồn dữ liệu.' },
        '\nYêu cầu được ghi nhận bởi: Bảo Linh'
      ], 'Cyber-M từ chối dữ liệu thô và không cung cấp mã đối soát độc lập cho nhật ký.', 'Tìm phần bị từ chối và dấu kiểm chứng độc lập còn thiếu.'),
  ],
  [
    search('Ký ức của An', 'Tờ giấy bản lưu độc lập', 'Tìm tờ giấy An để lại và lần theo vị trí bản sao được bảo vệ.', ['Ngăn khóa thiết bị', 'Hộp hồ sơ Yến', 'Khe bàn / giấy ghi “Cyber-M không phải người ra luật”', 'Tủ lưu trữ công khai'], 2, 'Tờ giấy của An dẫn tới bản lưu độc lập được tạo trước khi An bị bắt; bản lưu là điểm bắt đầu, chưa tự chứng minh mọi điều.', 'Tờ giấy có câu “Cyber-M không phải người ra luật”.'),
    compare('Linh kiểm tra nguồn', 'Bản lưu và bản sao Cyber-M', 'So dấu vết bản lưu độc lập với nhật ký Cyber-M.', ['Nguồn tạo', 'Dấu thời gian', 'Danh mục tệp'], [
      ['Bản lưu của An', 'Thiết bị độc lập', 'Trước khi bị bắt', 'Báo cáo / nguồn'],
      ['Bản Cyber-M', 'Máy chủ quản trị', 'Sau khi bị bắt', 'Trích xuất chọn lọc'],
      ['Linh', 'Đối chiếu hash và danh mục', 'Mốc khớp một phần', 'Ghi rõ điểm chưa xác minh']
    ], [0, 2], 'Linh xác nhận một phần mốc và danh mục khớp; nguồn Cyber-M vẫn cần được tách khỏi bản độc lập.', 'So thiết bị tạo bản lưu với máy chủ tạo bản trích xuất.'),
    compare('Mai và Khoa', 'Sự kiện họ trực tiếp trải qua', 'Đối chiếu lời kể của Mai và Khoa với bản lưu độc lập.', ['Mai · cuộc gọi', 'Khoa · tài khoản', 'Mốc trong bản gốc'], [
      ['Mai', 'Cuộc gọi đe dọa trước báo động', 'Không thao tác trên cửa'],
      ['Khoa', 'Mất quyền tài khoản trước Chương 1', 'Không gửi đường dẫn'],
      ['Bản lưu', 'Mốc và sự kiện khớp', 'Không suy rộng động cơ']
    ], [0, 1], 'Lời kể trực tiếp của Mai và Khoa khớp sự kiện, không phải suy luận về động cơ.', 'Đối chiếu mốc họ trực tiếp nhớ với bản gốc.'),
    inspect('Tin nhắn Trâm', 'Thông điệp gây áp lực', 'Tìm câu huấn luyện cũ và yêu cầu giữ bí mật trong tin nhắn.', 'chat',
      { from_c: 'ASTER-Liaison', time_c: '22:04', room_c: 'Tin nhắn được chuyển tiếp' }, [
        'Trâm ghi chú: nhận sau cuộc gọi Mai.\n',
        { t: '“Khi nạn nhân đã sợ, họ tự tìm lý do để tin.”', bad: true, note: 'Câu này trùng với nội dung huấn luyện nghe được trong vụ Mai.' },
        '\n',
        { t: '“Đừng kể với nhóm; chuyện học bổng của họ sẽ bị ảnh hưởng.”', bad: true, note: 'Lời đe dọa dùng thông tin cá nhân để buộc Trâm im lặng.' },
        '\nNgười gửi hiển thị: ',
        { t: 'ASTER-Liaison', note: 'Tên tài khoản hiển thị không xác minh được người gửi.' }
      ], 'Tin nhắn đe dọa hồ sơ học bổng của Trâm lặp lại câu huấn luyện về nỗi sợ.', 'Đối chiếu câu huấn luyện với ghi âm và kiểm tra lời đe dọa trong tin nhắn.'),
    inspect('Dữ liệu học bổng Yến', 'Nguồn gốc thông tin cá nhân', 'Đối chiếu trường dữ liệu bị dùng lại với dấu nguồn của Yến.', 'dashboard',
      { title_c: 'Hồ sơ đối chiếu · Học bổng Khiên Số', updated_c: 'Bản xuất ASTER · 09:12' }, [
        'Hồ sơ Yến · đăng ký gửi ngày 11/06/2026\n',
        { t: 'Nguồn sao chép: ASTER / HỒ SƠ HÀNH VI', bad: true, note: 'Hồ sơ học bổng đã được đưa sang danh mục hành vi khác mục đích.' },
        '\nTrường đối chiếu: ',
        { t: 'mã trường + số liên hệ trùng bản xuất ASTER', bad: true, note: 'Dữ liệu cá nhân xuất hiện lại trong tập tin của hệ thống.' },
        '\nDấu gửi: ',
        { t: '11/06/2026 · biên nhận hồ sơ', note: 'Ngày gửi gốc giúp kiểm tra thứ tự và nguồn dữ liệu.' }
      ], 'Bản xuất ASTER chứa lại trường học bổng và số liên hệ trong hồ sơ Yến.', 'So dữ liệu Yến gửi ban đầu với dấu nguồn trong bản xuất ASTER.'),
  ]
];

export const TRIALS = [
  {
    moments_c: [
      { prompt_c: 'Bản ghi nói Khoa gửi tin. Vật chứng nào cho thấy nguồn của lời buộc tội cần được kiểm tra?', accepted_c: [2, 4], reply_c: 'Bản tóm tắt và bản ghi người gửi không trùng nhau; ASTER là nguồn tác vụ.' },
      { prompt_c: 'Ai có thể đã thao tác trên tài khoản Khoa?', accepted_c: [3, 4], reply_c: 'Email khôi phục cho thấy tài khoản từng bị chiếm; tên tài khoản không xác định người gửi.' }
    ],
    contradiction_c: 'Cyber-M vừa dùng tên Khoa để buộc tội, vừa giữ bản ghi gốc và nguồn tác vụ ngoài tầm kiểm tra.',
    conclusion_c: 'Không ai bị thu hồi. Yến được mở khóa; An tìm thấy tờ giấy nhắc “Cyber-M không phải người ra luật” và cái tên Vũ Khải.'
  },
  {
    moments_c: [
      { prompt_c: 'Tệp có mặt trên máy Linh có chứng minh cô chạy công cụ không?', accepted_c: [1, 2], reply_c: 'Không. Nhật ký sao chép và nhật ký thực thi là hai sự kiện khác nhau.' },
      { prompt_c: 'Lệnh nào dẫn trực tiếp tới việc Phúc bị cách ly?', accepted_c: [3, 4], reply_c: 'Dòng thời gian đặt lệnh của Quân ngay trước báo động; câu huấn luyện là dấu vết về bên thao túng, không xóa hành động đó.' }
    ],
    contradiction_c: 'Quân gây sự cố khi chạy công cụ không xác minh, nhưng chưa có bằng chứng cậu tạo cuộc gọi hoặc là chủ mưu.',
    conclusion_c: 'Quân bị thu hồi. Cậu sợ hãi và cầu xin An đừng để Cyber-M biến cậu thành một bản án; nhóm giữ lại bản ghi Mai và Trâm nhận diện.'
  },
  {
    moments_c: [
      { prompt_c: 'Ảnh lợi nhuận có chứng minh giao dịch thật?', accepted_c: [0, 1], reply_c: 'Không có giao dịch tiền thật; mã chuyển chỉ xuất hiện trong sổ tín dụng của sàn.' },
      { prompt_c: 'Mã nào nối khoản chuyển với vụ trước?', accepted_c: [1, 4], reply_c: 'ASTER-204 lặp lại ở sàn và vụ ngân hàng; hai lần xuất hiện cần được điều tra cùng nhau.' }
    ],
    contradiction_c: 'Đức đã chuyển tín dụng vì tin lời hứa đầu tư và không kiểm tra; hành động đó không biến cậu thành người xây dựng mạng lưới.',
    conclusion_c: 'Đức bị thu hồi. Sau khi thấy khoản chuyển và tin nhắn đòi phí khôi phục, cậu mới thừa nhận đã hy vọng lấy lại tiền.'
  },
  {
    moments_c: [
      { prompt_c: 'Tệp trên thiết bị Vy cho phép kết luận điều gì về người tạo bản ghi gốc?', accepted_c: [0, 2], reply_c: 'Vy sửa bản sao; metadata và hồ sơ kho Khiên Số chưa xác định nguồn tạo bản gốc.' },
      { prompt_c: 'Điều gì lặp lại trong lời cầu cứu và dịch vụ khôi phục?', accepted_c: [3, 4], reply_c: 'Cùng một câu xuất hiện trong tệp và dịch vụ; mối liên hệ cần kiểm tra, không phải bằng chứng đủ để kết tội người tạo tệp.' }
    ],
    contradiction_c: 'Vy che giấu nguồn và sửa bản sao, nhưng bản ghi gốc chưa được truy về Vy.',
    conclusion_c: 'Vy bị thu hồi. Cô sợ hãi xin nhóm giữ lại nguồn tin; An nhớ ra người từng nói câu của dịch vụ khôi phục.'
  },
  {
    moments_c: [
      { prompt_c: 'Hồ sơ công khai chỉ đến từ Yến?', accepted_c: [1, 2], reply_c: 'Không. Dashboard trộn nhiều nguồn và mốc thời gian; lệnh xuất của Phúc đứng trước lúc dữ liệu xuất hiện.' },
      { prompt_c: 'ASTER xuất hiện ở đâu trong bản kê của Phúc?', accepted_c: [3, 4], reply_c: 'Thư mục ASTER — HỒ SƠ HÀNH VI nằm trong danh sách nguồn; hợp đồng không chứng minh dữ liệu thực sự đã ẩn danh.' }
    ],
    contradiction_c: 'Phúc xuất dữ liệu khi chưa xác minh bên thuê; điều đó không chứng minh cậu biết dữ liệu sẽ nhận diện và đe dọa cả nhóm.',
    conclusion_c: 'Phúc bị thu hồi. Danh sách nguồn của cậu giúp nhóm nhìn thấy hồ sơ ASTER không chỉ chứa dữ liệu học bổng.'
  },
  {
    moments_c: [
      { prompt_c: 'Nhật ký được dùng để kết tội Linh có nguồn nào?', accepted_c: [0, 2], reply_c: 'Mọi bản trích xuất đi qua Cyber-M; không có bản gốc độc lập để xác minh.' },
      { prompt_c: 'Linh đã truy cập vì điều gì, và điều đó chứng minh đến đâu?', accepted_c: [1, 3], reply_c: 'Cô tìm cách cứu những người bị cách ly; quyền khẩn cấp không chứng minh cô lập kế hoạch thu hồi.' },
      { prompt_c: 'Cyber-M phản hồi thế nào khi được yêu cầu cung cấp nhật ký nguồn?', accepted_c: [4], reply_c: 'Yêu cầu bản gốc bị từ chối. Không đủ căn cứ đáng tin để kết tội Linh.' }
    ],
    contradiction_c: 'Linh che giấu việc dùng quyền khẩn cấp, nhưng chính hệ thống bị chất vấn kiểm soát toàn bộ nhật ký và từ chối nguồn gốc.',
    conclusion_c: 'An từ chối bỏ phiếu. VK-01 dẫn tới Vũ Khải; lần này An giữ khóa bằng chứng và yêu cầu nguồn độc lập.',
    decisions_c: [
      { label_c: 'Kết tội Bảo Linh', route_c: 'bad' },
      { label_c: 'Từ chối bỏ phiếu, giữ khóa bằng chứng, yêu cầu nguồn độc lập', route_c: 'independent' }
    ]
  },
  {
    moments_c: [
      { prompt_c: 'Bản lưu của An cho phép bắt đầu đối chiếu từ đâu?', accepted_c: [0], reply_c: 'Bản lưu độc lập là điểm khởi đầu; cần kiểm tra danh mục và lịch sử chuyển giao.' },
      { prompt_c: 'Nguồn nào ngoài Cyber-M xác nhận các mốc chính?', accepted_c: [1], reply_c: 'Linh đối chiếu danh mục; lời kể trực tiếp của Mai, Khoa, Trâm và Yến cung cấp các nguồn độc lập.' }
    ],
    contradiction_c: 'Khải xác định được, nhưng một lời nói hay nhật ký Cyber-M không thay thế chuỗi nguồn độc lập.',
    conclusion_c: 'Các hồ sơ được bàn giao để xác minh. Trước khi kết luận, An phải nói rõ chuỗi chứng cứ đã hoàn chỉnh hay còn lỗ hổng.',
    decisions_c: [
      { label_c: 'Trình chuỗi bằng chứng độc lập', ending_c: 'independent' },
      { label_c: 'Kết luận Vũ Khải dựa trên lời nói/nhật ký của Cyber-M', ending_c: 'normal' }
    ]
  }
];

const SPEAKERS = [
  ['Yến', 'An', 'Bảo Linh', 'Minh Khoa', 'An'],
  ['Mai', 'Bảo Linh', 'An', 'Quân', 'Trâm'],
  ['Đức', 'An', 'An', 'Đức', 'Bảo Linh'],
  ['Trâm', 'An', 'An', 'Hạ Vy', 'An'],
  ['Phúc', 'An', 'Bảo Linh', 'Phúc', 'An'],
  ['Bảo Linh', 'An', 'Bảo Linh', 'Bảo Linh', 'An'],
  ['An', 'Bảo Linh', 'Mai', 'Trâm', 'Yến']
];

const TASK_DISCLOSURES = {
  '1:3': ['Quân: “Tôi đã chạy công cụ. Tôi muốn mở cửa cho cả nhóm, nhưng lẽ ra phải kiểm tra nó trước.”', 'An: “Nhật ký xác nhận hành động của cậu, không chứng minh cậu tạo ra cuộc gọi đe dọa Mai.”'],
  '4:3': ['Phúc: “Tôi đã xuất dữ liệu trước khi xác minh bên thuê. Họ nói đó chỉ là thông tin kỹ thuật.”', 'Phúc: “Tôi không biết hồ sơ ấy có thể nhận diện từng người. Tôi đã không kiểm tra hợp đồng.”']
};

export function investigationFor(chapterIndex, clues) {
  return INVESTIGATION_TASKS[chapterIndex].map((task, index) => ({
    ...task,
    clue_index_c: index,
    clue_c: clues[index],
    artifact_c: task.artifact_c || clues[index][1],
    speaker_c: SPEAKERS[chapterIndex][index],
    dialogue_before_c: task.type_c === 'confront'
      ? task.position_c
      : chapterIndex === 0 && index === 2
      ? ['Bảo Linh: “Tôi sẽ mượn máy cho cậu, nhưng đừng mở hay ghi đè dữ liệu gốc.”', 'Yến: “Trong điện thoại có tất cả tin nhắn của em… nếu họ lấy được thì sao?”', 'Minh Khoa: “Tên tài khoản là của tôi, nhưng đừng nhìn tôi như thể tôi đã gửi nó.”']
      : task.type_c === 'inspect'
      ? [`${SPEAKERS[chapterIndex][index]}: “Hãy xem bản gốc, đừng dựa vào tên hiển thị.”`, 'An: “Ta sẽ ghi lại điều có thể kiểm chứng trước khi kết luận.”']
      : [`${SPEAKERS[chapterIndex][index]}: “${task.prompt_c}”`, `An: “Ta sẽ ghi lại nguồn và kiểm tra chi tiết trước khi kết luận.”`],
    dialogue_after_c: task.admission_c || (chapterIndex === 0 && index === 2
      ? ['Bảo Linh: “Giờ gửi lệch khỏi phiên của Khoa; trường hash trống nghĩa là bản tóm tắt do hệ thống tạo.”', 'Minh Khoa: “Tôi không gửi nó. Tôi đã mất quyền vào tài khoản sau một lời mời hợp tác giả… tôi xấu hổ nên không nói.”']
      : TASK_DISCLOSURES[`${chapterIndex}:${index}`] || [`${SPEAKERS[chapterIndex][index]}: “${clues[index][1]}”`, `An: “${clues[index][3]}”`]),
    required_c: chapterIndex !== 6 || index < 2,
    optional_c: chapterIndex === 6 && index >= 2
  }));
}
