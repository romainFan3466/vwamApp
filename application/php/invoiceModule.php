<?php

function addInvoice($invoice, $db){
    $table_name = 'invoices';
    $column_names = array('customerID', 'userID', 'matriculation1', 'matriculation2', 'totalPrice');
    $obj["customerID"] = $invoice->customerID;
    $obj["userID"] = $_SESSION["uid"];
    $obj["matriculation1"] = $invoice->matriculation1;
    $obj["matriculation2"] = $invoice->matriculation2;
    $obj["totalPrice"] = $invoice->totalPrice;

    $result = $db->insertIntoTable($obj, $column_names, $table_name);

//TODO  :  washingapp return ID of Invoice
    return $result;
};



function addItemsRows($invoice, $invoiceID, $db){
    $success = true;
    $table_name = 'itemsSets';
    $column_names = array('itemID', 'quantity', 'invoiceID');
    foreach($invoice->items as $itemsRow){
        //TODO : washingapp  check itemID if present into DB
        $obj["itemID"] = $itemsRow->itemID;
        $obj["quantity"] = $itemsRow->quantity;
        $obj["invoiceID"] = $invoiceID;
        $result = $db->insertIntoTable($obj, $column_names, $table_name);
        if($result=== NULL){
            $success = false;
            break;
        }
    }

    return $success;
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


        $invoiceID = addInvoice($invoice, $db);
        addItemsRows($invoice, $invoiceID, $db);
    }
});


$app->post('/invoices', function() use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    /* TODO washingapp
     *
     * 1/ retrieve user info
     * 2/ retrieve item info
     * 3/ rerieve all invoice data like created,...
     *
     */


    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else{
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $invoice=$request->invoice;


        $invoiceID = addInvoice($invoice, $db);
        addItemsRows($invoice, $invoiceID, $db);
    }
});
