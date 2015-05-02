/**
 * @ngdoc controller
 * @name appModule.controller:InvoiceViewController
 * @require $scope
 * @require $invoice
 * @require $routeParams
 *
 * @description
 *
 * Interacts with template : "invoice.view.html"
 */
AppModule.controller("InvoiceViewController", [
    "$scope", "$log", "$invoice", "$routeParams",
    function ($scope, $log, $invoice, $routeParams) {

        if (angular.isDefined($routeParams.invoiceID)) {
           var invoiceID = $routeParams.invoiceID;

            $scope.customer = {};
            $scope.items=[];
            $scope.user = {};




            var _getInvoice = function (){
                $invoice.get(invoiceID).then(
                    function(res){
                        $scope.invoice=res.invoice;
                    },
                    function(res){

                    }
                );
            };



            _getInvoice();


            $scope.print = function(){

                $scope.html = $('.invoice').html();


                //$window.print();
            };





        } else {
            $log.error("invoiceID expected as route Params");
        }








    }
]);