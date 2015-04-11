/**
 * @ngdoc controller
 * @name appModule.controller:ListInvoiceController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("ListInvoiceController", [
    "$scope", "$log", "$customer",
    function ($scope, $log, $customer) {

        $scope.now = new Date();
        $scope.invoiceIDInput = {
            checked : false
        };
        $scope.invoice = {
            ID : ""
        };

        $scope.invoices = [];

        $scope.customers = [];
        $scope.customer = {};

        var _getCustomer = function (customer) {
            $scope.loading=true;
            $customer.get(customer.name).then(
                function (result) {
                    $scope.loading=false;
                    $scope.customer = result.customer;
                },
                function (result) {
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                });
        };


        var _getAllCustomerName = function(){
            $customer.getAllName().then(
                function(res){
                    $scope.customers = res.list;
                },
                function(res){
                    $log.log(res);
                }
            );
        };



        $scope.today = function() {
            var today = new Date();
            today = today.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
            $scope.limit = Date.parse("March 21, 2012");
            $scope.dt = {
                from :today,
                to : today
            };
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event, string) {
            $event.preventDefault();
            $event.stopPropagation();

           if(string=="to"){
               $scope.openedTo = true;
               $scope.openedFrom=false;
           }
            else if(string=="from"){
                $scope.openedTo = false;
                $scope.openedFrom=true;
            }
        };


        $scope.dateOptions = {
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];







        $scope.onSelectCustomer = function ($item, $model, $label) {
            _getCustomer($item);
        };

        $scope.search = function(){
            if($scope.invoiceIDInput.checked &&
            !angular.equals($scope.invoice.ID,"")){
                $scope.loading = true;
                $invoice.get($scope.invoice.ID).then(
                    function(res){
                        $scope.invoices.clear();
                        $scope.invoices.push(res.invoice);
                        $scope.loading = false;
                    },
                    function(res){
                        $log.log(res);
                    }
                );

            }
            else{
                //TODO washingapp check date available
                $invoice.getAll($scope.dt.from, $scope.dt.to, $scope.customer.ID).then(
                    function(res){
                        $scope.invoices.clear();
                        $scope.invoices = res.list;
                    }
                );
            }
        };


        _getAllCustomerName();

    }
]);
