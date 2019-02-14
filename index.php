<html>
<head>
    <title>IT-Scrambler</title>

    <!-- include all vendors first   -->
    <script src="vendor/js/jquery-3.3.1.min.js"></script>
    <script src="vendor/js/bootstrap.js"></script>
    <script src="vendor/js/bootstrap.bundle.js"></script>
    <script src="vendor/js/easytimer.min.js"></script>

    <link rel="stylesheet" type="text/css" href="vendor/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="vendor/css/bootstrap-grid.css">
    <link rel="stylesheet" type="text/css" href="vendor/css/bootstrap-reboot.css">
</head>
<?php
// include all configs
include 'config/people.php';
include 'config/words.php';
?>
<body>
<?php
include 'pages/list.php';
include 'pages/field.php';
include 'pages/footer.php';
?>
</body>

<!-- include logic js  -->
<script type="text/javascript">
    // pull data from config, also could be done with request, but this isn't a serious project
    var people = JSON.parse(' <?php echo json_encode($people); ?>');
    var words = JSON.parse(' <?php echo json_encode($words); ?>');
</script>
<!-- Dont mess with order, its important-->
<script src="js/tools.js"></script>
<script src="js/game.js"></script>
<script src="js/init.js"></script>
</html>