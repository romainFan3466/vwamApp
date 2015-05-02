/**
 * @ngdoc controller
 * @name appModule.controller:CreateInvoiceController
 * @require $scope
 * @require $customer
 * @require $item
 * @require InvoiceMapper
 * @require $invoice
 *
 *
 * @description
 *
 * Interacts with template : "createInvoice.view.html"
 *
 */
AppModule.controller("CreateInvoiceController", [
    "$scope", "$log", "$customer", "$item","InvoiceMapper","$invoice","$filter",
    function ($scope, $log, $customer, $item_app, InvoiceMapper, $invoice, $filter) {


        $scope.customer = "";
        $scope.customers =[];
        $scope.items = [];
        $scope.camera = false;
        $scope.scanned = {
        };


        $scope.error ={
          flag : false,
            message : ""
        };



        $scope.loading=false;
        $scope.addedSuccess = false;


        $scope.found ={
            customer : false,
            item : false
        };

        var _initScope = function(){
            $scope.retrieved = {
                customer : "",
                item : ""
            };
            $scope.item = {};
            $scope.invoice = {
                customer : {},
                matriculation : {
                    first : "",
                    second : ""
                },
                items : [],
                comment : "",
                paymentMode : "Cash",
                created : ""
            };
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

            $scope.loading=true;
            if(angular.isDefined($scope.invoice.matriculation.first )){
                $scope.invoice.matriculation.first = $scope.invoice.matriculation.first.replace(/[\'\"]/g,"");
            } else {
                $scope.invoice.matriculation.first = "";
            }
            
            if(angular.isDefined($scope.invoice.matriculation.second )){
                $scope.invoice.matriculation.second = $scope.invoice.matriculation.second.replace(/[\'\"]/g,"");
            } else {
                $scope.invoice.matriculation.second = "";
            }
            var item ={
              ID : $scope.item.ID
            };
            $scope.invoice.items.push({item : item, quantity : 1});
            $log.debug($scope.invoice);

             $invoice.add($scope.invoice).then(
               function(res){
                   $scope.loading=false;
                   $scope.addedSuccess = true;
                   $scope.invoiceID=res.ID;
                   _initScope();
               },
                 function(res){
                     $scope.error.flag = true;
                     $scope.error.message = result.message;
                 }
             );

        };

        $scope.$watch('scanned', function(value){
            $log.log(value);
            if(angular.isDefined(value) && angular.isDefined(value.ID)){
                _getCustomer(value);
                $scope.found.customer=true;
            }
        });

        $scope.getScan = function(){
            $scope.camera = true;

            $('#reader').html5_qrcode(function(data){
                    //$scope.scanned = JSON.parse(data);
                    $scope.$apply(function(){
                        $scope.scanned = JSON.parse(data);
                    });
                },
                function(error){
                    //show read errors
                }, function(videoError){
                    //the video stream could be opened
                }
            );
        };


        $scope.closeCam = function(){
            $scope.camera=false;
            $('#reader').html5_qrcode_stop();
           /* $scope.$apply(function(){

            });*/

            $("video").remove();
            $("canvas").remove()
        };



        $scope.onSelectCustomer = function ($item, $model, $label) {
            _getCustomer($item);
            $scope.found.customer=true;
        };

        $scope.onSelectItem = function ($item, $model, $label) {
            $scope.item = $item;
            $scope.found.item=true;
        };


        var _getCustomer = function (customer) {
            $scope.loading=true;
            $customer.get(customer.name).then(
                function (result) {
                    $scope.loading=false;
                    $scope.invoice.customer = result.customer;
                    $scope.retrieved.customer = result.customer.name;
                },
                function (result) {
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                });
        };

        var _getAllCustomerName = function () {
            $customer.getAllName().then(
                function (result) {
                    $log.log(result.list);
                    $scope.customers =result.list;
                },
                function (result) {
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                });
        };

        var _getAllItems = function(){
            $item_app.getAll().then(
                function(result){
                    $scope.items= result.list;
                },
                function(result){
                    $scope.error.flag = true;
                    $scope.error.message = result.message;
                });
        };

        _initScope();
        _getAllCustomerName();
        _getAllItems();










    }]);
