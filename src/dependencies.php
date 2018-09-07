<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($container) {
    $settings = $container->get('settings')['logger'];
    print_r($settings);
    exit;
    $logger = new Monolog\Logger('slimprojecct');
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler(__DIR__ . '/../logs/app.log', '\Monolog\Logger::DEBUG'));
    return $logger;
};

$container['Controller'] = function ($container)
{
	return new \Src\Controllers\Controller($container);
};

$container['AuthController'] = function ($container)
{
	return new \Src\Controllers\AuthController($container);
};

$container['UserActivitiesController'] = function ($container)
{
	return new \Src\Controllers\UserActivitiesController($container);
};

$container['FileMakerWrapper'] = function ($container)
{
	return new \Src\Api\FileMakerWrapper($container);
};

$container['Constants'] = function ($container)
{
	return new \Src\Api\Constants($container);
};

$container['notFoundHandler'] = function ($container)
{ 
	$logger = $container->get('logger');
	return function ($request, $response) use ($logger)
	{ 
		$res=$response->withStatus(404);
		 $logger->addInfo($res);
	 	die('404: PAGE NOT FOUND');
	};
};

$container['notAllowedHandler'] = function ($container)
{ 
	$logger = $container->get('logger');
	return function ($request, $response) use ($logger)
	{
		$res=$response->withStatus(405);
		$logger->addInfo($res);
		die('405: IMPROPER METHOD ASSIGNMENT');
	};
};

$container['phpErrorHandler'] = function ($container)
{ 
	$logger = $container->get('logger');
	return function ($request, $response) use ($logger)
	{
		$res=$response->withStatus(500);
		$logger->addInfo($res);
		die('500: Please try later');
	};
};

$container['db'] = function ($container) {
    require_once (__DIR__ .'/api/FileMaker.php');

     define('FM_HOST', '172.16.9.42');
     define('FM_FILE', 'userActivities.fmp12');
     define('FM_USER', 'admin');
     define('FM_PASS', 'mindfire');
    
    //to create the FileMaker Object
    $fm = new FileMaker(FM_FILE, FM_HOST, FM_USER, FM_PASS);
    
    return $fm;
};