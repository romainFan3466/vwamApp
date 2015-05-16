/**
 * @ngdoc controller
 * @name appModule.controller:ListInvoiceController
 * @require $scope
 * @require $customer
 * @require $filter
 * @require $invoice
 *
 * @description
 *
 * Interacts with template : "listInvoice.view.html"
 *
 */

//TODO washingapp disable button refund for amount <=0 , idem for refund template
AppModule.controller("ListInvoiceController", [
    "$scope", "$log", "$customer","$filter", "$invoice","$translate",
    function ($scope, $log, $customer, $filter, $invoice, $translate) {

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.now = new Date();
        $scope.invoiceIDInput = {
            checked : false
        };
        $scope.invoice = {
            ID : ""
        };
        $scope.retrieved= {
            customer : ""
            };

        $scope.invoiceType = {
            invoice : true,
            receipt : true
        };

        $scope.bigTotalItems = 0;

        $scope.offsetReq = 0;
        $scope.limitReq = 15;

        $scope.invoices = [];

        $scope.customers = [];
        $scope.customer = {};
        $scope.loading=false;
        $scope.active = {
            ID : false,
            customerName : false,
            created : false,
            totalPrice : false,
            type : false
        };

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

        var  _setActive = function(predicate){
          angular.forEach($scope.active,function(value,key){
              $scope.active[key]=(key==predicate);
          });
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
            $scope.format = $scope.formats[0];
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

        $scope.generateLink = function(invoiceID){
          var language = $translate.use();
            return "/php/invoices/pdf/" + invoiceID + "/" + language;
        };

        $scope.isRefundable = function(invoice){
          return (angular.equals(invoice.type, "Invoice") && parseFloat(invoice.totalPrice)>0);
        };


        $scope.onSelectCustomer = function ($item, $model, $label) {
            _getCustomer($item);
        };



        $scope.search = function(){
            $scope.loading = true;
            if($scope.invoiceIDInput.checked &&
            !angular.equals($scope.invoice.ID,"")){

                $invoice.get($scope.invoice.ID).then(
                    function(res){
                        $scope.invoices= [];
                        $scope.invoices.push(res.invoice);
                        $scope.loading = false;
                    },
                    function(res){
                        $log.log(res);
                        $scope.loading = false;
                    }
                );

            }
            else{
                var clause = {
                    from : $scope.dt.from,
                    to : $scope.dt.to,
                    invoiceType : $scope.invoiceType
                };

                if(angular.isDefined($scope.customer.ID) &&
                    angular.isDefined($scope.retrieved.customer.ID)){
                    clause.customerID = $scope.customer.ID;
                }

                $invoice.getAll(clause).then(
                    function(res){
                        $scope.bigTotalItems = res.nbTotalInvoices;
                        $scope.invoices=[];
                        $scope.invoices = res.list;
                        $scope.loading = false;
                    }
                );
            }
        };

        $scope.sortTotalPrice = function(invoice){
          return parseFloat(invoice.totalPrice);
        };


        $scope.order = function(predicate, reverse) {
            if(predicate==='totalPrice'){
                $scope.invoices = $filter('orderBy')($scope.invoices, $scope.sortTotalPrice, reverse);
            }else {
                $scope.invoices = $filter('orderBy')($scope.invoices, predicate, reverse);
            }
            (predicate=='customer.name')? _setActive('customerName') : _setActive(predicate);
        };

        $scope.order('created',true);


        $scope.pageChanged = function(pageNo) {
            $scope.limitReq =  pageNo*15;
            $scope.offsetReq = (pageNo*15)-15;
        };



        _getAllCustomerName();

        $scope.today();
    }
]);
