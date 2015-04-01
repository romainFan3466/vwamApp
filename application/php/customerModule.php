<?php

$app->post('/customers', function() use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else{
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $name=$request->customer->name;
        $userID =$session["uid"];
        $query ="select * from customers where name='$name' and userID='$userID'";

        $customer = $db->getOneRecord($query);

        if($customer== NULL){
            $response = array();
            $response["message"] = "no customer with a such name for the logged user";
            echoResponse(400, $response);
        }
        else {
            echoResponse(200, $customer);
        }
    }
});


$app->post('/customers/id/:ID', function($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();
    $response = array();

    if(!$session["authenticated"]){
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else{
        $userID =$session["uid"];
        $query ="select * from customers where ID='$ID' and userID='$userID'";

        $customer = $db->getOneRecord($query);

        if($customer== NULL){
            $response["message"] = "no customer with a such ID for the logged user";
            echoResponse(400, $response);
        }
        else {
            $response["customer"] = $customer;
            echoResponse(200, $response);
        }
    }
});




$app->post('/customers/all', function() {

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        $userID = $session["uid"];
        $query ="select name from customers where userID='$userID'";
        $customer = $db->getSeveralRecords($query);
        echoResponse(200,$customer);
    }
});



$app->post('/customers/add', function() use($app){

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $name = $request->customer->name;
        $userID =$session["uid"];
        $isCustomerExists = $db->getOneRecord("select 1 from customers where (name='$name' AND userID='$userID')");

        if(!$isCustomerExists){
            $table_name = "customers";
            $request->customer->userID = $userID;
            $column_names = array('name', 'address', 'city', 'country', 'phone', 'userID');
            $result = $db->insertIntoTable($request->customer, $column_names, $table_name);
            $response = array();

            if ($result != NULL) {
                $response["status"] = "success";
                $response["message"] = "Customer created successfully";
                echoResponse(200, $response);
            }
            else {
                $response["status"] = "error";
                $response["message"] = "Failed to create customer. Please try again";
                echoResponse(400, $response);
            }
        }
        else{
            $response["status"] = "error";
            $response["message"] = "A customer with the provided name already exists!";
            echoResponse(400, $response);
        }
    }
});

$app->delete('/customers/:ID', function($ID) use($app){

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        //retrieve POST params
       // $request = json_decode($app->request->getBody());
       // $ID = $request->customer->ID;
        $userID =$session["uid"];
        $isCustomerExists = $db->getOneRecord("select ID from customers where ID='$ID' AND userID='$userID'");

        if($isCustomerExists){
            $ID=(int)$isCustomerExists["ID"];

            $query="DELETE FROM customers WHERE ID=? AND userID=?";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ii', $ID, $userID);
            $stmt->execute();

            $result= array();
            $result["status"] = "success";
            $result["message"] = "Customer deleted successfully";
            echoResponse(200,$result);

        }
        else{
            $response["status"] = "error";
            $response["message"] = "the customer to deleted with the provided ID doesn't exist!";
            echoResponse(400, $response);
        }
    }
});


$app->put('/customers', function() use($app){

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $ID = $request->customer->ID;
        $userID =$session["uid"];
        $isCustomerExists = $db->getOneRecord("select ID from customers where ID='$ID' AND userID='$userID'");

        if($isCustomerExists){
            $ID=(int)$isCustomerExists["ID"];

            $query="UPDATE customers
                SET name=?, address=?, city=?, country=?, phone=?
                WHERE ID=? AND userID=?;";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('sssssii',
                $request->customer->name,
                $request->customer->address,
                $request->customer->city,
                $request->customer->country,
                $request->customer->phone,
                $ID,
                $userID);
            $stmt->execute();

            $result= array();
            $result["status"] = "success";
            $result["message"] = "Customer changed successfully";
            echoResponse(200,$result);

        }
        else{
            $response["status"] = "error";
            $response["message"] = "the customer to change with the provided ID doesn't exist!";
            echoResponse(400, $response);
        }
    }
});



