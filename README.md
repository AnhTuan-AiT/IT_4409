## Hướng dẫn xem kết quả bài tập 1.9.1

- Mở tệp <b>1.9.1/index.html</b> trong trình duyệt

## Hướng dẫn cài đặt và chạy Lab 02:

Bạn cần có XAMPP và Node.js được cài đặt sẵn trên máy. Khi mọi thứ đã sẵn sàng, thực hiện theo các bước sau:

### Lab 2-2/1.5

- Copy thư mục <b>backend</b> trong thư mục <b>Lab 02\Lab 2-2\1.5</b> vào thư mục <b>rooPath\htdocs</b> với <b>rootPath</b> là đường dẫn đến thư mục cài đặt XAMPP trên máy bạn (ví dụ: <b>D:\xampp</b>).
- Khởi động Apache trong XAMPP Control Panel (nếu chưa khởi động).
- Mở cmd (Command Prompt), cd đến thư mục <b>Lab 02\Lab 2-2\1.5\frontend</b>.
- Chạy lệnh `npm i`.
- Sau khi xong, chạy lệnh `npm start`.
- Xem kết quả trong trình duyệt tại URL: http://localhost:3000

### Các phần khác

Khi muốn xem kết quả của một tệp <b>.html</b> hoặc <b>.php</b>, thực hiện theo các bước sau:

- Copy thư mục chứa tệp đó vào thư mục <b>rooPath\htdocs</b>.
- Khởi động Apache trong XAMPP Control Panel (nếu chưa khởi động).
- Xem kết quả trong trình duyệt tại URL: http://localhost/ten_thu_muc/ten_tep, ví dụ: http://localhost/2.6/Form4Radio.php

## Hướng dẫn cài đặt và chạy Lab 03:

Bạn cần có Node.js được cài đặt sẵn trên máy. Khi mọi thứ đã sẵn sàng, thực hiện theo các bước sau:

### 11.9

- Mở cmd (Command Prompt), cd đến thư mục <b>Lab 03\11.9\frontend</b>.
- Chạy lệnh `npm i`.
- Sau khi xong, chạy lệnh `npm start`.
- Xem kết quả trong trình duyệt tại URL: http://localhost:3000

Danh sách các luật của từng trường trong form: [lab03_form_fields_rules](https://1drv.ms/x/s!Al2wSqqxFt6qwCgCtXBFZLmlEfYD?e=22fRoO)

## Hướng dẫn cài đặt và chạy Lab 04:

### 4.1

Bạn cần có XAMPP cài đặt sẵn trên máy. Khi mọi thứ đã sẵn sàng, thực hiện theo các bước sau:

- Tạo cơ sở dữ liệu trong XAMPP Control Panel:
  - Khởi động Apache, MySQL (nếu chưa khởi động).
  - Click nút <b>Admin</b> của mô đun MySQL, sau đó, phpmyadmin sẽ tự động được mở trong trình duyệt.
  - Trên giao diện, chọn tab <b>Databases</b>.
  - Điền <b>mydb</b> vào trường <b>Database name</b> và click nút <b>Create</b>.
  - Sau đó, trong danh sách cơ sở dữ liệu hiển thị ở bên trái, click vào <b>mydb</b>
  - Chọn tab <b>Check privileges</b>.
  - Click vào <b>Add user account</b>.
  - Điền <b>vubl</b> vào trường User name, <b>vubl</b> vào trường Password.
  - Ở phần <b>Global privileges</b>, tích vào <b>Check all</b>.
  - Click nút <b>Go</b> để hoàn tất.

Khi muốn xem kết quả của một tệp .html hoặc .php thực hiện theo các bước sau:

- Copy thư mục <b>4.1</b> vào thư mục <b>rooPath\htdocs</b>.
- Khởi động Apache, MySQL trong XAMPP Control Panel (nếu chưa khởi động).
- Xem kết quả trong trình duyệt tại URL: http://localhost/4.1/ten_thu_muc/ten_tep, ví dụ: http://localhost/4.1/4.1.1/table_create.php

Các tệp cần mở:

- 4.1.2, 4.1.4: các tệp .html.
- 4.1.5: startsale.php.
- Các phần còn lại: các tệp .php tương ứng.

### Các phần khác

Bạn cần có ZenServer cài đặt sẵn trên máy. Khi mọi thứ đã sẵn sàng, thực hiện theo các bước sau:

- Trong Visual Studio Code, cài đặt extension <b>PHP Server</b>.
- Tạo CSDL
  - Trong trình duyệt, truy cập: http://localhost:10081/ZendServer/ và đăng nhập.
  - Trên trang <b>Getting Started</b>, click vào biểu tượng phpMyAdmin để triển khai phpMyAdmin.
  - Điền <b>root</b> vào trường Database User, <b>123456</b> vào trường Database Password, và các thông tin cần thiết khác.
  - Chọn Application → Manage Apps → phpMyAdmin.
  - Tại tab <b>Detail</b>, click vào <b>App URL</b> để truy cập phpMyAdmin.
  - Trên giao diện phpMyAdmin, click nút <b>Mới</b> để tạo cơ sở dữ liệu mới.
  - Nhập tên cơ sở dữ liệu là: <b>business_service</b>, click nút <b>Tạo</b>.
  - Ở bên trái màn hình, click vào cơ sở dữ liệu vừa tạo, chọn <b>Mới</b> để tạo một bảng mới.
  - Nhập tên bảng là: <b>businesses</b> và số cột là: <b>6</b>.
  - Nhập tên các trường dữ liệu và kiểu dữ liệu.
  - Click nút <b>Ghi lại</b>
  - Thực hiện tương tự, tạo các bảng <b>categories</b> và <b>biz_categories</b>.

Xem kết quả:

- 4.3

  - Mở file <b>admin.php</b> bằng PHP server.
  - Nhập dữ liệu vào các trường: Category, Title, Description và ấn nút <b>Add Category</b>.

- 4.4

  - Mở file <b>add_biz.php</b> bằng PHP server.
  - Nhập dữ liệu vào các trường: Business Name, Address, City, Telephone, URL và chọn 1 (hoặc nhiều bằng cách giữ phím Ctrl và click vào các tuỳ chọn) Category rồi nhấn nút <b>Add Business</b>.
  - Sau đó, có thể click vào <b>Add Another Business</b> để nhập thêm dữ liệu.

- 4.5

  - Mở file <b>biz_listing.php</b> bằng PHP server.
  - Chọn một Category ở bảng bên trái.

## Hướng dẫn cài đặt và chạy Lab 05:

### 5.1

- Mở file <b>MVC-1/index.php</b> bằng PHP Server.
- Xem kết quả trong trình duyệt tại URL: http://localhost:3000/index.php

### 5.2

Bạn cần cài dặt sẵn XAMPP trên máy. Copy hai thư mục <b>todo</b> và <b>e-commerce</b> vào thư mục <b>rooPath\htdocs</b>. Khi mọi thứ đã sẵn sàng, thực hiện theo các bước sau:

- Project todo

  - Tạo cơ sở dữ liệu trong XAMPP Control Panel:
    - Khởi động Apache, MySQL (nếu chưa khởi động).
    - Click nút <b>Admin</b> của mô đun MySQL, sau đó, phpmyadmin sẽ tự động được mở trong trình duyệt.
    - Trên giao diện, chọn tab <b>Databases</b>.
    - Điền <b>todo</b> vào trường <b>Database name</b> và click nút <b>Create</b>.
    - Sau đó, trong danh sách cơ sở dữ liệu hiển thị ở bên trái, click vào <b>todo</b>
    - Chọn tab <b>Check privileges</b>.
    - Click vào <b>Add user account</b>.
    - Điền <b>vubl</b> vào trường User name, <b>vubl</b> vào trường Password.
    - Ở phần <b>Global privileges</b>, tích vào <b>Check all</b>.
    - Click nút <b>Go</b> để hoàn tất.

  - Import file .sql ở trong thư mục rooPath/htdocs/todo/db/
    - Chọn tab <b>Databases</b>.
    - Chọn cơ sơ dữ liệu <b>todo</b>.
    - Chọn tab <b>Import</b>.
    - Click nút <b>Choose file</b> và tìm file todo.sql theo đường dẫn <b>rooPath/htdocs/todo/db/</b>.
    - Click nút <b>Go</b> để hoàn tất

  - Xem kết quả trong trình duyệt tại URL: http://localhost/todo/items/viewall

- Project e-commerce

  - Tạo cơ sở dữ liệu như project <b>todo</b>, điền <b>e-commerce</b> vào trường <b>Database name</b> thay vì todo. Không cần thực hiện lại các bước từ <b>Add user account</b> vì tài khoản đã được lập trước đó.
  - Import file .sql trong thư mục rooPath/htdocs/e-commerce/db/
  - Xem kết quả trong trình duyệt tại URL: http://localhost/e-commerce/categories

- ***Lưu ý***: Nếu đã có sẵn user MySQL, bạn có thể phân quyền truy cập thư mục đó cho user này qua các file config.php trong thư mục config của các project tương ứng.

Mọi khó khăn trong quá trình cài đặt và chạy project, vui lòng liên hệ qua email: anhtuan0126104@gmail.com để được hỗ trợ.
