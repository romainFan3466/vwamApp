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
            $scope.generated = false;



            var _parseDescription = function(){
              angular.forEach($scope.invoice.items, function(row, key){
                  if(row.item.name.charAt(0)=='{'){
                   $scope.invoice.items[key].item.name = angular.fromJson(row.item.name);
                      $scope.generated = true;
                  }
              });

            };


            var _getInvoice = function (){
                $invoice.get(invoiceID).then(
                    function(res){
                        $scope.invoice=res.invoice;
                        _parseDescription();
                    },
                    function(res){

                    }
                );
            };



            _getInvoice();





        } else {
            $log.error("invoiceID expected as route Params");
        }








    }
]);