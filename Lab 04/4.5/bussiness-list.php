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
        $query = "SELECT " . $columns1 . " FROM $tableName1";
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
$fetchData3 = fetch_data3($db, $tableName3, $columns3);

function fetch_data3($db, $tableName3, $columns3)
{
    $msg = '';
    if (empty($db)) {
        $msg = "Database connection error";
    } elseif (empty($columns3) || !is_array($columns3)) {
        $msg = "Columns Name must be defined in an indexed array";
    } elseif (empty($tableName3)) {
        $msg = "Table Name is empty";
    } else {

        if (isset($_POST['button'])) {
            $selected = $_POST['button'];
            $query = "SELECT b.*, bc.* FROM Businesses b, Biz_Categories bc, Categories c
                    WHERE b.BusinessID = bc.BusinessID and
                        c.CategoryID = bc.CategoryID and
                        c.Title = '$selected'";
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
    }
    return $msg;
}
?>
<style>
    h1 {
        font-family: arial, sans-serif;
    }

    .container {
        display: flex;
    }


    .categories {
        float: left;
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    .business {
        float: right;
    }

    td,
    th {
        font-family: Arial, sans-serif;
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-size: large;
    }
</style>

<body>
    <h1>Business Listing</h1>
    <div class="container">
        <div class="categoies">
            <table>
                <thead>
                    <tr>
                        <th>Click on a Category to find bussiness listing</th>
                    </tr>
                </thead>
                <form method="post">
                    <tbody>
                        <?php
                        if (is_array($fetchData1)) {
                            foreach ($fetchData1 as $data) {
                        ?>
                                <tr>
                                    <td><button type="submit" name="button" value="<?php echo $data['Title'] ?? ''; ?>"><?php echo $data['Title'] ?? ''; ?></button></td>
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
                if (is_array($fetchData3)) {
                    foreach ($fetchData3 as $data) {
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
                    <td colspan="8">
                        <?php echo $fetchData3; ?>
                    </td>
                <?php
                }
                ?>
            </table>
        </div>
    </div>
    </div>
</body>

</html>