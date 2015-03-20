<?php

$app->post('/customer', function() use ($app) {

    $db = new DbHandler();

    //retrieve POST params
    $request = json_decode($app->request->getBody());
    $name=$request->customer->name;

    $query ="select * from customers where name='$name'";

    $customer = $db->getOneRecord($query);

    if($customer== NULL){
        $response = array();
        $response["message"] = "no customer with a such name";
        echoResponse(400, $response);
    }
    else {
        echoResponse(200, $customer);
    }
});


$app->post('/customer/all', function() {

    $db = new DbHandler();
    $query ="select name from customers";
    $customer = $db->getSeveralRecords($query);
    echoResponse(200,$customer);
});



$app->post('/customer/add', function() use($app){

    $db = new DbHandler();

    //retrieve POST params
    $request = json_decode($app->request->getBody());
    $name = $request->customer->name;
    $isCustomerExists = $db->getOneRecord("select 1 from customers where name='$name'");

    if(!$isCustomerExists){
        $table_name = "customers";
        $column_names = array('name', 'address', 'city', 'country', 'phone');
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
        $response["message"] = "A customer with the provided name exists!";
        echoResponse(400, $response);
    }
});

$app->post('/customer/delete', function() use($app){

    $db = new DbHandler();

    //retrieve POST params
    $request = json_decode($app->request->getBody());
    $name = $request->customer->name;

    $isCustomerExists = $db->getOneRecord("select ID from customers where name='$name'");

    if($isCustomerExists){
        $ID=(int)$isCustomerExists["ID"];

        $query="DELETE FROM customers WHERE ID=?";
        $conn = $db->getConnection();
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i',$ID);
        $stmt->execute();

        $result= array();
        $result["status"] = "success";
        $result["message"] = "Customer deleted successfully";
        echoResponse(200,$result);

    }
    else{
        $response["status"] = "error";
        $response["message"] = "the customer to deleted with the provided name exists!";
        echoResponse(400, $response);
    }
});


