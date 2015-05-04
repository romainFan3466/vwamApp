<?php
include('phpqrcode/qrlib.php');
require_once('AESgenerator.php');
header('Content-Type: text/html');

$customerID = $_GET["customerID"];

if(!isset($customerID)){
    echo "error, no customer ID given";
}
else{

//
    $aes = new AESgenerator();
    $cipher= $aes->encrypt($customerID);

    $cryptedID = base64_encode($cipher);

    QRcode::png($cryptedID,false, QR_ECLEVEL_L, 10 );

}



?>

<!--QRcode::png($cipher,false, QR_ECLEVEL_L, 10 );-->
<!--?>-->
<!--<div>-->
<!--    <p>Private</p>-->
<!--    <p>--><?php //echo $rsa->getPrivateKey();?><!--</p>-->
<!--</div>-->
<!--<div>-->
<!--    <p>Public</p>-->
<!--    <p>--><?php //echo $rsa->getPublicKey();?><!--</p>-->
<!--</div>-->
