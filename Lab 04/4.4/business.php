<!DOCTYPE html>
<html>

<head>
    <title>Business Registration</title>
</head>
<?php
header('Content-Type: text/html; charset=utf-8');
$conn = mysqli_connect('localhost', 'root', '123456', 'business_service') or die('Error');
mysqli_set_charset($conn, "utf8");
$id = 1;
$message = '';
$db = $conn;
$tableName = "Categories";
$columns = "Title";
$fetchData = fetch_data($db, $tableName, $columns);
function fetch_data($db, $tableName, $columns)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } elseif (empty($tableName)) {
        $msg = "Table Name is empty";
    } else {

        $query = "SELECT " . $columns . " FROM $tableName";
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
if (isset($_POST['button'])) {
    $name = trim($_POST['Name']);
    $address = trim($_POST['Address']);
    $city = trim($_POST['City']);
    $telephone = trim($_POST['Telephone']);
    $url = trim($_POST['URL']);
    $sql = "INSERT INTO Businesses(Name, Address, City, Telephone, URL)
            VALUES ('$name', '$address', '$city', '$telephone', '$url')";
    if (!empty($_POST['category'])) {
        $array = $_POST['category'];
        foreach($array as $selected) {
            $sql2 = "SELECT CategoryID FROM Categories WHERE Title = '$selected'";
            $sql3 = "SELECT BusinessID FROM Businesses";
            $result1 = $db->query($sql2);
            $result2 = $db->query($sql3);
            $row1 = mysqli_fetch_array($result1, MYSQLI_NUM);
            $row2 = mysqli_fetch_array($result2, MYSQLI_NUM);
            $businessID = sizeof($row2) + 1;
            $categoryID = $row1;
            $sql4 = "INSERT INTO Biz_Categories VALUES('$businessID', '$categoryID[0]')";
            if (mysqli_query($conn, $sql) && mysqli_query($conn, $sql4)) {
                $message = "Insert success!";
                $id++;
            } else {
                $message = "Insert fail!";
            }
        }
    } else {
        $message = "Please select the category.";
    }
}
?>
<style>
    html,
    body {
        min-height: 100%;
    }

    .container {
        display: flex;
        justify-content: space-between;
    }

    label,
    h1,
    span {
        font-family: arial, sans-serif;
        font-weight: 400;
        margin: 15px 0;
    }

    .resgistrator {
        box-sizing: border-box;
        border: 2px solid black;
        margin-right: 50px;
        padding: 20px 20px 20px 15px;
    }

    .categories {
        box-sizing: border-box;
        margin: 50px 0 0 50px;
        width: 430px;
        height: 150px;
        font-size: large;
        font-weight: 100;
        font-family: arial, sans-serif;
    }

    .categories-list {
        height: 100px;
        width: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: 18px;
        padding-bottom: 16px;
        border: 2px solid black;
    }

    option {
        list-style-type: none;
        margin-bottom: 5px;
        font-size: large;
    }

    label {
        width: 120px;
        display: inline-block;
        color: black
    }

    button {
        width: 150px;
        padding: 10px;
        border: none;
        margin: 50px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: #095484;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }

    input {
        width: 400px;
        height: 26px;
        background-color: #cccccc;
        margin-bottom: 5px;
    }
</style>

<body>
    <h1>Business Registratiton</h1>
    <h2><?php echo $message ?></h2>
    <span>Click on one, or control click on multiple categories</span>
    <?php echo $deleteMsg ?? ''; ?>

    <div class="container">
        <div class="categories">
            <form method="post">
                <select name="category" class="categories-list" multiple size=4>
                    <?php
                    if (is_array($fetchData)) {

                        foreach ($fetchData as $data) {
                    ?>
                            <option value="<?php echo $data['Title'] ?>"><?php echo $data['Title'] ?? ''; ?></option>
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
                </select>
        </div>
        <div class="resgistrator">
            <ul>
                <li><label>Business Name: </label> <input type="text" name="Name" value=""></li>
                <li><label>Address: </label> <input type="text" name="Address" value=""></li>
                <li><label>City: </label> <input type="text" name="City" value=""></li>
                <li><label>Telephone: </label> <input type="text" name="Telephone" value=""></li>
                <li><label>URL: </label> <input type="text" name="URL" value=""></li>
            </ul>
        </div>
    </div>
    <button type="submit" name="button" value="Button">Add Business</button>
    </form>
</body>

</html>