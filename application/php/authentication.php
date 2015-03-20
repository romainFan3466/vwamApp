<?php


/**
 * Session requests
 */

$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    echoResponse(200, $session);
});


$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';

    //retrieve params sent by POST
    $r = json_decode($app->request->getBody());

   // verifyRequiredParams(array('email', 'password'),$r->customer);

    $response = array();
    $db = new DbHandler();
    $password = $r->user->password;

    $email = $r->user->email;

    $user = $db->getOneRecord("select uid,password,email,created from customers_auth where email='$email'");

    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response['uid'] = $user['uid'];
            $response['email'] = $user['email'];
            $response['createdAt'] = $user['created'];
            $response['authenticated'] = true;

            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $user['uid'];
            $_SESSION['email'] = $email;
            $_SESSION['authenticated'] = true;
            echoResponse(200, $response);

        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
            echoResponse(401, $response);
        }

    }else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered, please sign up';
        echoResponse(401, $response);
    }


});

$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = $session;
    echoResponse(200, $response);
});


$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
   // verifyRequiredParams(array('email', 'name', 'password'),$r->user);
    require_once 'passwordHash.php';

    $db = new DbHandler();

    $email = $r->user->email;
    $password = $r->user->password;

    $isUserExists = $db->getOneRecord("select 1 from customers_auth where email='$email'");

    if(!$isUserExists){
        $r->user->password = passwordHash::hash($password);
        $table_name = "customers_auth";
        $column_names = array('email','password');
        $result = $db->insertIntoTable($r->user, $column_names, $table_name);

        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }

            $_SESSION['uid'] = $response["uid"];
            $_SESSION['email'] = $email;
            sendMail($email,$password);
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create user. Please try again";
            echoResponse(400, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided  email exists!";
        echoResponse(400, $response);
    }

});


