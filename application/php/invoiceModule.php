<?php

function addInvoice($invoice, $db){
    $table_name = 'invoices';
    $column_names = array('customerID', 'userID', 'matriculation1', 'matriculation2');
    $userID = $_SESSION["uid"];
    $obj["customerID"] = (int)$invoice->customer->ID;
    $ID = $invoice->customer->ID;

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
    $column_names = array('itemID','name','type','unitPrice','quantity', 'subTotal', 'invoiceID');
    $totalPrice = 0.0;
    $result["success"] = true;

    foreach($invoice->items as $itemRow){
        $obj["itemID"] = (int)$itemRow->item->ID;
        $ID= $itemRow->item->ID;
        $isItemExists = $db->getOneRecord("select * from items where ID='$ID'");

        if($isItemExists){
            $obj["name"] = $isItemExists["name"];
            $obj["type"] = $isItemExists["type"];
            $price = (double)$isItemExists["price"];
            $obj["unitPrice"]  = $price;

            $obj["quantity"] = $itemRow->quantity;

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


//TODO washingapp fix history storage of items, instead of using itemID only
// because for e.g if the price goes to change, old invoice do not have to change,
// the same for the deletion.

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

/**
 * @param $db
 * @param $ID
 */
function getItemRows($db, $ID){
    $query="SELECT itemID, name, type, unitPrice, quantity FROM itemsSets WHERE invoiceID='$ID'";
    $itemsRows = $db->getSeveralRecords($query);

    $result = array();

    foreach ($itemsRows as $key => $value) {
        $item = array();
        $item["ID"] = $value["itemID"];
        $item["name"] = $value["name"];
        $item["type"] = $value["type"];
        $item["price"] = (double)$value["unitPrice"];

        $subTotal = (double)$value["unitPrice"]*(double) $value["quantity"];

        $itemRow = array(
            "item" => $item,
            "quantity" => (int)$value["quantity"],
            "subTotal" => $subTotal
        );
        array_push($result ,$itemRow );
    };
    return $result;
};


function getInvoiceByID($db, $session, $ID){
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

        //retrive item rows
        $itemRows = getItemRows($db, $ID);
        $isInvoiceExists["items"] = $itemRows;

        //retrive customer
        $customer = getCustomerByID($db, $session, $isInvoiceExists["customerID"]);

        if(!isset($customer["customer"])){
            $res= array(
                "result" => array(
                    "message" => $customer["message"]
                ),
                "code" => $customer["code"]
            );
            return $res;
        }
        else {
            $isInvoiceExists["customer"] = $customer["customer"];
            unset($isInvoiceExists["customerID"]);

            //retrieve user
            $user = getUserData($db, $session);
            $isInvoiceExists["from"] = $user["user"];
            unset($isInvoiceExists["userID"]);

            $result["status"] = "success";
            $result["invoice"] = $isInvoiceExists;
            $res= array(
                "result" => $result,
                "code" => 200
            );

            return $res;
        }
    }
    else {
        $response["status"] = "error";
        $response["message"] = "no invoice with a such ID exist for the user logged ";
        $res= array(
            "result" => $response,
            "code" => 400
        );

        return $res;
    }

};



$app->post('/invoices/:ID', function($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if(!$session["authenticated"]){
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    }
    else{

        $result = getInvoiceByID($db, $session, $ID);
        echoResponse($result["code"], $result["result"]);

    }
});

$app->get('/invoices/pdf/:ID', function($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {

        $result = getInvoiceByID($db, $session, $ID);
        include("invoicePdfModule.php");

    }
});


$app->post('/invoices/all',function() use ($app){
    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());

        //TODO Washingap fix date format
        $from = new Date($request["from"]);
        $to = new Date($request["to"]);
        $customerID = $request["customerID"];
        $userID = $_SESSION["uid"];

        if (isset($from) && isset($to) && $from <= $to) {
            $query = "select * from invoices where userID='$userID' AND created >='$from' AND created <='$to'";
            if (isset($customerID)) {
                $query .= "AND customerID='$customerID'";
            }

            $invoices = $db->getSeveralRecords($query);

            foreach ($invoices as $invoice) {
                $invoice["customer"]["name"] = getCustomerByID($db, $session, $invoice["customerID"]);
            };

            $result = array(
                "status" => "success",
                "list"   => $invoices
            );

            echoResponse(200, $result);

        } else {
            echo "Error";

        }
    }
});