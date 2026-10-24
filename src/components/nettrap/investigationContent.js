const inspect = (hotspot_c, title_c, prompt_c, items_c, targets_c, artifact_c, hint_c) => ({
  type_c: 'inspect', hotspot_c, title_c, prompt_c, items_c, targets_c, artifact_c, hint_c
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
    inspect('Tin nhắn Yến', 'SMS thúc ép', 'Đánh dấu câu tạo áp lực thời gian và yêu cầu mã xác thực.', ['Tin nhắn lúc 23:41', 'Hồ sơ bị hủy trong 10 phút', 'Nhập OTP để giữ học bổng'], [1, 2], 'Bản SMS gốc: yêu cầu nhập OTP dưới áp lực hạn chót; người gửi không được xác minh.', 'Tìm lời đe dọa và yêu cầu mã — không dựa vào tên hiển thị.'),
    inspect('Trang học bổng', 'Trang giả mạo', 'Kiểm tra địa chỉ trang và những trường dữ liệu trang yêu cầu.', ['Logo Khiên Số', 'hocbong-xacminh.example', 'Mật khẩu và OTP'], [1, 2], 'Tên miền không thuộc cổng học bổng; biểu mẫu thu thập mật khẩu và OTP.', 'Logo có thể sao chép. Hãy đọc địa chỉ và nội dung biểu mẫu.'),
    connect('Bàn thiết bị', 'Nguồn gốc đường dẫn', 'Kết nối điện thoại của Yến với máy tính của Linh để trích xuất metadata.', 'Điện thoại Yến · cáp dữ liệu', ['Cổng USB-C / máy Linh', 'Cổng sạc / màn hình quầy'], 0, 'Trình xem dữ liệu: URL được gửi từ nguồn mô phỏng; thời điểm không khớp phiên đăng nhập của Khoa; không có bản ghi người gửi độc lập.', 'Chọn máy tính Linh để trích xuất metadata, không phải cổng sạc.'),
    search('Hộp thư cũ', 'Email khôi phục tài khoản', 'Tìm thư cũ giúp xác định ai từng chiếm tài khoản của Khoa.', ['Thư rác', 'Bản nháp', 'Lưu trữ / cảnh báo đổi email khôi phục', 'Tệp quảng cáo'], 2, 'Email khôi phục cũ ghi nhận Khoa mất quyền truy cập sau một lời mời hợp tác giả.', 'Tìm thư cảnh báo đổi thông tin khôi phục, không phải thư quảng cáo.'),
    compare('Hai bản ghi gửi', 'Bản tóm tắt và nguồn gửi', 'Đối chiếu nhật ký Cyber-M với dữ liệu gửi độc lập.', ['Người gửi hiển thị', 'Thời điểm phát', 'Nguồn / tác vụ'], [
      ['Nhật ký Cyber-M', 'Tài khoản: Minh Khoa', '23:41', 'ASTER / mô phỏng'],
      ['Bản ghi người gửi độc lập', 'Không có phiên gửi của Khoa', 'Không có bản phát tương ứng', 'Không được cung cấp'],
      ['Thiết bị Khoa', 'Phiên đăng nhập đã chấm dứt', 'Lần truy cập trước sự cố', 'Tài khoản từng bị chiếm']
    ], [0, 2], 'Hai nguồn không khớp: Cyber-M tạo bản tóm tắt gán tên Khoa; ASTER xuất hiện như nguồn tác vụ.', 'Tên Khoa chỉ nằm trong bản tóm tắt; hãy chọn dòng thể hiện khác biệt nguồn.'),
  ],
  [
    inspect('Điện thoại Mai', 'Cuộc gọi giả danh', 'Mở nhật ký cuộc gọi và tệp đính kèm để tìm yêu cầu nguy hiểm.', ['Số lạ tự xưng cơ quan chức năng', 'Yêu cầu giữ bí mật và chuyển tiền', 'Tệp “hỗ trợ điều tra”'], [1, 2], 'Cuộc gọi ép Mai giữ máy, chuyển tiền vào “tài khoản an toàn” và mở tệp đính kèm.', 'Đọc yêu cầu của người gọi và kiểm tra tệp họ gửi.'),
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
    inspect('Ảnh số dư', 'Lợi nhuận không có giao dịch', 'Đánh dấu phần ảnh thể hiện lợi nhuận nhưng thiếu chứng từ giao dịch.', ['Số dư tăng ảo', 'Mã giao dịch ngân hàng', 'Không có mã rút tiền'], [0, 2], 'Ảnh hiển thị lợi nhuận nhưng không có giao dịch xác nhận hay mã rút tiền.', 'Tìm số dư quảng cáo và trường giao dịch còn trống.'),
    compare('Lịch sử tín dụng', 'Bản ghi chuyển tín dụng', 'Đối chiếu số dư nhóm với lịch sử chuyển khoản.', ['Số dư trước', 'Mã tham chiếu', 'Số dư sau'], [
      ['Bảng tín dụng nhóm', '1.240', 'ASTER-204', '0'],
      ['Nhật ký sàn', '1.240', 'ASTER-204', '0'],
      ['Biên nhận ngân hàng', 'Không có giao dịch tiền thật', 'Không có', 'Không áp dụng']
    ], [2], 'Tín dụng nội bộ được chuyển khỏi bảng nhóm; không có giao dịch ngân hàng tương ứng.', 'Đối chiếu số dư ảo với biên nhận giao dịch tiền thật.'),
    search('Tin nhắn riêng', 'Lời mời đầu tư và thu hồi', 'Tìm cuộc trò chuyện nặc danh hứa sinh lời rồi đòi phí lấy lại tiền.', ['Nhóm lớp', 'Tin nhắn của An', 'Tài khoản nặc danh / đầu tư và khôi phục', 'Thông báo hệ thống'], 2, 'Cùng tài khoản hứa lợi nhuận rồi gửi tin nhắn riêng đòi phí khôi phục.', 'Tìm người lạ chuyển cuộc trò chuyện sang lời hứa đầu tư và thu hồi.'),
    inspect('Lời khai Đức', 'Đức đối chiếu tin nhắn', 'So lời kể của Đức với khoản chuyển trước khi kết luận động cơ.', ['“Tôi chuyển tín dụng vì lời hứa lợi nhuận.”', '“Tôi đã biết tiền thật đang được chuyển.”', '“Sau đó họ đòi phí khôi phục.”'], [0, 2], 'Sau khi thấy đường đi của tín dụng và tin nhắn khôi phục, Đức thừa nhận đã chuyển khoản nhưng không biết số dư là giả.', 'Tách hành động Đức thừa nhận ra điều cậu chưa thể biết.'),
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
    inspect('Ghi chú của Vy', 'Lời khai sau đối chiếu', 'Đánh dấu điều Vy thừa nhận và điều chưa được chứng minh.', ['Vy sửa một bản sao', 'Vy muốn dụ người điều hành phản hồi', 'Vy tạo lời cầu cứu ban đầu'], [0, 1], 'Vy thừa nhận sửa bản sao và giấu nguồn để dụ người điều hành; điều đó không chứng minh cô tạo tệp gốc.', 'Chọn lời thừa nhận có căn cứ; đừng suy rộng từ bản sao sang bản gốc.'),
    audio('Tin nhắn dịch vụ', 'Câu lặp trong dịch vụ khôi phục', 'Nghe các đoạn và đánh dấu câu dịch vụ lặp lại từ tệp trước.', ['Lời mở đầu', '“Người tuyệt vọng cần một người cho họ hy vọng.”', 'Tiếng nhiễu', 'Lời hứa khôi phục'], [1], 'Câu của dịch vụ khôi phục lặp lại trong bản ghi; đó là mối liên hệ cần kiểm tra, không phải nhận diện người nói.', 'Tìm câu giống hệt lời dịch vụ đã gửi cho Vy.'),
  ],
  [
    inspect('Bảng tuyển dụng', 'Thông báo việc nhẹ lương cao', 'Kiểm tra lời hứa công việc và điều kiện gửi dữ liệu.', ['Việc nhẹ, lương cao', 'Yêu cầu xuất dữ liệu để nhận lương', 'Thông tin đơn vị tuyển dụng xác thực'], [0, 1], 'Thông báo hứa trả công để đổi lấy dữ liệu nhưng không chứng minh đơn vị tuyển dụng có quyền nhận dữ liệu.', 'Đánh dấu lời hứa và yêu cầu dữ liệu, rồi kiểm tra đơn vị.'),
    inspect('Dashboard công khai', 'Hồ sơ từ nhiều nguồn', 'Đánh dấu các nguồn và mốc thời gian khác nhau trên dashboard.', ['Hồ sơ Yến · học bổng', 'Khảo sát tâm lý · mốc cũ', 'Báo cáo nhiều nạn nhân · mốc mới'], [1, 2], 'Bảng công khai trộn dữ liệu của nhiều người và nhiều thời điểm; không chỉ có hồ sơ Yến.', 'Tìm các nguồn và ngày không thuộc cùng một lần gửi dữ liệu.'),
    compare('Quyền truy cập', 'Yến và lệnh xuất của Phúc', 'So quyền xem hồ sơ của Yến với lệnh xuất dữ liệu của Phúc.', ['Thời điểm', 'Tài khoản', 'Hành động'], [
      ['Yến', 'Trước khi rò rỉ', 'Chỉ gửi hồ sơ học bổng'],
      ['Phúc', 'Ngay trước dashboard công khai', 'Xuất tập dữ liệu nhiều nguồn'],
      ['Hồ sơ công khai', 'Sau lệnh xuất', 'Nhiều mốc / nhiều người']
    ], [1, 2], 'Yến chỉ gửi hồ sơ học bổng; lệnh của Phúc xuất tập dữ liệu nhiều nguồn ngay trước lúc công khai.', 'So hành động xuất tập dữ liệu với quyền gửi hồ sơ cá nhân của Yến.'),
    inspect('Email hợp đồng', 'Lời hứa ẩn danh', 'Đánh dấu yêu cầu dữ liệu và lời hứa không có điều khoản kiểm chứng.', ['“Dữ liệu đã ẩn danh.”', 'Không nêu bên nhận hoặc thời hạn lưu', 'Yêu cầu gửi thêm hồ sơ để thanh toán'], [0, 1, 2], 'Email của Phúc tuyên bố dữ liệu đã ẩn danh nhưng không nêu bên nhận, giới hạn hoặc cách kiểm tra.', 'Đánh dấu cả lời hứa lẫn thông tin hợp đồng còn thiếu.'),
    search('Danh mục nguồn', 'ASTER — HỒ SƠ HÀNH VI', 'Tìm thư mục nguồn trong danh sách xuất của Phúc.', ['Tài liệu trò chơi', 'Hồ sơ học bổng', 'ASTER — HỒ SƠ HÀNH VI', 'Bảng thanh toán'], 2, 'Danh mục nguồn nêu ASTER — HỒ SƠ HÀNH VI, cùng hệ thống xuất hiện ở các vụ trước.', 'Tìm tên thư mục có cả ASTER và hồ sơ hành vi.'),
  ],
  [
    inspect('Tin nhắn gửi Linh', 'Danh sách tệp nội bộ', 'Đánh dấu chi tiết trong tin nhắn chỉ người quản trị mới biết.', ['Tên vùng cách ly', 'Danh sách hồ sơ chưa công khai', 'Tin nhắn của dịch vụ thu hồi'], [0, 1], 'Tin nhắn gửi Linh có danh sách tệp nội bộ chưa từng công khai.', 'Tìm thông tin nội bộ và danh sách không xuất hiện trong hồ sơ công khai.'),
    compare('Tin nhắn khôi phục', 'Dịch vụ và lời hứa với Vy', 'Đối chiếu lời nhắn gửi Vy với lời mời khôi phục Linh nhận được.', ['Câu hứa', 'Yêu cầu', 'Nguồn liên hệ'], [
      ['Tin gửi Vy', 'Lấy lại tài khoản và tiền', 'Giao phí trước', 'Tài khoản nặc danh'],
      ['Tin gửi Linh', 'Phục hồi người đã mất', 'Giao khóa bằng chứng', 'Cùng câu chữ ASTER'],
      ['Nguồn độc lập', 'Không xác minh được dịch vụ', 'Không có pháp nhân', 'Chưa có']
    ], [0, 1, 2], 'Hai lời hứa dùng cùng cách gây hy vọng, đòi giao quyền trước và không có nguồn dịch vụ độc lập.', 'So lời hứa, thứ họ yêu cầu và phần danh tính dịch vụ không xác minh được.'),
    connect('Bảng quản trị', 'Trích xuất nhật ký cách ly', 'Kết nối thiết bị điều tra với bảng Cyber-M để đọc bản trích xuất.', 'Thiết bị Linh · cáp dữ liệu', ['Cổng Cyber-M / bản trích xuất', 'Cổng lưu trữ ngoại vi'], 0, 'Trình xem dữ liệu: mọi nhật ký truy cập Linh được lấy qua Cyber-M; hệ thống đồng thời kiểm soát nguồn và bản sao.', 'Chỉ bảng Cyber-M có quyền mở nhật ký này; lưu ý nguồn trích xuất.'),
    inspect('Lời khai Linh', 'Truy cập vùng cách ly', 'Đối chiếu lời khai của Linh với quyền mở vùng cách ly.', ['Linh tìm cách cứu các bạn', 'Linh có quyền truy cập khẩn cấp', 'Linh tạo lệnh thu hồi'], [0, 1], 'Sau khi đối chiếu quyền và mốc truy cập, Linh thừa nhận đã dùng quyền khẩn cấp để tìm bạn bè.', 'Chọn điều Linh xác nhận và điều quyền truy cập không chứng minh.'),
    inspect('Yêu cầu nhật ký gốc', 'Nguồn bị từ chối', 'Đánh dấu phản hồi của hệ thống khi nhóm yêu cầu bản ghi gốc.', ['Yêu cầu dữ liệu thô', 'Cyber-M từ chối', 'Không cung cấp mã kiểm tra độc lập'], [1, 2], 'Nguồn nhật ký gốc bị từ chối; không có cách xác minh độc lập nội dung bản trích xuất.', 'Tìm phản hồi từ chối và phần mã nguồn/kiểm tra còn thiếu.'),
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
    inspect('Tin nhắn Trâm', 'Thông điệp gây áp lực', 'Tìm câu trong tin nhắn Trâm nhận được trùng tài liệu Khiên Số.', ['Câu nhắc giữ bí mật', 'Câu huấn luyện nhận diện nỗi sợ', 'Tên người gửi chưa xác minh'], [1, 2], 'Thông điệp Trâm nhận có câu huấn luyện cũ; người gửi vẫn cần xác minh độc lập.', 'Tìm câu từng xuất hiện trong ghi âm Chương 2 và tên người gửi thiếu nguồn.'),
    inspect('Dữ liệu học bổng Yến', 'Nguồn gốc thông tin cá nhân', 'Đánh dấu dữ liệu Yến đã gửi và phần bị sử dụng lại trong hồ sơ.', ['Bản đăng ký học bổng gốc', 'Trường dữ liệu trùng hồ sơ ASTER', 'Dấu nguồn và ngày gửi'], [1, 2], 'Hồ sơ ASTER chứa trường dữ liệu Yến đã gửi; bản đăng ký và thời điểm là nguồn để kiểm tra.', 'So trường dữ liệu trùng với dấu nguồn/ngày gửi.'),
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

const AFTER_DIALOGUE = {
  '1:3': 'Quân: “Tôi đã chạy công cụ. Tôi muốn mở cửa, nhưng đáng lẽ phải kiểm tra nó trước. Tôi không biết nó sẽ nhốt Phúc.”',
  '1:4': 'Trâm: “Câu đó có trong tài liệu Khiên Số. Tôi nhận ra giọng điệu ấy từ buổi khảo sát, nhưng lúc này mới có bản ghi để đối chiếu.”',
  '2:3': 'Đức: “Tôi đã chuyển tín dụng. Tôi tin lời hứa lấy lại khoản đầu tư, rồi xấu hổ nên không nói. Tôi không biết họ dựng số dư giả.”',
  '3:3': 'Hạ Vy: “Tôi đã sửa bản sao và giấu nguồn. Tôi muốn người điều hành lộ diện; tôi không tạo tệp gốc.”',
  '5:3': 'Bảo Linh: “Tôi dùng quyền khẩn cấp để tìm đường cứu các bạn. Tôi đã sợ quyền đó bị dùng để buộc tội mình.”'
};

export function investigationFor(chapterIndex, clues) {
  return INVESTIGATION_TASKS[chapterIndex].map((task, index) => ({
    ...task,
    clue_index_c: index,
    clue_c: clues[index],
    speaker_c: SPEAKERS[chapterIndex][index],
    dialogue_before_c: `${SPEAKERS[chapterIndex][index]}: “${task.prompt_c}”`,
    dialogue_after_c: AFTER_DIALOGUE[`${chapterIndex}:${index}`] || `${SPEAKERS[chapterIndex][index]}: “${clues[index][1]}”`,
    required_c: chapterIndex !== 6 || index < 2,
    optional_c: chapterIndex === 6 && index >= 2
  }));
}
