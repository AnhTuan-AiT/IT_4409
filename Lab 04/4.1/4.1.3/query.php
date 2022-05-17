<html>

<head>
    <title>Table Output</title>
    <style>
        div {
            margin: 16px;
            font-family: arial, sans-serif;
        }

        td,
        th {
            text-align: left;
            padding: 8px;
            border: 1px solid #d5d5d5;
            border-left: none;
            border-right: none;
            border-top: none;
        }

        table {
            font-family: arial, sans-serif;
            border: none;
            width: 50%;
            margin: 16px;
        }
    </style>
</head>

<body>
    <?php
    $server = 'localhost';
    $user = 'vubl';
    $pass = 'vubl';
    $mydb = 'mydb';
    $table_name = 'Products';
    $connect = mysqli_connect($server, $user, $pass, $mydb);

    if (!$connect) {
        die("Cannot connect to $server using $user");
    } else {
        print '<div style="color:blue; font-size:30px">Products Data</div>';
        $SQLcmd = "SELECT * from $table_name";
        print "<div>The Query is $SQLcmd</div>";

        $result = mysqli_query($connect, $SQLcmd);

        print "<table border='1'>";
        print "<tr>
                    <th>Num</th>
                    <th>Product</th>
                    <th>Cost</th>
                    <th>Weight</th>
                    <th>Count</th>
                    </tr>";

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                print "<tr>
                            <td>" . $row['ProductID'] . "</td>
                            <td>" . $row['Product_desc'] . "</td>
                            <td>" . $row['Cost'] . "</td>
                            <td>" . $row['Weight'] . "</td>
                            <td>" . $row['Numb'] . "</td>
                           </tr>";
            }
        }
        print "</table>";
        mysqli_close($connect);
    }
    ?>
</body>

</html>