/**
 * @ngdoc controller
 * @name appModule.controller:GenerateInvoiceController
 * @require $scope
 *
 * @description
 *
 ** Interacts with template : "generateInvoice.view.html"
 */
AppModule.controller("GenerateInvoiceController", [
    "$scope", "$log","$customer","$invoice","$translate",
    function ($scope, $log, $customer, $invoice, $translate) {
        $scope.date = {
            today : "",
            oneMonth : "",
            twoMonth : "",
            checked : "oneMonth"
        };
        $scope.customer = {};
        $scope.customers = [];

        $scope.openedTo = false;
        $scope.openedFrom=false;
        $scope.loading=false;
        $scope.found=false;
        $scope.addSuccess = false;

        $scope.customerChoice = "one";
        $scope.now = new Date();

        $scope.tempCustomer = "";


        var _init = function(){
            $scope.date.today = new Date();
            var d = new Date();
            d.setMonth(d.getMonth()-1);
            $scope.date.oneMonth = d;
            var e = new Date();
            e.setMonth(e.getMonth()-2);
            $scope.date.twoMonth = e;
        };

        var _getCustomer = function (customer) {
            $scope.loading=true;
            $customer.get(customer.name).then(
                function (result) {
                    $scope.loading=false;
                    $scope.found=true;
                    $scope.customer = result.customer;
                },
                function (result) {
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                });
        };


        var _getAllCustomerName = function(){
            $customer.getAllNameInAccount().then(
                function(res){
                    $scope.customers = res.list;
                },
                function(res){
                    $log.log(res);
                }
            );
        };

        $scope.onSelectCustomer = function ($item, $model, $label) {
            _getCustomer($item);
        };

        $scope.generateLink = function(ID, type){
            var language = $translate.use();
            if(type=="invoice"){
                return "/php/invoices/pdf/" + ID + "/" + language;
            }
            if(type=="generation"){
                return "/php/generation/id/" + ID + "/" + language;
            }
        };

        $scope.today = function() {
            var d = new Date();
            var today = new Date(d.getFullYear(), d.getMonth(), d.getDate(),0,0,0,0);
            //today = $filter('date')(today, "dd-MMMM-yyyy");

            $scope.limit = Date.parse("March 21, 2015");
            $scope.dt = {
                from :today,
                to : today
            };
            $scope.format ="dd-MMMM-yyyy";
        };


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



        $scope.generate = function(){

            $scope.tempCustomer = angular.copy($scope.customerChoice);

            var clause = {
                from : "",
                to : ""
            };

            $scope.loading = true;

            //PERIOD
            if(angular.equals($scope.date.checked,"oneMonth")){
                clause = {
                    from : $scope.date.oneMonth,
                    to : $scope.date.today
                };
            }
            else if(angular.equals($scope.date.checked,"twoMonth")){
                clause = {
                    from : $scope.date.twoMonth,
                    to : $scope.date.today
                };
            }
            else if(angular.equals($scope.date.checked,"custom")){
                clause = {
                    from: $scope.dt.from,
                    to: $scope.dt.to
                };
            }
            //customer
            if(angular.equals($scope.customerChoice,"one")){
                clause.customerID = $scope.customer.ID;
            }
            else if (angular.equals($scope.customerChoice,"all")){
                //nothing
            }

            $invoice.generate(clause).then(
                function(res){
                    $scope.loading = false;
                    $scope.addedSuccess = true;
                    if(angular.isDefined(res.ID)){
                        $scope.invoiceID = res.ID;
                    }
                    else if(angular.isDefined(res.generation)){
                        $scope.generationID = res.generation;

                    }
                $log.log(res);

                },
                function(res){
                    $scope.loading = false;
                }
            );



        };

        $scope.generateAgain = function(){
            _init();
            $scope.addedSuccess= false;
        };


        _init();
        _getAllCustomerName();
        $scope.today();


    }
]);