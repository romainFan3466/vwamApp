<?php
include "ChromePhp.php";
if($result["code"]!=200) {
    echoResponse($result["code"], $result["result"]);
}
else {
    ChromePhp::log("Hello console!");

    $invoice = (object)$result["result"]["invoice"];
    ChromePhp::log($invoice);
    ChromePhp::log($invoice->customer["name"]);
    ob_start();
    ?>

    <div class="container-fluid">

        <div class="row row-lg-space">

            <div class=" col-xs-offset-6 col-xs-6 text-right">
                <h1>INVOICE</h1>

                <h1>
                    <small class="ng-binding">Invoice #<?php echo $invoice->ID ;?></small>
                </h1>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-5">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 ><strong>To : </strong><?php echo $invoice->customer["name"];?></h4>
                    </div>
                    <div class="panel-body">
                        <p>
                            <?php echo $invoice->customer["address"];?> <br>
                            <?php echo $invoice->customer["city"];?> <br>
                            <?php echo $invoice->customer["country"];?> <br>
                            <?php echo $invoice->customer["phone"];?> <br>
                        </p>
                        <hr>
                        <p>Vehicle matriculation #1 : <?php echo $invoice->matriculation["first"];?></p>
                        <p>Vehicle matriculation #2 : <?php echo $invoice->matriculation["second"];?></p>
                    </div>
                </div>
            </div>
            <div class="col-xs-5 col-xs-offset-2 text-right">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><strong>From :</strong> <?php echo $invoice->from["company"];?></h4>
                    </div>
                    <div class="panel-body">
                        <p>
                            <?php echo $invoice->from["address"];?> <br>
                            <?php echo $invoice->from["city"];?> <br>
                            <?php echo $invoice->from["country"];?> <br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- / end client details section -->

        <table class="table table-bordered">
            <thead>
            <tr class="active">
                <th>
                    <h4>Ref</h4>
                </th>
                <th>
                    <h4>Type</h4>
                </th>
                <th>
                    <h4>Description</h4>
                </th>
                <th>
                    <h4>Qty</h4>
                </th>
                <th>
                    <h4>Rate/Price</h4>
                </th>
                <th>
                    <h4>Sub Total</h4>
                </th>
            </tr>
            </thead>
            <tbody>
            <?php
            $cpt = 0;
            foreach($invoice->items as $itemRow) : $cpt++; ?>
            <tr>
                <td class="text-right"><?php echo $itemRow["item"]["ID"];?></td>
                <td class="text-right"><?php echo $itemRow["item"]["type"];?></td>
                <td class="text-right"><?php echo $itemRow["item"]["name"];?></td>
                <td class="text-right"><?php echo $itemRow["quantity"];?></td>
                <td class="text-right"><?php echo $itemRow["item"]["price"];?>&euro;</td>
                <td class="text-right"><?php echo $itemRow["subTotal"];?>&euro;</td>
            </tr>
            <?php endforeach; ?>
            <!-- end ngRepeat: obj in invoice.items -->
            </tbody>
        </table>
        <div class="row text-right">
            <div class="col-xs-2 col-xs-offset-7">
                <p>
                    <strong>
                        Sub Total : <br>
                        TAX : <br>
                        Total : <br>
                    </strong>
                </p>
            </div>
            <div class="col-xs-2">
                <strong class="ng-binding">
                    <?php echo $invoice->totalPrice;?>&euro;<br>
                    N/A <br>
                    <?php echo $invoice->totalPrice;?>&euro;<br>
                </strong>
            </div>
        </div>

        <div class="row row-lg-space no-slice">
            <div class="col-xs-5">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4>Invoice details</h4>
                    </div>
                    <div class="panel-body">
                        <p class="ng-binding">Invoice number : <?php echo $invoice->ID ;?></p>

                        <p class="ng-binding">Created : <?php echo $invoice->created ;?></p>

                        <p>Payment mode :CB/Cash/DKV</p>

                        <p class="text-success">Payment status : Paid</p>
                    </div>
                </div>
            </div>
            <div class="col-xs-offset-1 col-xs-5">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4>Contact Details</h4>
                    </div>
                    <div class="panel-body">
                        <p class="ng-binding">
                            Email :  <?php echo $invoice->from["email"];?> <br><br>
                            Phone :  <?php echo $invoice->from["phone"];?> <br> <br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php

    $html = ob_get_clean();


        //echo 5 '<pagebreak suppress="on" page-break-type="clonebycss"/>';



    include("mpdf/mpdf.php");

    $mpdf = new mPDF('BLANK', 'A4', '', '', 9, 9, 25, 10, 10, 10);
//$mpdf = new mPDF('BLANK','A4','','',0,0,25,10,10,10);

    $mpdf->SetDisplayMode('fullpage');

// LOAD a stylesheet
    $stylesheet = file_get_contents("bootstrap.css");


    $mpdf->WriteHTML($stylesheet, 1);    // The parameter 1 tells that this is css/style only and no body/html/text

    $mpdf->WriteHTML($html);

    $title = "invoice_". $invoice->ID . ".pdf";
    $mpdf->Output($title, 'I');

    exit;

}
?>