<?php

function addInvoice($invoice, $db){
    $table_name = 'invoices';
    $column_names = array('customerID', 'userID', 'matriculation1', 'matriculation2');
    $userID = $_SESSION["uid"];
    $obj["customerID"] = (int)$invoice->customerID;
    $ID = $invoice->customerID;
    $isCustomerExists = $db->getOneRecord("select 1 from customers where (ID='$ID' AND userID='$userID')");
    if($isCustomerExists){
        $obj["userID"] = $_SESSION["uid"];
        $obj["matriculation1"] = strval($invoice->matriculation->first);
        $obj["matriculation2"] = strval($invoice->matriculation->second);

        $result["ID"] = $db->insertIntoTable($obj, $column_names, $table_name);
        if($result["ID"]!=NULL){
            $result["success"] = true;
            $result["message"] = "Invoice added successfully";
        }
        else{
            $result["success"] = false;
            $result["message"] = "Invoice wasn't added, insert error";
        }
    }
    else {
        $result["success"] = false;
        $result["message"] = "Invoice wasn't added, customer doesn't exist for this user";
    }

    return $result;
};



function addItemsRows($invoice, $invoiceID, $db){
    $table_name = 'itemsSets';
    $column_names = array('itemID', 'quantity', 'subTotal', 'invoiceID');
    $totalPrice = 0.0;
    $result["success"] = true;

    foreach($invoice->items as $itemsRow){
        $obj["itemID"] = (int)$itemsRow->itemID;
        $ID= $itemsRow->itemID;
        $isItemExists = $db->getOneRecord("select * from items where ID='$ID'");

        if($isItemExists){
            $price = (double)$isItemExists["price"];
            $obj["quantity"] = $itemsRow->quantity;
            $obj["subTotal"] = $price*(double)$obj["quantity"];
            $totalPrice = $totalPrice + $obj["subTotal"];
            $obj["invoiceID"] = $invoiceID;
            $insert= $db->insertIntoTable($obj, $column_names, $table_name);

            if($insert=== NULL){
                $result["success"] = false;
                $result["message"] = "Invoice row wasn't added, insert error";
                //DELETE INVOICE, all related row will be deleted
                $query="DELETE FROM invoices WHERE ID=?";
                $conn = $db->getConnection();
                $stmt = $conn->prepare($query);
                $stmt->bind_param('i', $invoiceID);
                $stmt->execute();
                break;
            }
        }
        else {
            $result["success"] = false;
            $result["message"] = "Invoice row wasn't added, itemID doesn't exist";
            //DELETE INVOICE, all related row will be deleted
            $query="DELETE FROM invoices WHERE ID=?";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('i', $invoiceID);
            $stmt->execute();
            break;
        }
    }
    if($result["success"]==true){
        //Update invoice of totalPrice
        $query="UPDATE invoices SET totalPrice=? WHERE ID=?";
        $conn = $db->getConnection();
        $stmt = $conn->prepare($query);
        $stmt->bind_param('di',$totalPrice, $invoiceID);
        $stmt->execute();
    }
    return $result;
};




$app->post('/invoices/add', function() use ($app) {

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
        $invoice=$request->invoice;
        $result = addInvoice($invoice, $db);

        //INVOICE PART
        if($result["success"]==true){
            $resultRow = addItemsRows($invoice, $result["ID"], $db);

            //ROW PART
            if($resultRow["success"]==true){
                $resultRow["message"] = "Invoice and rows added successfully";
                $resultRow["ID"] = $result["ID"];
                echoResponse(200,$resultRow);
            }
            else{
                echoResponse(400,$resultRow);
            }
        }
        else{
            echoResponse(400,$result);
        }
    }
});


$app->post('/invoices/:ID', function($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else{
        //retrieve POST params
        $userID = $_SESSION["uid"];
        $isInvoiceExists = $db->getOneRecord("select * from invoices where ID='$ID' AND userID='$userID'");
        if($isInvoiceExists){
            //matriculation
            $matriculation = array();
            $matriculation["first"] = $isInvoiceExists["matriculation1"];
            $matriculation["second"] = $isInvoiceExists["matriculation2"];
            unset($isInvoiceExists["matriculation1"]);
            unset($isInvoiceExists["matriculation2"]);
            $isInvoiceExists["matriculation"] = $matriculation;

            //test

            //retrive item row
            $query="SELECT itemID, quantity, subTotal FROM itemsSets WHERE invoiceID='$ID'";
            $itemsRow = $db->getSeveralRecords($query);
            $isInvoiceExists["items"] = $itemsRow;

            $result["status"] = "success";
            $result["invoice"] = $isInvoiceExists;
            echoResponse(200, $result);
        }
        else {
            $response["status"] = "error";
            $response["message"] = "no invoice with a such ID exist for the user logged ";
            echoResponse(400, $response);
        }
        //echoResponse(200, $isItemExists);


    }
});
