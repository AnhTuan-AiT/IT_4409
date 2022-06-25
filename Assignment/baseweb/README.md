<h1 align="center">Baseweb</h1>

<div align="center">

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

</div>

## Installation on Window

Bạn cần có những thứ sau được cài đặt và cấu hình sẵn trước khi bắt đầu cài đặt project: [NodeJS](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/), [Visual Studio Code](https://code.visualstudio.com/). Nếu chưa cài đặt, vui lòng xem hướng dẫn sau:

- [Hướng dẫn cài đặt PostgreSQL](https://drive.google.com/file/d/1o15E-QNNgHeZK5F1N7h4FfxYpT3B9S92/view?usp=sharing)

### Tài nguyên

Ở thời điểm hiện tại, các công nghệ sử dụng đã phát hành các phiên bản mới với nhiều bổ sung, nâng cấp. Tuy nhiên, những nâng cấp đó không phải lúc nào cũng đảm bảo được tính
tương thích ngược, dẫn đến việc cài đặt theo hướng dẫn này có thể gặp những lỗi phát sinh không cần thiết. Vì vậy, nên sử dụng các bộ cài đặt được cung cấp ở đây:

- [Installers](https://drive.google.com/drive/folders/1r4VCwCz2JZGg9-LxQFPNw1aTZJl9gYp3?usp=sharing)

Khi đã sẵn sàng cho quá trình cài đặt project, thực hiện lần lượt các bước 1 đến 3:

### 1. Cài đặt Database

- Từ <b>Searchbar</b> trên thanh <b>Taskbar</b>, gõ <b>pgAdmin4</b> để tìm kiếm, chọn <b>pgAdmin4</b> từ danh sách kết
  quả để khởi động <b>pgAdmin</b>
- Trong <b>pgAdmin</b>, tạo mới một Database với tên tuỳ ý
- Sau khi tạo xong Database, click chuột phải vào Database vừa tạo, chọn <b>restore</b>, một hộp thoại sẽ mở ra
- Ở trường <b>Filename</b>, browse đến nơi tải xuống và
  chọn [file backup](https://drive.google.com/file/d/1pXtKb38dxpfQG-LJzF-EwCR2XNGBmjYD/view?usp=sharing) (chú ý: chọn Format
  là <b>All Files</b> khi browse)
- Ở trường <b>Role name</b>, chọn <b>postgres</b> (option nằm ở cuối), sau đó chọn <b>Restore</b>

### 2. Cấu hình project

- Thêm thư mục project <b>baseweb</b> vào Workspace trong Visual Studio Code
- Mở Git Bash tại thư mục project, chạy lệnh: `npm i`

* Trong file <b>Assignment/baseweb/src/config/db.js</b>, điền mật khẩu và tên PostgreSQL Database được tạo ở 1 tương ứng cho các thuộc tính <b>
  password</b> và <b>database</b>

### 3. Chạy project

- Mở Git Bash tại thư mục project (có thể sử dụng Windows Command Prompt, Visual Studio Code Terminal, Windows PowerShell,...), chạy lệnh: `nodemon app.js`

Sau lần chạy thành công đầu tiên, ở các lần chạy sau chỉ cần thực hiện bước 3
