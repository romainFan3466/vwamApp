<?php
$app->get('/qrCode/customers/:ID', function ($ID) use ($app) {

    $db = new DbHandler();
    $session = $db->getSession();

    if (!$session["authenticated"]) {
        $response = array();
        $response["message"] = "Unauthorized access, need to login in";
        echoResponse(401, $response);
    } else {


        include("qrCodePdfSheet.php");

    }
});
?>