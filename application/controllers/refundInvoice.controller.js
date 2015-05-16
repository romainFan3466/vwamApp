/**
 * @ngdoc controller
 * @name appModule.controller:RefundInvoiceController
 * @require $scope
 * @require $invoice
 * @require $routeParams
 *
 * @description
 *
 * Interacts with template : "createInvoice.view.html"
 *
 */
AppModule.controller("RefundInvoiceController", [
    "$scope", "$log","$invoice","$routeParams",
    function ($scope, $log, $invoice, $routeParams) {

        $scope.loading = false;
        $scope.invoice = {};
        $scope.found = false;
        $scope.error = {
            flag : false,
            message : ""
        };
        $scope.refundID = "";

        $scope.items = [];

        $scope.itemsAll = false;

        $scope.$watch("itemsAll", function(value){
           if(angular.isDefined(value) && (value===true || value ===false)){
               angular.forEach($scope.items, function(item){
                   item.refund.checked = value;
               });
           }
        });

        var _assignItems = function(items){
            $scope.items = angular.copy(items);
            angular.forEach($scope.items, function(item){
               item.refund = {
                   checked : false,
                   quantity :1
               };
            });
        };

        var formatRefund = function(){
            var refund = angular.copy($scope.invoice);

            //overwrite item part
            refund.items = [];
            angular.forEach($scope.items, function(itemRow){
                if(itemRow.refund.checked){
                    var itemR = {
                        item : itemRow.item,
                        quantity : itemRow.refund.quantity - (2*itemRow.refund.quantity)
                    };
                    refund.items.push(itemR);
                }
            });
            refund.type = "Invoice";

            return refund;
        };


        $scope.refund = function(){
            $scope.loading= true;
          var data = formatRefund();
            $log.log(data);
            $invoice.add(data).then(
                function(result){
                    $log.log(result);
                    $scope.addedSuccess = true;
                    $scope.items = [];
                    $scope.invoice = {};
                    $scope.found=false;
                    $scope.itemsAll = false;
                    $scope.invoiceID = "";
                    $scope.refundID=result.ID;
                    $scope.loading= false;
                },
                function(result){
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                    $scope.loading= false;
                }
            )
        };


        $scope.search = function(invoiceID){
            invoiceID = parseInt(invoiceID);
            if(!isNaN(invoiceID)){
                $scope.loading= true;
                $scope.error.flag = false;
                $invoice.get(invoiceID).then(
                    function (result) {
                        $log.log("result");
                        $log.log(result);
                        $scope.loading= false;
                        $scope.invoice = result.invoice;
                        _assignItems(result.invoice.items);
                        $scope.found = true;
                    },
                    function (result) {
                        $scope.loading= false;
                        $scope.found = false;
                        $scope.error.flag = true;
                        $scope.error.message = result.message;
                    });
            } else{
                $scope.error.flag = true;
                $scope.error.message = "Invoice number must be numeric !";
            }

        };



        if (angular.isDefined($routeParams.invoiceID)) {
            var invoiceID = $routeParams.invoiceID;
            $scope.loading= true;
           $scope.search(invoiceID);
        }



    }
]);


