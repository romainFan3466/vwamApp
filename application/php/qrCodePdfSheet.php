<?php
include("mpdf/mpdf.php");
include('phpqrcode/qrlib.php');

// outputs image directly into browser, as PNG stream


ob_start();
?>

<table   style="width: 100%" cellspacing="10">
    <tr>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
        <td rowspan="5" width="32" valign="top" style="border-top: 1.00pt solid #ffffff; border-bottom: 1.00pt solid #ffffff; border-left: none; border-right: none; padding: 0cm">
            <p ><br>
            </p>
        </td>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
        <td style="width:8.5cm; height:5.5cm; border: 1px solid black;" align="center">
            <div style="text-align: center;">
                <p>VWAMA Customer Card</p>
                <p>
                    <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php?customerID=<?php echo $ID ?>" style="width: 4.0cm;" alt="QR Code"/>
                </p>
            </div>
        </td>
    </tr>
</table>
<?php

$html = ob_get_clean();

$mpdf = new mPDF('BLANK', 'A4', '', '', 14.9, 14.9, 12.7, 0, 0, 0);
//$mpdf = new mPDF('BLANK','A4','','',0,0,25,10,10,10);

$mpdf->SetDisplayMode('fullpage');

// LOAD a stylesheet


//$mpdf->WriteHTML($stylesheet, 1);    // The parameter 1 tells that this is css/style only and no body/html/text

$mpdf->WriteHTML($html);

$mpdf->Output("test.pdf", 'I');

echo $html;

//$rsa = new RSA();

exit;
?>