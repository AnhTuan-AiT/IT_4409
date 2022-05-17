<!DOCTYPE html>
<html>

<head>
    <title>Bussiness List</title>
</head>
<?php

header('Content-Type: text/html; charset=utf-8');
$conn = mysqli_connect('localhost', 'root', '123456', 'business_service') or die('Error');
$db = $conn;
$tableName1 = "Categories";
$columns1 = "Title";
$fetchData1 = fetch_data1($db, $tableName1, $columns1);
function fetch_data1($db, $tableName1, $columns1)
{
    if (empty($db)) {
        $msg = "Database connection error";
    } elseif (empty($tableName1)) {
        $msg = "Table Name is empty";
    } else {
        $query = "SELECT * FROM $tableName1";
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

$tableName3 = "Biz_Categories";
$columns3 = ['BusinessID', 'CategoryID'];
if (isset($_GET["catID"])) {
    $selected = htmlspecialchars($_GET["catID"]);
} else {
    $selected = '';
}

$query = "SELECT b.*, bc.* FROM Businesses b, Biz_Categories bc, Categories c
            WHERE b.BusinessID = bc.BusinessID and
            c.CategoryID = bc.CategoryID and
            c.CategoryID= '$selected'";
$result = $db->query($query);
if ($result == true) {
    if ($result->num_rows > 0) {
        $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $msg = $row;
    } else {
        $msg = "No Data Found";
    }
}
?>
<style>
    * {
        font-family: Arial, sans-serif;
    }

    p {
        font-size: 50px;
        font-weight: 600;
        margin-right: 400px;
    }

    .container {
        display: flex;
        justify-content: space-between;
    }


    .categories {
        float: left;
        border-collapse: collapse;
    }

    .business {
        float: right;
    }

    button {
        border: none;
        background-color: transparent;
        text-decoration: underline;
        font-size: large;
        color: #000079;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }
    td,
    th {
        border: 1px solid #d5d5d5;
        border-left: none;
        border-right: none;
        border-top: none;
        text-align: left;
        padding: 8px;
    }


    button:hover {
        opacity: 0.5;
    }
</style>

<body>
    <h1>Business Listing</h1>
    <div class="container">
        <div class="categoies">
            <table class="category">
                <thead>
                    <tr>
                        <th>Click on a Category to find bussiness listing</th>
                    </tr>
                </thead>
                <form method="post" name="catID">
                    <tbody>
                        <?php
                        if (is_array($fetchData1)) {
                            foreach ($fetchData1 as $data) {
                        ?>
                                <tr>
                                    <td><a type="submit" href="http://localhost:3000/biz_listing.php?catID=<?php echo $data['CategoryID'] ?>"><?php echo $data['Title'] ?? ''; ?></a></td>
                                </tr>
                            <?php
                            }
                        } else { ?>
                            <tr>
                                <td colspan="8">
                                    <?php echo $fetchData1; ?>
                                </td>
                            <tr>
                            <?php
                        } ?>
                    </tbody>
                </form>
            </table>
        </div>
        <div class="biz_categories">
            <table>
                <?php
                if (is_array($msg)) {
                    foreach ($msg as $data) {
                ?>
                        <tr>
                            <td><?php echo $data['BusinessID'] ?? ''; ?></td>
                            <td><?php echo $data['Name'] ?? ''; ?></td>
                            <td><?php echo $data['Address'] ?? ''; ?></td>
                            <td><?php echo $data['City'] ?? ''; ?></td>
                            <td><?php echo $data['Telephone'] ?? ''; ?></td>
                            <td><?php echo $data['URL'] ?? ''; ?></td>
                            <td><?php echo $data['BusinessID'] ?? ''; ?></td>
                            <td><?php echo $data['CategoryID'] ?? ''; ?></td>
                        </tr>
                    <?php
                    }
                } else { ?>
                    <p> <?php echo $msg; ?> </p>
                <?php
                }
                ?>
            </table>
        </div>
    </div>
    </div>
</body>

</html>