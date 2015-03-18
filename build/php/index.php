<?php

require_once 'dbHandler.php';
require_once 'passwordHash.php';


require 'slim/Slim/Slim.php';


/**
 * App initialisation
 */
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

//auth client
$auth = false;


function setAuthentication($value) {
    if(is_bool($value)) {
    $GLOBALS['auth'] = $value;
    }
}

/**
 * @param $status_code
 * @param $response
 */
function echoResponse($status_code, $response) {


  /*  $to      = 'romain.fanara@sfr.fr';
    $subject = 'WashingApp : new account';
    $message = 'Your account has been created, here is your credentials';
    $headers = 'From: webmaster@example.com' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);*/


    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

require_once 'authentication.php';


$app->run();
?>