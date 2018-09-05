<?php
/**
 * This file is responsible for initializing the app.
 * 
*/
require '../vendor/autoload.php';

$app = new \Slim\App([
	'settings' => [
		'displayErrorDetails'=> true,
	]
]);

$container=$app->getContainer();

$container['AuthController'] = function ($container)
{
	return new \Src\Controllers\AuthController($container);
};

$container['UserActivitiesController'] = function ($container)
{
	return new \Src\Controllers\UserActivitiesController($container);
};


$container['notFoundHandler'] = function ($container)
{
	return function ($request, $response){
		die('404 PAGE NOT FOUND');
		return $response->withStatus(404);
	};
};
// Register routes
require '../src/routes.php';