/**
 * @ngdoc controller
 * @name appModule.controller:CreateInvoiceController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("CreateInvoiceController", [
    "$scope", "$log", "$customer", "$item","InvoiceMapper","$invoice",
    function ($scope, $log, $customer, $item_app, InvoiceMapper, $invoice) {


        $scope.customer = "";
        $scope.customers =[];
        $scope.items = [];
        $scope.item = {};
        $scope.invoiceID="";

        $scope.loading=false;
        $scope.addedSuccess = false;

        $scope.matriculation={
            first : "",
            second : ""
        };

        $scope.found ={
            customer : false,
            item : false
        };

        var invoice = {
            customerID : "",
            matriculation : {
                first : "",
                second : ""
            },
            items : []
        };

        var _invoice = {
            ID : 346,
            created : '24/03/2015',
            totalPrice : 700.54,
            customer : {
                ID : "145",
                name : "Dorcheie",
                address : "4 rue des ",
                city : "Millas",
                country : "France",
                phone : "44435453"
            },
            from : {
                ID : "145",
                name : "Romain FANARA",
                address : "4 rue des vicking",
                city : "Perpignan",
                country : "France",
                phone : "44435453"
            },
            matriculation : {
                first : "234 DF 45",
                second : "24 DF 34"
            },
            items : [
                {
                    item : {
                        ID : 3455,
                        name : "Truck Wash",
                        type : "Inside",
                        price : 345.56
                    },
                    quantity : 1
                },
                {
                    item : {
                        ID : 3435,
                        name : "Truck Wash",
                        type : "Outside",
                        price : 45.67
                    },
                    quantity : 2
                }
            ]
        };


        $scope.createInvoice = function(){
            var invoice = {
                customerID : "",
                matriculation : {
                    first : "",
                    second : ""
                },
                items : []
            };
            $scope.loading=true;
            invoice.matriculation.first  = angular.copy($scope.matriculation.first);
            invoice.matriculation.second  = angular.copy($scope.matriculation.second);
            invoice.matriculation.first = invoice.matriculation.first.replace(/[\'\"]/g,"");
            invoice.matriculation.second = invoice.matriculation.second.replace(/[\'\"]/g,"");
            var _item = angular.copy($scope.item.ID);
            invoice.items.push({itemID :_item, quantity : 1});
            invoice.customerID = angular.copy($scope.customer.ID);

             $invoice.add(invoice).then(
               function(res){
                   $scope.loading=false;
                   $scope.addedSuccess = true;
                   $scope.invoiceID=res.ID;
               },
                 function(res){
                     $log.log(res);
                 }
             );
            $log.log(invoice);
        };


        $scope.onSelectCustomer = function ($item, $model, $label) {
            _getCustomer($item);
            $scope.found.customer=true;
        };

        $scope.onSelectItem = function ($item, $model, $label) {
            $scope.item = $item;
            $scope.found.item=true;
        };

        var affectCustomer = function(res){
            $scope.customer = res;
        };

        var _affectListCustomerName = function(customerList){
            $scope.customers =customerList ;
        };

        var _affectItemList = function(itemList){
            $scope.items = itemList;
        };


        var _getCustomer = function (customer) {
            $scope.loading=true;
            $customer.get(customer.name).then(
                function (result) {
                    $scope.loading=false;
                    affectCustomer(result.customer);
                },
                function (result) {

                    //TODO : washingapp
                });
        };

        var _getAllCustomerName = function () {
            $customer.getAllName().then(
                function (result) {
                    $log.log(result.list);
                    _affectListCustomerName(result.list);
                },
                function (result) {
                    //TODO : washingapp
                });
        };

        var _getAllItems = function(){
            $item_app.getAll().then(
                function(result){
                   _affectItemList(result.list);
                },
                function(result){
                    //TODO : washingapp
                });
        };

        _getAllCustomerName();
        _getAllItems();





    }]);
