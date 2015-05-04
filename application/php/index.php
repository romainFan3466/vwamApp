<?php

require_once 'dbHandler.php';
require_once 'passwordHash.php';
require_once 'AESgenerator.php';



require 'slim/Slim/Slim.php';


date_default_timezone_set('UTC');

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
  //  sleep(1);
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

function sendMail($email, $password){
    $subject = 'WashingApp : new account';
    $message = "Your account has been created, your credentials are: \r\n\r\n"
        ."email : ". (string)$email . "\r\n"
        ."password : ". (string)$password;

    $headers = 'From: '. MAIL_FROM . "\r\n" .
        'Reply-To: ' . MAIL_FROM . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($email, $subject, $message, $headers);

}

$app->options('/:some', function($some){
});

require_once 'authenticationModule.php';
require_once 'customerModule.php';
require_once 'itemModule.php';
require_once 'invoiceModule.php';
require_once 'qrCodeModule.php';



$app->run();
?>