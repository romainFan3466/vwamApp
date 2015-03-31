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
    "$scope", "$log", "$customer", "$item","InvoiceMapper",
    function ($scope, $log, $customer, $item_app, InvoiceMapper) {


        /*
         * TODO washingapp :
         * Just send to $invoice:
          *  - customerID,
          *  - array of {item : itemID, quantity : 1}
          *  - matriculation1,
          *  - matriculation2,
          *
          * service function has to return ID of invoice ,
          * and offer a location to the view
          *
          * php : check total price !!!
          *
         */

        $scope.customer = "";
        $scope.customers =[];
        $scope.items = [];
        $scope.item = {};

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
            itemID : ""
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
             invoice = {
                customerID : $scope.customer.ID,
                 matriculation : {
                     first : $scope.matriculation.first,
                     second : $scope.matriculation.second
                 },
                itemID : $scope.item.ID
            };

            var i = new InvoiceMapper(_invoice);


            $log.log(i);
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
            $customer.get(customer.name).then(
                function (result) {
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
