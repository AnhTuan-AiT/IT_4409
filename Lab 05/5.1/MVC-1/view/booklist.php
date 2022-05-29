<!DOCTYPE html>
<html>

<head></head>
<style>
    * {
        font-family: arial, sans-serif;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }

    td {
        text-align: left;
        padding: 8px;
        border: 1px solid #d5d5d5;
        border-left: none;
        border-right: none;
        border-top: none;
    }
</style>

<body>
    <h1>Book Listing</h1>
    <table>
        <tbody>
            <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Description</td>
            </tr>
        </tbody>

        <?php
        foreach ($books as $title => $book) {
            echo '<tr><td><a href="index.php?book=' . $book->title . '">'
                . $book->title . '</a></td><td>' . $book->author . '</td><td>' . $book->description . '</td></tr>';
        }
        ?>
    </table>
</body>

</html>