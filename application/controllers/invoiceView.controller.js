/**
 * @ngdoc controller
 * @name appModule.controller:InvoiceViewController
 * @require $scope
 * @require $authentication
 * @require $location
 * @require $item
 * @require $customer
 * @require $invoice
 *
 * @description
 *
 */
AppModule.controller("InvoiceViewController", [
    "$scope", "$log", "$customer", "$item","$authentication", "$invoice", "$routeParams","$window",
    function ($scope, $log, $customer, $item, $authentication, $invoice, $routeParams, $window) {

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