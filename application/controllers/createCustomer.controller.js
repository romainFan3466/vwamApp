/**
 * @ngdoc controller
 * @name appModule.controller:CreateCustomerController
 * @require $scope
 * @require $customer
 *
 * @description
 *
 ** Interacts with template : "createCustomer.view.html"
 */
AppModule.controller("CreateCustomerController", [
    "$scope", "$log", "$customer","$country",
    function ($scope, $log, $customer,$country) {



        var _initialize = function(){
            $scope.customer={
                name : "",
                address : "",
                country : "",
                phone : "",
                accountType : "Cash"
            };
            $scope.loading = false;
            $scope.invalidName = false;
            $scope.customers = {};
            $scope.error= false;
            $scope.success=false;
            $scope.loadingLocations = false;
            $scope.phoneCode = "";
            _getAllCustomerName();

        };

        var _isValidName = function(name){
            var isValid = true;
            var _customers = $scope.customers;
            var exp = "^" + name + "$";
            var regex = new RegExp(exp,"i");

            angular.forEach(_customers,function(value){
                if(regex.test(value.name)){
                    isValid=false;
                }
            });
            return isValid;
        };


        var _affectListCustomerName = function(customerList){
            $scope.customers =customerList ;
        };


        var _getAllCustomerName = function () {
            $customer.getAllName().then(
                function (result) {
                    $log.log(result.list);
                    _affectListCustomerName(result.list);
                },
                function (result) {
                });
        };


        var _makeRequest = function(customer){
            customer.phone = $scope.phoneCode + customer.phone;
            $customer.add(customer).then(
                function(res){
                    _initialize();
                    $scope.success=true;
                },
                function(res){
                    $scope.error= true;
                });
        };


        $scope.addCustomer = function (customer){
            $scope.loading = true;

            if(_isValidName(customer.name)){
                _makeRequest(customer);
            }
            else{
                $scope.invalidName = true;
                $scope.loading = false;
            }

        };

        $scope.onSelect = function ($item, $model, $label) {
            $scope.phoneCode = "+" + angular.copy($item.phoneCode) + "(0)";
        };


        $scope.getLocation = function(val){
            return $country.getLocation(val).then(
                function(res){
                    return res;
                }
            );
        };

        _initialize();


    }
]);

