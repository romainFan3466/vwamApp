<?php
//include("mpdf/mpdf.php");


function getAllInvoices($request,$customerID, $db){


    $from = DateTime::createFromFormat('Y-m-d H:i:s', $request->clause->from);
    $fromFormat = $from->format('Y-m-d H:i:s');

    $to = DateTime::createFromFormat('Y-m-d H:i:s', $request->clause->to);
    $toFormat = $to->format('Y-m-d H:i:s');




    $userID = $_SESSION["uid"];

    if ($fromFormat &&
        $toFormat &&
        $from <= $to
    ) {

        if (isset($customerID)) {
            $queryCore =
                "FROM invoices
                  WHERE (invoices.customerID) = (SELECT customers.ID
                             					                  FROM customers
                             					                  WHERE customers.ID='$customerID')
                  AND (invoices.created BETWEEN '$fromFormat' AND '$toFormat')
                  AND invoices.userID='$userID'"." AND invoices.type='Receipt'
                ORDER BY invoices.ID ";
        }
        $invoiceQuery = "SELECT invoices.*" . $queryCore;

        $invoices = $db->getSeveralRecords($invoiceQuery);
        //replace by length returned
        $nbInvoices = $db->getOneRecord("SELECT COUNT(invoices.ID) AS NumberOfInvoices ".$queryCore);


        $result = array(
            "status" => "success",
            "list" => $invoices,
            "nbTotalInvoices" => (int)$nbInvoices["NumberOfInvoices"]
        );

        return $result;
    } else {
        echo "Error";
        var_dump($fromFormat);
        var_dump($toFormat);
        var_dump($from);
        var_dump($to);
    }
};

function generateAndAddInvoice($request, $db, $customerID, $invoices ){
    $resultat = array();
    $invoices = $invoices["list"];

    $itemsRows = array();


    foreach ($invoices as $invoice) {


        $rows = getItemRows($db, $invoice["ID"]);



        foreach ($rows as $key => $value) {
            $rows[$key]["item"]["created"] = $invoice["created"];
            $rows[$key]["item"]["receiptID"] = $invoice["ID"];
            $rows[$key]["item"]["matriculation"]["first"] = $invoice["matriculation1"];
            $rows[$key]["item"]["matriculation"]["second"] = $invoice["matriculation2"];
            $rows[$key]["item"]["comment"] = $invoice["comment"];
            array_push($itemsRows, $rows[$key]);
        }
    }

    $invoice = array(
        "customer" => array(
            "ID" => $customerID
        ),
        "created" => $request->clause->created,
        "comment" => $request->clause->comment,
        "type" => "Invoice",
        "items" => $itemsRows
    );

    $result = addInvoice($invoice, $db, "Invoice");



    //INVOICE PART
    if ($result["success"] == true) {

        $resultRow = addItemsRows($invoice, $result["ID"], $db, true);


        //ROW PART
        if ($resultRow["success"] == true) {
            $resultRow["message"] = "Invoice and rows added successfully";
            $resultRow["ID"] = $result["ID"];
            $resultat["status"] = 200;
            $resultat["content"] = $resultRow;
        } else {
            $resultat["status"] = 400;
            $resultat["content"] = $resultRow;
        }
        return $resultat;
    } else {
        $resultat['status'] = 400;
        return $resultat;
    }

};


$app->post('/invoices/generate', function() use ($app){
    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        //retrieve POST params
        $request = json_decode($app->request->getBody());


        if(isset($request->clause->customerID)) {
            $customerID = $request->clause->customerID;


            //GET ALL INVOICES
            $invoices = getAllInvoices($request, $customerID, $db);

            if (isset($invoices["list"])) {

                $result = generateAndAddInvoice($request,$db, $customerID, $invoices );
                echoResponse($result["status"], $result["content"]);
            }
        }
        //ALL CUSTOMERS
        else {
            $userID = $_SESSION["uid"];
            $query = "SELECT customers.ID
                      FROM customers
                      WHERE customers.userID='$userID' AND customers.accountType='Account';";
            $customersID = $db->getSeveralRecords($query);

            $req=array();
            $req["created"] = $request->clause->created;
            $req["userID"] = $userID;
            $resultQueryGeneration["ID"] = $db->insertIntoTable($req , array("created","userID") , "generations");


            foreach($customersID as $v){
                $invoices = getAllInvoices($request, $v["ID"], $db);

                if (isset($invoices["list"])) {

                    $resultGeneration= generateAndAddInvoice($request, $db,$v["ID"], $invoices);
                    $invoiceID = $resultGeneration["content"]["ID"];
                    if(isset($invoiceID)){

                            $req = array();
                            $req["generationID"] = $resultQueryGeneration["ID"];
                            $req["invoiceID"] = $invoiceID;

                            $resultQueryGenerationSet = $db->insertIntoTable($req, array("generationID", "invoiceID"), "generationsSets");

                        } else {
                            $result["success"] = false;
                            $result["message"] = "Generation entity wasn't added, insert error";
                        }
                    }
                }

            $objReturn = array();
            $objReturn["generationID"] =  $resultQueryGeneration["ID"];
            echoResponse(200, $objReturn);
            }

        }






//die();
//
//
//
//
//
//
//        $html ='<p>Hello World</p>';
//
//        $mpdf = new mPDF('BLANK', 'A4', '', '', 14.9, 14.9, 12.7, 0, 0, 0);
//
//
//        $mpdf->SetDisplayMode('fullpage');
//
//
//        $mpdf->WriteHTML($html);
//
//        $mpdf->Output('filename.pdf','F');
//
//        /*$mpdf=new mPDF();
//        $mpdf->WriteHTML('<p>Hallo World</p>');
//        $mpdf->Output();*/
//
//        //exit;
//
//        $html ='<p>Salut second file</p>';
//
//        $mpdf = new mPDF('BLANK', 'A4', '', '', 14.9, 14.9, 12.7, 0, 0, 0);
//
//
//        $mpdf->SetDisplayMode('fullpage');
//
//
//        $mpdf->WriteHTML($html);
//
//        $mpdf->Output('filename2.pdf','F');
//
//        $zip = new ZipArchive();
//
//        $zip->open('Zip.zip', ZipArchive::CREATE);
//        $zip->addFile('filename.pdf');
//        $zip->addFile('filename2.pdf');
//        $zip->close();
//
//
//        header('Content-Transfer-Encoding: binary'); //Transfert en binaire (fichier).
//        header('Content-Disposition: attachment; filename="Zip.zip"'); //Nom du fichier.
//        header('Content-Length: '.filesize('Zip.zip')); //Taille du fichier.
//
//        readfile('Zip.zip');
//
//        unlink('filename2.pdf');
//        unlink('filename.pdf');
//        unlink('Zip.zip');
//
//
//
//    }
//





    });


$app->get('/generation/id/:ID(/:language)', function($ID,$language='en') use ($app) {
    //ChromePhp::log($language);
    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        $userID = $_SESSION["uid"];
        $query = "SELECT invoiceID
                  FROM generationsSets
                  WHERE generationID =  (SELECT generations.ID
						                  FROM generations
						                  WHERE generations.ID='$ID' AND generations.userID='$userID')";


        $invoicesID = $db->getSeveralRecords($query);

        $zipName = 'generationGenerated/generation-'.$ID.'.zip';
        $zip = new ZipArchive();
        $zip->open($zipName, ZipArchive::CREATE);

        $titles = [];



        foreach($invoicesID as $invoiceID){

            $invoice = getInvoiceByID($db, $session, $invoiceID["invoiceID"]);

            if($invoice["code"]==200 && $invoice["result"]["status"]=="success"){

                $invoice = (object)$invoice["result"]["invoice"];

                $title= (isset($language) && $language === "fr")? getPdfInvoiceFR($invoice,true) :getPdfInvoiceEN($invoice,true);


                array_push($titles,$title);

                if(isset($title)){
                    $zip->addFile("pdfGenerated/".$title, $title);
                }
            }
        }

        if ($zip->close() === false) {
            ChromePhp::log("error close zip");
        };

        foreach($titles as $t){
            unlink("pdfGenerated/".$t);
        }

        ob_clean();
        ob_end_flush();
        header('Content-type: application/zip');
        header('Content-Disposition: attachment; filename="generation-'.$ID.'.zip"'); //Nom du fichier.
        header('Content-Length: '.filesize($zipName)); //Taille du fichier.

        readfile($zipName);

        unlink($zipName);






    }
});
?>