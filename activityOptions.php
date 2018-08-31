<?php
session_start();
include("activityFunctions.php");

//catches the action and redirects to the desired method.
if(isset($_POST['action']))
{

    $method=sanitize($_POST['action']);

    $functionsObj->$method();
}

?>