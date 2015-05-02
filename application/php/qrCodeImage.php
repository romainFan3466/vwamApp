<?php
include('phpqrcode/qrlib.php');

header('Content-Type : image/png');

// outputs image directly into browser, as PNG stream

QRcode::png('PHP QR Code :)',false, QR_ECLEVEL_L, 10 );
?>