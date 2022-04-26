<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Content-language" content="vi" />
    <title>Survey of tuition policy</title>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      rel="stylesheet"
    />
    <style>
        html,
        body {
            min-height: 100%;
        }
        h1 {
            margin: 15px 0;
            font-weight: 400;
        }
        .testbox {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            padding: 3px;
        }
        form {
            width: 100%;
            padding: 20px;
            background: #fff;
            box-shadow: 0 2px 5px #ccc;
        }
        input,
        select,
        textarea {
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        input:hover,
        select:hover,
        textarea:hover {
            outline: none;
            border: 1px solid #095484;
        }
        input {
            width: calc(100% - 10px);
            padding: 5px;
        }
        select {
            width: 100%;
            padding: 7px 0;
            background: transparent;
        }

        .item {
            position: relative;
            margin: 10px 0;
            width: calc(50% - 10px);
        }
        input[type="date"]::-webkit-inner-spin-button {
            display: none;
        }
        .item i,
        input[type="date"]::-webkit-calendar-picker-indicator {
            position: absolute;
            font-size: 20px;
            color: #a9a9a9;
        }
        .item i {
            right: 2%;
            top: 30px;
            z-index: 1;
        }
        [type="date"]::-webkit-calendar-picker-indicator {
            right: 1%;
            z-index: 2;
            opacity: 0;
            cursor: pointer;
        }
        .btn-block {
            margin-top: 20px;
            text-align: center;
        }
        button {
            width: 150px;
            padding: 10px;
            border: none;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            background-color: #095484;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
        button:hover {
            background-color: #0666a3;
        }
        .status-item input,
        .status-item span {
            width: auto;
            vertical-align: middle;
        }
        .status-item input {
            margin: 0;
        }
        .status-item span {
            margin: 0 20px 0 5px;
        }
    </style>
    <style>
        body,
        div,
        input,
        p {
            padding: 0;
            margin: 0;
            outline: none;
            font-family: Roboto, Arial, sans-serif;
            font-size: 14px;
            color: #666;
            line-height: 22px;
        }
        h4 {
            font-weight: 400;
            margin: 22px 0 4px;
        }
        h5 {
            text-transform: uppercase;
            color: #095484;
        }
        form {
            width: 100%;
            padding: 20px;
            box-shadow: 0 2px 5px #ccc;
            background: #fff;
        }
        input {
            width: calc(100% - 10px);
            padding: 5px;
            border-radius: 3px;
            border: 1px solid #ccc;
            vertical-align: middle;
        }
        textarea {
            width: calc(100% - 6px);
            outline: none;
        }
        input:hover,
        textarea:hover {
            outline: none;
            border: 1px solid #095484;
        }
        th,
        td {
            width: 15%;
            padding: 15px 0;
            border-bottom: 1px solid #ccc;
            text-align: center;
            vertical-align: unset;
            line-height: 18px;
            font-weight: 400;
            word-break: break-all;
        }
        .course-rate th,
        .course-rate td {
            width: 19%;
        }
        .first-col,
        .course-rate .first-col {
            width: 24%;
            text-align: left;
        }
        .question,
        .comments {
            margin: 15px 0 5px;
        }
        .question-answer label {
            display: inline-block;
            padding: 0 20px 15px 0;
        }
        .question-answer input {
            width: auto;
        }
        .question-answer,
        table {
            width: 100%;
        }
        @media (min-width: 568px) {
            th,
            td {
            word-break: keep-all;
            }
        }
        .row:after {
            content: "";
            display: table;
            clear: both;
            width: 100%;
        }
        .column {
            float: left;
            width: 30%;
            }
    </style>
  </head>
  <body>
    <div class="testbox">
        <div>
        <h1>Cảm ơn bạn đã tham gia khảo sát. Câu trả lời của bạn đã được ghi lại</h1>
        <h5>Thông tin cá nhân của bạn</h5>
        <div class="item">
            <?php 
                $name = $_POST["name"];
                $birthday = $_POST["birthday"];
                $email = $_POST["email"];
                $phoneNumber = $_POST["phoneNumber"];
                $department = $_POST["department"];
                $gender = $_POST["gender"];
                $class = $_POST["class"];
                $anotherIdea = $_POST["another_idea"];
                
                $options = array("Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree");
                $answers = array($_POST['question1'], $_POST['question2'], $_POST['question3'], $_POST['question4'], $_POST['question5']);
                $selectedSolutions = $_POST['solution'];
                $questions = array(
                    "1*. Nhà trường đã công khai và minh bạch với sinh viên và gia đình trong các vấn đề về học phí.",
                    "2*. Mức học phí mới và lộ trình tăng học phí được công bố gần đây là phù hợp với chính sách của Nhà nước và bối cảnh hiện tại.", 
                    "3*. Thời điểm công bố chính sách học phí mới phù hợp cho sự tiếp nhận và chuẩn bị của sinh viên và gia đình.", 
                    "4*. Mức học phí trong những năm gần đây tương xứng với sự thay đổi, cải thiện về mọi mặt của Trường.", 
                    "5*. Nhà trường cần thiết lập một kênh tương tác hai chiều phản hồi nhanh dành cho việc đối thoại với sinh viên.");


                echo "<div class=\"row\">";
                echo "<div class=\"column\"><p>Họ và tên</p></div><p></p>: $name</p>"; 
                echo "<div class=\"column\"><p>Ngày sinh</p></div><p></p>: $birthday</p>"; 
                echo "<div class=\"column\"><p>Email</p></div><p></p>: $email</p>"; 
                echo "<div class=\"column\"><p>Số điện thoại</p></div><p></p>: $phoneNumber</p>"; 
                echo "<div class=\"column\"><p>Khoa/Viện</p></div><p></p>: $department</p>"; 
                echo "<div class=\"column\"><p>Lớp</p></div><p></p>: $class</p>"; 
                echo "<div class=\"column\"><p>Giới tính</p></div><p></p>: $gender</p>"; 
                echo "</div>";
            ?>
        </div>
        <h5>Quan điểm của bạn về chính sách học phí mới</h5>
        <div>
          <table>
            <tr>
              <th class="first-col"></th>
              <th>Rất không đồng ý</th>
              <th>Không đồng ý</th>
              <th>Bình thường</th>
              <th>Đồng ý</th>
              <th>Rất đồng ý</th>
            </tr>
            <?php 
                for ($i = 0; $i < 5; $i++) {
                    echo "<tr>
                        <td class=\"first-col\">
                        $questions[$i]
                    </td>";

                    for($j = 0; $j < 5 ; $j++) {
                        if (strcasecmp($options[$j], $answers[$i]) == 0) {
                            echo '<td><input type="radio" disabled checked="checked"/></td>';
                        } else {
                            echo '<td><input type="radio" disabled/></td>';
                        }
                    }
                    
                    echo "</tr>";
                }
            ?>
          </table>
        </div>
        <p class="question"></p>
        <div class="item status">
          <h5>
            Giải pháp thống nhất ý kiến giữa Nhà trường, sinh viên và gia đình
          </h5>
          <div class="status-item">
            <?php 
                foreach($_POST['solution'] as $solution){
                    echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- $solution<br/>";
                }        
            ?>
          </div>
        </div>
        <?php echo "<p class=\"comments\">Ý kiến khác: $anotherIdea</p>"; ?>
    </div>
    </div>
  </body>
</html>
