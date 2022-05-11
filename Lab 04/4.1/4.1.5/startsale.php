<html>

<head>
    <title>Inventory Management</title>
    <style>
        .button {
            display: inline-block;
            padding: 12px 18px;
            cursor: pointer;
            border-radius: 5px;
            background-color: #f0f0d0;
            font-size: 13px;
            font-weight: bold;
            color: #444;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 50%;
            margin-bottom: 16px;
        }

        td,
        th {
            border: 1px, solid;
            text-align: left;
            padding: 6px;
        }

        div {
            margin: 8px;
            font-family: arial, sans-serif;
        }
    </style>
</head>

<body>
    <div style="color:blue; font-size:30px">Select Product We Just Sold</div>
    <form action="sale.php" method="post">
        <div>
            Hammer <input type="radio" name="product_desc" value="Hammer">
            Screw Driver<input type="radio" name="product_desc" value="Screw Driver">
            Wrench<input type="radio" name="product_desc" value="Wrench">
        </div>
        <input class="button" type="submit" value="Click To Submit">
        <input class="button" type="reset" value="Reset">
    </form>
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
        //print '<div style="color:blue; font-size:24px">Products Data</div>';
        $SQLcmd = "SELECT * from $table_name";
        print "<div>The query is <i>$SQLcmd</i></div>";
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