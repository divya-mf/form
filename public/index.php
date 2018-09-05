<?php
session_start();

require __DIR__ .'/../container/boot.php';

// Run app
$app->run();

?>