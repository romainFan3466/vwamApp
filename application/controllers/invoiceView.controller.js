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

           /* $scope.invoice={
                ID : 346,
                created : '24/03/2015',
                totalPrice : 700.54,
                // to retrive via ID
                customer : {
                    ID : "145",
                    name : "Dorcheie",
                    address : "4 rue des ",
                    city : "Millas",
                    country : "France",
                    phone : "44435453"
                },
                //to retrieve via $authen ID
                from : {
                    ID : "145",
                    company : "Romain FANARA",
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
                            //retrieve via getall
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
            };*/

            //$scope.invoice= {};



            var _affectItemsIntoInvoice = function(){
                var newItemArray = [];
              angular.forEach($scope.items, function(itemScope){
                 angular.forEach($scope.invoice.items, function(itemInvoice){
                     if(angular.equals(itemInvoice.itemID, itemScope.ID)){

                         newItemArray.push(
                             {
                                 item : itemScope,
                                 quantity : itemInvoice.quantity,
                                 subTotal : itemInvoice.subTotal
                             });
                     }
                 });
              });

                $scope.invoice.items = newItemArray;

            };

            var _getAllItems = function(){
                $item.getAll().then(
                    function(result){
                        $scope.items = result.list;
                        _affectItemsIntoInvoice();
                    },
                    function(result){
                        //TODO : washingapp
                    });
            };

            var _getUserData = function(){
                $authentication.getUserData().then(
                    function(res){
                        $scope.invoice.user = res.user;
                    },
                    function(res){

                    }
                )
            };

            var _getCustomer = function(){
                $customer.getByID($scope.invoice.customerID).then(
                    function(res){
                        $scope.invoice.customer =res;
                    },
                    function(res){

                    }
                );
            };


            var _getInvoice = function (){
                $invoice.get(invoiceID).then(
                    function(res){
                        $scope.invoice=res;
                        _getAllItems();
                        _getUserData();
                        _getCustomer();
                    },
                    function(res){

                    }
                );
            };



            _getInvoice();


            $scope.print = function(){

                $window.print();
            };





        } else {
            $log.error("invoiceID expected as route Params");
        }








    }
]);