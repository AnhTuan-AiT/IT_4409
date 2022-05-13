<!DOCTYPE html>
<html>

<head>
    <title>Business Registration</title>
</head>
<?php
session_start();
header('Content-Type: text/html; charset=utf-8');
$conn = mysqli_connect('localhost', 'root', '123456', 'business_service') or die('Error');
mysqli_set_charset($conn, "utf8");
$message = '';
$db = $conn;
$tableName = "Categories";
$columns = ['CategoryID', 'Title'];
$fetchData = fetch_data($db, $tableName, $columns);
function fetch_data($db, $tableName, $columns)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } elseif (empty($tableName)) {
        $msg = "Table Name is empty";
    } else {
        $columnName = implode(', ', $columns);
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
if (isset($_POST['button'])) {
    $name = trim($_POST['Name']);
    $address = trim($_POST['Address']);
    $city = trim($_POST['City']);
    $telephone = trim($_POST['Telephone']);
    $url = trim($_POST['URL']);
    $sql = "INSERT INTO Businesses(Name, Address, City, Telephone, URL)
        VALUES ('$name', '$address', '$city', '$telephone', '$url')";
    mysqli_query($conn, $sql);
    if (!empty($_POST['category'])) {
        $array = $_POST['category'];
        foreach ($array as $selected) {
            $sql2 = "SELECT BusinessID FROM Businesses WHERE  Telephone = '$telephone'";
            $result2 = $db->query($sql2);
            $row2 = mysqli_fetch_array($result2, MYSQLI_NUM);
            $businessID = $row2;
            $sql4 = "INSERT INTO Biz_Categories VALUES('$businessID[0]','$selected')";
            if (mysqli_query($conn, $sql4)) {
                $message = "Record inserted as show below";
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
    * {
        font-family: arial, sans-serif;
    }

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
    p {
        font-weight: 400;
        margin: 15px 0;
    }

    .resgistrator {
        width: 600px;
        box-sizing: border-box;
        border: 2px solid black;
        margin-right: 50px;
        padding: 20px 20px 20px 15px;
    }

    .categories {
        position: relative;
        font-family: Arial;
        margin: 50px;
    }

    a {
        margin: 50px;
    }

    option {
        list-style-type: none;
        margin-bottom: 5px;
        font-size: large;
    }
    
    option:checked {
        background-color: #1976d2;
    }

    option::selection {
        background-color: red;
        color: white;
    }


    label {
        width: 120px;
        display: inline-block;
        color: black
    }
    ul {
        list-style-type: none;
    }
    button {
        width: 150px;
        padding: 10px;
        border: none;
        margin: 50px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: #3fabda;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.7;
    }

    a:hover {
        opacity: 0.7;
    }

    input {
        width: 70%;
        height: auto;
        border: 2px solid #ccc;
        border-radius: 4px;
        padding: 7px 0px;
    }

    input:focus {
        outline-width: 1px;
        outline-color: #1976d2;
    }
</style>

<body>
    <h1>Business Registratiton</h1>
    <p><?php echo $message ?></p>

    <?php echo $deleteMsg ?? ''; ?>

    <div class="container">
        <div class="categories">
            <?php if (isset($_POST['category'])) { ?>
                <p>Selected category values are highlighted</p>
            <?php } else { ?>

                <p>Click one, or control click on multiple categories</p>
            <?php } ?>
            <form method="post">
                <select name="category[]" class="categories-list" multiple size=4>
                    <?php
                    if (is_array($fetchData)) {
                        $array = [];
                        if (isset($_POST['category'])) {
                            $array = $_POST['category'];
                        }
                        foreach ($fetchData as $data) { ?>
                            <?php if (in_array($data['CategoryID'], $array)) { ?>

                                <option selected="true" value="<?php echo $data['CategoryID'] ?>"><?php echo $data['Title'] ?? ''; ?></option>
                            <?php  } else { ?>
                                <option value="<?php echo $data['CategoryID'] ?>"><?php echo $data['Title'] ?? ''; ?></option>
                            <?php } ?>
                        <?php
                        }
                    } else { ?>
                        <tr>
                            <td colspan="8">
                                <?php echo $fetchData; ?>
                            </td>
                        <tr>
                        <?php
                    }
                        ?>
                </select>
        </div>
        <div class="resgistrator">
            <ul>
                <li><label>Business Name: </label> <input type="text" name="Name" value="<?php echo isset($_POST['Name']) ? htmlspecialchars($_POST['Name'], ENT_QUOTES) : ''; ?>"></li>
                <li><label>Address: </label> <input type="text" name="Address" value="<?php echo isset($_POST['Address']) ? htmlspecialchars($_POST['Address'], ENT_QUOTES) : ''; ?>"></li>
                <li><label>City: </label> <input type="text" name="City" value="<?php echo isset($_POST['City']) ? htmlspecialchars($_POST['City'], ENT_QUOTES) : ''; ?>"></li>
                <li><label>Telephone: </label> <input type="text" name="Telephone" value="<?php echo isset($_POST['Telephone']) ? htmlspecialchars($_POST['Telephone'], ENT_QUOTES) : ''; ?>"></li>
                <li><label>URL: </label> <input type="text" name="URL" value="<?php echo isset($_POST['URL']) ? htmlspecialchars($_POST['URL'], ENT_QUOTES) : ''; ?>"></li>
            </ul>
        </div>
    </div>
    <?php if (isset($_POST['category'])) { ?>
        <a href="http://localhost:3000/add_biz.php">Add Another Business </a>
    <?php } else { ?>
        <button type="submit" name="button" value="Button">Add Business</button>
    <?php } ?>
    </form>
</body>

</html>