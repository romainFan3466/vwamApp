<?php
function getPdfInvoiceEN($invoice, $download)
{


    ob_start();
    ?>
    <div class="container-fluid">
        <?php if ($invoice->type == "Invoice") : ; ?>
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
            </div>
        <?php endif;?>

        <div class="row no-slice row-space">
            <div class="col-xs-6">
                <div class="panel panel-info">
                    <div class="panel-heading" style="background-color: #d9edf7;">
                        <h4>Details</h4>
                    </div>
                    <div class="panel-body">

                        <?php if ($invoice->type == "Invoice") { ?>
                            <p>Invoice number: <?php echo $invoice->ID; ?></p>
                        <?php } else { ?>
                            <p>Receipt number : <?php echo $invoice->ID; ?></p>
                        <?php };?>

                        <p>Created : <?php echo $invoice->created;?></p>

                        <?php if ($invoice->type == "Invoice") { ?>
                            <p>Payment mode : <?php echo $invoice->paymentMode ?></p>
                            <p class="text-success">Payment status : Paid</p>
                        <?php } else { ?>
                            <p class="text-warning">Payment status : Due date</p>
                        <?php };?>

                        <?php if (isset($invoice->comment) && strlen($invoice->comment) !== 0) {
                            echo '<p>Comment : ' . $invoice->comment . '</p>';
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-xs-offset-1 col-xs-4">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4>Contact</h4>
                    </div>
                    <div class="panel-body">
                        <p>
                            Email :  <?php echo $invoice->from["email"];?> <br><br>
                            Phone :  <?php echo $invoice->from["phone"];?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    $footer = ob_get_clean();


    ?>

    <?php
    ob_start();
    ?>
    <div class="container-fluid">
        <?php if ($invoice->type == "Invoice") : ; ?>
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
                        <?php echo number_format($invoice->totalPrice, 2); ?>&euro;<br>
                        N/A <br>
                        <?php echo number_format($invoice->totalPrice, 2); ?>&euro;<br>
                    </strong>
                </div>
            </div>
        <?php endif;?>

        <div class="row no-slice row-space">
            <div class="col-xs-6">
                <div class="panel panel-info">
                    <div class="panel-heading" style="background-color: #d9edf7;">
                        <h4>Details</h4>
                    </div>
                    <div class="panel-body">

                        <?php if ($invoice->type == "Invoice") { ?>
                            <p>Invoice number: <?php echo $invoice->ID; ?></p>
                        <?php } else { ?>
                            <p>Receipt number : <?php echo $invoice->ID; ?></p>
                        <?php };?>

                        <p>Created : <?php echo $invoice->created;?></p>

                        <?php if ($invoice->type == "Invoice") { ?>
                            <p>Payment mode : <?php echo $invoice->paymentMode ?></p>
                            <p class="text-success">Payment status : Paid</p>
                        <?php } else { ?>
                            <p class="text-warning">Payment status : Due date</p>
                        <?php };?>

                        <?php if (isset($invoice->comment) && strlen($invoice->comment) !== 0) {
                            echo '<p>Comment : ' . $invoice->comment . '</p>';
                        }
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-xs-offset-1 col-xs-4">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4>Contact</h4>
                    </div>
                    <div class="panel-body">
                        <p>
                            Email :  <?php echo $invoice->from["email"];?> <br><br>
                            Phone :  <?php echo $invoice->from["phone"];?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    $footer_last = ob_get_clean();


    ?>




    <?php
    ob_start();
    ?>

    <htmlpageheader name="myheader">
        <div class="container-fluid">
            <div class="row row-lg-space">

                <div class=" col-xs-offset-6 col-xs-6 text-right">
                    <?php if ($invoice->type == "Invoice") { ?>
                        <h1>INVOICE</h1>
                        <h1>
                            <small>Invoice #<?php echo $invoice->ID; ?></small>
                        </h1>
                    <?php } else { ?>
                        <h1>RECEIPT</h1>
                        <h1>
                            <small>Receipt #<?php echo $invoice->ID; ?></small>
                        </h1>
                    <?php };?>


                </div>
            </div>

            <div class="row">
                <div class="col-xs-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4><strong>To : </strong><?php echo $invoice->customer["name"];?></h4>
                        </div>
                        <div class="panel-body">
                            <p>
                                <?php echo $invoice->customer["address"];?> <br>
                                <?php echo $invoice->customer["city"];?> <br>
                                <?php echo $invoice->customer["country"];?> <br>
                                <?php echo $invoice->customer["phone"];?> <br>
                            </p>
                            <hr>
                            <p>Vehicle registration #1 : <?php echo $invoice->matriculation["first"];?></p>

                            <p>Vehicle registration #2 : <?php echo $invoice->matriculation["second"];?></p>
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
        </div>
    </htmlpageheader>


    <htmlpagefooter name="myfootere">
        <?php echo $footer; ?>
    </htmlpagefooter>


    <sethtmlpageheader name="myheader" value="on" show-this-page="1"/>
    <sethtmlpagefooter name="myfootere" value="on"/>



    <div class="container-fluid">

        <!-- / end client details section -->

        <table class="table table-bordered table-condensed">
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
                    <h4>Unit Price</h4>
                </th>
                <th>
                    <h4>Sub Total</h4>
                </th>
            </tr>
            </thead>
            <tbody>
            <?php

            foreach ($invoice->items as $rawItemRow) :
                $itemRow = $rawItemRow;
                if ($itemRow["item"]["name"][0] == "{") {
                    $var = json_decode($itemRow["item"]["name"], true);
                    $itemRow["item"]["name"] = $var;
                }?>



                <tr>
                    <td class="text-right"><?php echo $itemRow["item"]["ID"];?></td>
                    <td class="text-center"><?php echo $itemRow["item"]["type"];?></td>

                    <td class="text-left">
                        <?php if (isset($itemRow["item"]["name"]["name"])) { ?>
                            <h6><strong>Item :</strong> <?php echo $itemRow["item"]["name"]["name"]; ?> </h6>
                            <h6><strong>Receipt number :</strong> <?php echo $itemRow["item"]["name"]["receiptID"]; ?>
                                <strong>&nbsp;Created :</strong> <?php echo $itemRow["item"]["name"]["created"]; ?>
                            </h6>

                            <?php if ($itemRow["item"]["name"]["matriculation"]["first"] != "") { ?>
                                <h6><strong>Vehicle registration #1
                                        :</strong> <?php echo $itemRow["item"]["name"]["matriculation"]["first"] ?>
                                </h6>
                            <?php } ?>
                            <?php if ($itemRow["item"]["name"]["matriculation"]["second"] != "") { ?>
                                <h6><strong>Vehicle registration #2
                                        :</strong> <?php echo $itemRow["item"]["name"]["matriculation"]["first"] ?>
                                </h6>
                            <?php } ?>
                            <?php if ($itemRow["item"]["name"]["comment"] != "") { ?>
                                <h6><strong>Comment :</strong> <?php echo $itemRow["item"]["name"]["comment"] ?> </h6>
                            <?php }
                        } else {
                            echo $itemRow["item"]["name"];
                        };?>

                    </td>
                    <td class="text-right"><?php echo $itemRow["quantity"];?></td>
                    <td class="text-right"><?php echo $itemRow["item"]["price"];?>&euro;</td>
                    <td class="text-right"><?php echo $itemRow["subTotal"];?>&euro; </td>
                </tr>
            <?php endforeach; ?>

            </tbody>
        </table>
    </div>
    <?php

    $html = ob_get_clean();




//    $mpdf = new mPDF('BLANK', 'A4', '', '', 9, 9, 20, 10, 10, 10);
    $mpdf = new mPDF('BLANK', 'A4', '', '', 9, 9, 130, 75, 18, 10);
//$mpdf = new mPDF('BLANK','A4','','',0,0,25,10,10,10);

    $mpdf->SetDisplayMode('fullpage');


// LOAD a stylesheet
    $stylesheet = file_get_contents("bootstrap.css");


    $mpdf->WriteHTML($stylesheet, 1);    // The parameter 1 tells that this is css/style only and no body/html/text

    $mpdf->WriteHTML($html);
    $mpdf->SetHTMLFooter($footer_last);

    $title = "pdfGenerated/invoice_" . $invoice->ID . ".pdf";

    if($download==true){

        $mpdf->Output($title, 'F');
        return "invoice_" . $invoice->ID . ".pdf";

    }
    else{
        $mpdf->Output($title, 'I');
        exit;
    }

    //exit;
}
?>