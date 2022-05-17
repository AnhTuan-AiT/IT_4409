<html>

<head>
    <title>Inventory Management</title>
    <style>
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

        div {
            margin: 8px;
            font-family: arial, sans-serif;
        }
        
        .containedButton {
            display: inline-block;
            cursor: pointer;
            border-radius: 5px;
            border: 0px;
            color: white;
            background-color: #1976d2;
            font-weight: 500;
            padding: 6px 16px;
            line-height: 1.75;
            letter-spacing: 0.02857em; 
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        }
        
        .outlineButton {
            display: inline-block;
            padding: 6px 16px;
            cursor: pointer;
            border-radius: 5px;
            border: 1px solid rgba(25, 118, 210, 0.5);
            color: #1976d2;
            background-color: transparent;
            font-size: 13px;
            font-weight: 500;
            line-height: 1.75;
            letter-spacing: 0.02857em; 
        }
        
        .containedButton:hover {
            background-color: #1976d2;
            box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
            transition: 0.7;
        }
        
        .outlineButton:hover {
            transition: 0.7;
            border: 1px solid rgba(25, 118, 210);
        }
        
        .radioButton {
            background-color: #fff;
            border:2px solid white;
            box-shadow:0 0 0 1px #000;
            appearance:none;
            border-radius:50%;
            width:12px;
            height:12px;
            background-color:#fff;
            transition:all ease-in 0.2s;
            cursor: pointer;
            opacity: 0.4;
        }
        
        .radioButton:checked {
            background-color: #1976d2;
            box-shadow:0 0 0 1px #1976d2;
            opacity: 1;
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
        
        <button class="containedButton" type="submit" value="Click To Submit">Click To Submit</button>
        <button class="outlineButton" type="reset" value="Reset">Reset</button>
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