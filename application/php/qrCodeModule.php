<?php
$app->get('/qrCode/customers/:ID', function ($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {
        if(!isset($ID)){
            $response = array();
            $response["message"] = "no customer ID provided";
            echoResponse(401, $response);
        }
        else{
            $customer = getCustomerByID($db, $session, $ID);


            if(isset($customer) && isset($customer["code"])){
                if($customer["code"]===200){
                    include("qrCodeInc/qrCodePdfSheet.php");
                }
                else {
                    echo "I passe in else";
                    echoResponse($customer["code"],$customer["message"]);
                }
            }
        }
    }
});
?>