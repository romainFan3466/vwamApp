<?php

$app->post('/items/all', function() {

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        $userID = $session["uid"];
        $query ="select * from items where userID='$userID'";
        $items = $db->getSeveralRecords($query);
        echoResponse(200,$items);
    }
});



$app->post('/items/add', function() use($app){

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
        $name = $request->item->name;
        $type = $request->item->type;
        $userID =$session["uid"];
        $isItemExists = $db->getOneRecord(
            "select 1 from items
        where (name='$name' AND type='$type' AND userID='$userID')");

        if(!$isItemExists){
            $table_name = "items";
            $request->item->userID = $userID;

            $column_names = array('name', 'type', 'price','userID');
            $result = $db->insertIntoTable($request->item, $column_names, $table_name);
            $response = array();

            if ($result != NULL) {
                $response["status"] = "success";
                $response["message"] = "Item created successfully";
                echoResponse(200, $response);
            }
            else {
                $response["status"] = "error";
                $response["message"] = "Failed to create Item. Please try again";
                echoResponse(400, $response);
            }
        }
        else{
            $response["status"] = "error";
            $response["message"] = "An Item with the provided name already exists!";
            echoResponse(400, $response);
        }

    }
});




$app->delete('/items/:ID', function($ID) use($app){

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else {
        $userID =$session["uid"];
        $isItemExists = $db->getOneRecord("select ID from items where ID='$ID' AND userID='$userID'");

        if($isItemExists){
            $ID=(int)$isItemExists["ID"];

            $query="DELETE FROM items WHERE ID=? AND userID=?";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ii', $ID, $userID);
            $stmt->execute();

            $result= array();
            $result["status"] = "success";
            $result["message"] = "Item deleted successfully";
            echoResponse(200,$result);

        }
        else{
            $response["status"] = "error";
            $response["message"] = "the item to deleted with the provided ID doesn't exist!";
            echoResponse(400, $response);
        }
    }
});


$app->put('/items', function() use($app){

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
        $ID = $request->item->ID;

        $userID =$session["uid"];
        $isItemExists = $db->getOneRecord("select ID, name, type from items where ID='$ID' AND userID='$userID'");

        $name = (isset($request->item->name) && $request->item->name!="") ? $request->item->name : $isItemExists->name;
        $type = (isset($request->item->type) && $request->item->type!="") ? $request->item->type : $isItemExists->type;

        $isItemDuplicated= $db->getOneRecord(
            "select 1 from items where ID!='$ID' AND name='$name' AND type='$type' AND userID='$userID'");


        if($isItemExists && !$isItemDuplicated){
            $ID=(int)$isItemExists["ID"];

            $query="UPDATE items
                SET name=?, type=?, price=?
                WHERE ID=? AND userID=?;";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('ssdii',
                $request->item->name,
                $request->item->type,
                $request->item->price,
                $ID,
                $userID);
            $stmt->execute();

            $result= array();
            $result["status"] = "success";
            $result["message"] = "Item changed successfully";
            echoResponse(200,$result);

        }
        else{
            $response["status"] = "error";
            $response["message"] = "the item to change with the provided ID or name doesn't exist!";
            echoResponse(400, $response);
        }
    }
});



