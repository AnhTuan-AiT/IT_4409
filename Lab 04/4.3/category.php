<html>

<head>
    <title> Add Category </title>
    <?php
    header('Content-Type: text/html; charset=utf-8');
    $conn = mysqli_connect('localhost', 'root', '123456', 'business_service') or die('Error');
    mysqli_set_charset($conn, "utf8");
    $message = '';
    if (isset($_POST['button'])) {
        $catID = trim($_POST['CatID']);
        $title = trim($_POST['Title']);
        $description = trim($_POST['Description']);

        $sql = "INSERT INTO Categories VALUES ('$catID', '$title', '$description')";

        if (mysqli_query($conn, $sql)) {
            $message = "Insert success!";
        } else {
            $message = "Insert fail!";
        }
    }
    $db = $conn;
    $tableName = "Categories";
    $columns = ['CategoryID', 'Title', 'Description'];
    $fetchData = fetch_data($db, $tableName, $columns);
    function fetch_data($db, $tableName, $columns)
    {
        if (empty($db)) {
            $msg = "Database connection error";
        } elseif (empty($columns) || !is_array($columns)) {
            $msg = "Columns Name must be defined in an indexed array";
        } elseif (empty($tableName)) {
            $msg = "Table Name is empty";
        } else {

            $columnName = implode(", ", $columns);
            $query = "SELECT " . $columnName . " FROM $tableName";
            $result = $db->query($query);

            if ($result == true) {
                if ($result->num_rows > 0) {
                    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    $msg = $row;
                } else {
                    $msg = "No Data Found";
                }
            } else {
                $msg = mysqli_error($db);
            }
        }
        return $msg;
    }
    ?>
    <script type="text/javascript">
    </script>
    <style>
        h1,
        h2 {
            font-family: arial, sans-serif;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        input {
            width: 100%;
            height: auto;
            border: 2px solid #ccc;
            border-radius: 4px;
            padding: 7px 0px;
        }

        input:focus {
            outline-width: 1px;
            outline-color: #3fabda;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }

        button {
            width: 150px;
            padding: 10px;
            border: none;
            margin: 10px 0px 0px 10px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            background-color: #095484;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <h1>Category Administrator</h1>

    <?php echo $deleteMsg ?? ''; ?>

    <div class="table-responsive">
        <h2><?php echo $message; ?></h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Description</th>
            </thead>
            <tbody>
                <?php
                if (is_array($fetchData)) {
                    foreach ($fetchData as $data) {
                ?>
                        <tr>
                            <td><?php echo $data['CategoryID'] ?? ''; ?></td>
                            <td><?php echo $data['Title'] ?? ''; ?></td>
                            <td><?php echo $data['Description'] ?? ''; ?></td>
                        </tr>
                    <?php
                    }
                } else { ?>
                    <tr>
                        <td colspan="8">
                            <?php echo $fetchData; ?>
                        </td>
                    <tr>
                    <?php
                } ?>
                    <form method="POST">
                    <tr>
                        <td><input type="text" name="CatID" value=""></td>
                        <td><input type="text" name="Title" value=""></td>
                        <td><input type="text" name="Description" value=""></td>
                    </tr>
            </tbody>
        </table>
        <button type="submit" name="button" value="Button">Add Category</button>
        </form>
    </div>
</body>

</html>