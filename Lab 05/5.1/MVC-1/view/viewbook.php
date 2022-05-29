<!DOCTYPE html>
<html>

<head></head>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    ul {
        list-style-type: none;
    }
    label {
        width: 120px;
        display: inline-block;
        color: black
    }
    li {
        height: auto;
        padding: 8px 0px;
    }
</style>

<body>
    <h1>View Book</h1>
    <ul>
        <li><label>Title:</label> <?php echo $book->title ?></li>
        <li><label>Author:</label> <?php echo $book->author ?></li>
        <li><label>Description:</label> <?php echo $book->description ?></li>
    </ul>
</body>

</html>