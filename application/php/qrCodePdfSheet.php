<?php
ChromePhp::log("Hello console!");

ob_start();
?>

<table width="720" cellpadding="8" cellspacing="0" style="page-break-before: always">
    <col width="320">
    <col width="32">
    <col width="320">
    <tr style="margin-bottom: 1cm;">
        <td width="320" height="176" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm; margin-bottom: 1cm;"><a name="Blank_MP1_panel1"></a>
                <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php" alt="QR Code"/>
                <br>
            </p>
        </td>
        <td rowspan="5" width="32" valign="top" style="border-top: 1.00pt solid #ffffff; border-bottom: 1.00pt solid #ffffff; border-left: none; border-right: none; padding: 0cm">
            <p ><br>
            </p>
        </td>
        <td width="320" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel2"></a>
                <img src="<?php dirname(__FILE__)?>/php/qrCodeImage.php" alt="QR Code"/>
                <br>
            </p>
        </td>
    </tr>
    <tr style="margin-bottom: 1cm;">
        <td width="320" height="176" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel3"></a>
                <br>
            </p>
        </td>
        <td width="320" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel4"></a>
                <br>
            </p>
        </td>
    </tr>
    <tr style="margin-bottom: 1cm;">
        <td width="320" height="176" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel5"></a>
                <br>
            </p>
        </td>
        <td width="320" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel6"></a>
                <br>
            </p>
        </td>
    </tr>
    <tr style="margin-bottom: 1cm;">
        <td width="320" height="176" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel7"></a>
                <br>
            </p>
        </td>
        <td width="320" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel8"></a>
                <br>
            </p>
        </td>
    </tr>
    <tr style="margin-bottom: 1cm;">
        <td width="320" height="176" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel9"></a>
                <br>
            </p>
        </td>
        <td width="320" style="border: 1px solid black; padding: 0cm">
            <p  align="center" style="margin-left: 0.3cm; margin-right: 0.3cm; margin-top: 0.1cm"><a name="Blank_MP1_panel10"></a>
                <br>
            </p>
        </td>
    </tr>
</table>
<?php

$html = ob_get_clean();




include("mpdf/mpdf.php");

$mpdf = new mPDF('BLANK', 'A4', '', '', 14.9, 14.9, 12.7, 12.7, 0, 0);
//$mpdf = new mPDF('BLANK','A4','','',0,0,25,10,10,10);

$mpdf->SetDisplayMode('fullpage');

// LOAD a stylesheet


//$mpdf->WriteHTML($stylesheet, 1);    // The parameter 1 tells that this is css/style only and no body/html/text

$mpdf->WriteHTML($html);

$mpdf->Output("test.pdf", 'I');

exit;
?>

