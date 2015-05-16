<?php

include "ChromePhp.php";

function addInvoice($invoice, $db, $invoiceType)
{
    if(is_array($invoice)) {
        $invoice = arrayToObject($invoice);
    }


    $table_name = 'invoices';
    $column_names = array('customerID', 'userID', 'matriculation1', 'matriculation2','created','paymentMode','comment', 'type');
    $userID = $_SESSION["uid"];
    $obj["customerID"] = (int)$invoice->customer->ID;
    $ID = $invoice->customer->ID;

    $isCustomerExists = $db->getOneRecord("select accountType from customers where (ID='$ID' AND userID='$userID')");
    if ($isCustomerExists) {
        $obj["userID"] = $_SESSION["uid"];
        $obj["matriculation1"] = strval($invoice->matriculation->first);
        $obj["matriculation2"] = strval($invoice->matriculation->second);
        if(isset($invoice->created)){
            $created = DateTime::createFromFormat('Y-m-d H:i:s', $invoice->created);
            $obj["created"]= $created->format('Y-m-d H:i:s');
        }
        else {
            $obj["created"] = date('Y-m-d H:i:s');
        }

        //$obj["created"] = $created->format('Y-m-d H:i:s');
        $obj["comment"] = (isset($invoice->comment) && strlen($invoice->comment)!==0)? $invoice->comment : "";


        if($isCustomerExists["accountType"]=="Account" && $invoiceType=="Receipt"){
            $obj["paymentMode"] ="";
            $obj["type"] ="Receipt";
        }
        else {
            $obj["paymentMode"] = (isset($invoice->paymentMode))? $invoice->paymentMode :"";
            $obj["type"] ="Invoice";
        }


        $result["ID"] = $db->insertIntoTable($obj, $column_names, $table_name);
        if ($result["ID"] != NULL) {
            $result["success"] = true;
            $result["message"] = "Invoice added successfully";
        } else {
            $result["success"] = false;
            $result["message"] = "Invoice wasn't added, insert error";
        }
    } else {
        $result["success"] = false;
        $result["message"] = "Invoice wasn't added, customer doesn't exist for this user";
    }

    return $result;
};


function addItemsRows($invoice, $invoiceID, $db, $fromGeneration)
{

    $table_name = 'itemsSets';
    $column_names = array('itemID', 'name', 'type', 'unitPrice', 'quantity', 'subTotal', 'invoiceID');
    $totalPrice = 0.0;
    if(!isset($result)){$result=array();}
    $result["success"] = true;
    $invoice = (object)$invoice;



    foreach ($invoice->items as $itemRow) {
        if(is_array($itemRow)) {
            $itemRow = arrayToObject($itemRow);
        }



        $obj["itemID"] = (int)$itemRow->item->ID;
        $ID = $itemRow->item->ID;
        $isItemExists = $db->getOneRecord("select * from items where ID='$ID'");

        if ($isItemExists) {
            $obj["name"] = $isItemExists["name"];

            if($fromGeneration){

                $name = array(
                    "name" => $isItemExists["name"],
                    "created" => $itemRow->item->created,
                    "receiptID" =>$itemRow->item->receiptID,
                    "matriculation" =>$itemRow->item->matriculation,
                    "comment" =>$itemRow->item->comment
                );
                $obj["name"] =json_encode($name);
            }


            $obj["type"] = $isItemExists["type"];
            $price = (double)$isItemExists["price"];
            $obj["unitPrice"] = $price;

            $obj["quantity"] = $itemRow->quantity;

            $obj["subTotal"] = $price * (double)$obj["quantity"];

            $totalPrice = $totalPrice + $obj["subTotal"];
            $obj["invoiceID"] = $invoiceID;

            $insert = $db->insertIntoTable($obj, $column_names, $table_name);

            if ($insert === NULL) {
                $result["success"] = false;
                $result["message"] = "Invoice row wasn't added, insert error";
                //DELETE INVOICE, all related row will be deleted
                $query = "DELETE FROM invoices WHERE ID=?";
                $conn = $db->getConnection();
                $stmt = $conn->prepare($query);
                $stmt->bind_param('i', $invoiceID);
                $stmt->execute();
                break;
            }
        } else {
            $result["success"] = false;
            $result["message"] = "Invoice row wasn't added, itemID doesn't exist";
            //DELETE INVOICE, all related row will be deleted
            $query = "DELETE FROM invoices WHERE ID=?";
            $conn = $db->getConnection();
            $stmt = $conn->prepare($query);
            $stmt->bind_param('i', $invoiceID);
            $stmt->execute();
            break;
        }
    }
    if ($result["success"] == true) {
        //Update invoice of totalPrice
        $query = "UPDATE invoices SET totalPrice=? WHERE ID=?";
        $conn = $db->getConnection();
        $stmt = $conn->prepare($query);
        $stmt->bind_param('di', $totalPrice, $invoiceID);
        $stmt->execute();
    }
    return $result;
};


$app->post('/invoices/add', function () use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $invoice = $request->invoice;

        $result = addInvoice($invoice, $db, $invoice->type);

        //INVOICE PART
        if ($result["success"] == true) {
            $resultRow = addItemsRows($invoice, $result["ID"], $db, false);

            //ROW PART
            if ($resultRow["success"] == true) {
                $resultRow["message"] = "Invoice and rows added successfully";
                $resultRow["ID"] = $result["ID"];
                echoResponse(200, $resultRow);
            } else {
                echoResponse(400, $resultRow);
            }
        } else {
            echoResponse(400, $result);
        }
    }
});

/**
 * @param $db
 * @param $ID
 */
function getItemRows($db, $ID)
{
    $query = "SELECT itemID, name, type, unitPrice, quantity FROM itemsSets WHERE invoiceID='$ID'";
    $itemsRows = $db->getSeveralRecords($query);

    $result = array();

    foreach ($itemsRows as $key => $value) {
        $item = array();
        $item["ID"] = $value["itemID"];
        $item["name"] = $value["name"];
        $item["type"] = $value["type"];
        $item["price"] = (double)$value["unitPrice"];

        $subTotal = (double)$value["unitPrice"] * (double)$value["quantity"];

        $itemRow = array(
            "item" => $item,
            "quantity" => (int)$value["quantity"],
            "subTotal" => $subTotal
        );
        array_push($result, $itemRow);
    };
    return $result;
}

;


function getInvoiceByID($db, $session, $ID)
{
    $userID = $_SESSION["uid"];
    $isInvoiceExists = $db->getOneRecord("select * from invoices where ID='$ID' AND userID='$userID'");
    if ($isInvoiceExists) {

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

        //set total price as double
        $isInvoiceExists["totalPrice"] = (double)$isInvoiceExists["totalPrice"];

        //retrive customer
        $customer = getCustomerByID($db, $session, $isInvoiceExists["customerID"]);

        if (!isset($customer["customer"])) {
            $res = array(
                "result" => array(
                    "message" => $customer["message"]
                ),
                "code" => $customer["code"]
            );
            return $res;
        } else {
            $isInvoiceExists["customer"] = $customer["customer"];
            unset($isInvoiceExists["customerID"]);

            //retrieve user
            $user = getUserData($db, $session);
            $isInvoiceExists["from"] = $user["user"];
            unset($isInvoiceExists["userID"]);

            $result["status"] = "success";
            $result["invoice"] = $isInvoiceExists;
            $res = array(
                "result" => $result,
                "code" => 200
            );

            return $res;
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "no invoice with a such ID exist for the user logged ";
        $res = array(
            "result" => $response,
            "code" => 400
        );

        return $res;
    }

};


$app->post('/invoices/id/:ID', function ($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {

        $result = getInvoiceByID($db, $session, $ID);
        echoResponse($result["code"], $result["result"]);

    }
});

$app->get('/invoices/pdf/:ID(/:language)', function ($ID, $language="en") use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {

        $result = getInvoiceByID($db, $session, $ID);

        if($result["code"]!=200) {
            echoResponse($result["code"], $result["result"]);
        }
        else {
            $invoice = (object)$result["result"]["invoice"];
            (isset($language) && $language === "fr") ? getPdfInvoiceFR($invoice,false) : getPdfInvoiceEN($invoice,false) ;
        }

    }
});


$app->post('/invoices/all', function () use ($app) {
    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());

        $offset = $request->clause->offset;
        $limit = $request->clause->limit;
        $invoiceType = $request->clause->invoiceType;

        $clauseInvoiceType ="";

        if($invoiceType->invoice && !$invoiceType->receipt) {
            $clauseInvoiceType = "AND invoices.type='Invoice'";
        }
        if(!$invoiceType->invoice && $invoiceType->receipt){
            $clauseInvoiceType = "AND invoices.type='Receipt'";
        }

        $from = DateTime::createFromFormat('Y-m-d H:i:s', $request->clause->from);
        $fromFormat = $from->format('Y-m-d H:i:s');

        $to = DateTime::createFromFormat('Y-m-d H:i:s', $request->clause->to);
        $toFormat = $to->format('Y-m-d H:i:s');

        $customerID = $request->clause->customerID;
        $userID = $_SESSION["uid"];

        if ($fromFormat &&
            $toFormat &&
            $from <= $to
        ) {
            $queryCore =
                "FROM invoices, customers
                  WHERE (invoices.customerID, customers.name) IN (SELECT customers.ID, customers.name
                             					                  FROM customers)
                  AND (invoices.created BETWEEN '$fromFormat' AND '$toFormat')
                  AND invoices.userID='$userID'"." ".$clauseInvoiceType.
                  " ORDER BY invoices.ID ";

            if (isset($customerID)) {
                $queryCore =
                    "FROM invoices, customers
                  WHERE (invoices.customerID, customers.name) = (SELECT customers.ID, customers.name
                             					                  FROM customers
                             					                  WHERE customers.ID='$customerID')
                  AND (invoices.created BETWEEN '$fromFormat' AND '$toFormat')
                  AND invoices.userID='$userID'"." ".$clauseInvoiceType.
                  " ORDER BY invoices.ID ";
            }
            $invoiceQuery = "SELECT invoices.ID, invoices.totalPrice, invoices.created, invoices.type, customers.name " . $queryCore;

            if(isset($offset) && isset($limit) && (int)$limit >= 0 &&
                (int)$offset >= 0 &&
                (int)$offset < (int)$limit){
                $invoiceQuery.= "LIMIT " .(int)$offset . ", " . (int)$limit . ";";
            }

            $invoices = $db->getSeveralRecords($invoiceQuery);
            //replace by length returned
            $nbInvoices = $db->getOneRecord("SELECT COUNT(invoices.ID) AS NumberOfInvoices ".$queryCore);



            foreach ($invoices as $key => $invoice) {
                $invoices[$key]["customer"] = array(
                    "name" => $invoice["name"]
                );
                unset($invoices[$key]["name"]);
            };

            $result = array(
                "status" => "success",
                "list" => $invoices,
                "nbTotalInvoices" => (int)$nbInvoices["NumberOfInvoices"]
            );

            echoResponse(200, $result);


        } else {
            echo "Error";
            var_dump($fromFormat);
            var_dump($toFormat);
            var_dump($from);
            var_dump($to);
            var_dump($limit);
            var_dump($offset);

        }
    }
});

$app->post('/invoices/refund', function () use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());
        $invoice = $request->invoice;
        $result = addInvoice($invoice, $db, "Invoice");

        //INVOICE PART
        if ($result["success"] == true) {
            $resultRow = addItemsRows($invoice, $result["ID"],$result["customerAccount"], $db);

            //ROW PART
            if ($resultRow["success"] == true) {
                $resultRow["message"] = "Invoice and rows added successfully";
                $resultRow["ID"] = $result["ID"];
                echoResponse(200, $resultRow);
            } else {
                echoResponse(400, $resultRow);
            }
        } else {
            echoResponse(400, $result);
        }
    }
});