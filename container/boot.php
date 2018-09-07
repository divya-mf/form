<?php
/**
 * This file is responsible for initializing the app.
 * 
*/
require '../vendor/autoload.php';
$settings = require _DIR_ . '/../src/settings.php';
$app = new \Slim\App([
	'settings' => [
		'displayErrorDetails'=> true,
	],
]);

$app = new \Slim\App($settings);
//fetch all the dependencies
require __DIR__ . '/../src/dependencies.php';

// Register routes
require '../src/routes.php';