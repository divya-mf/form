<?php
/**
 * This file is responsible for creating and managing routes within the app.
 * 
*/

$app->post('/register','AuthController:signUp');
$app->post('/login','AuthController:login');
$app->get('/users','UserActivitiesController:getAllUsers');
$app->post('/activities','UserActivitiesController:getAllActivities');
$app->post('/addActivity','UserActivitiesController:addActivity');
