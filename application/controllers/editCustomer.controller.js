/**
 * @ngdoc controller
 * @name appModule.controller:EditCustomerController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("EditCustomerController", [
    "$scope", "$log", "$customer",
    function ($scope, $log, $customer) {

        $scope.customer = {};
        $scope.customers =[];
        $scope.loading=false;
        $scope.found = false;
        $scope.editor=false;
        $scope.edited=false;
        $scope.deleted=false;
        $scope.errorDelete = false;
        $scope.doublon = false;
        var _customerTemp;


        $scope.onSelect = function ($item, $model, $label) {
            $scope.loading= true;
            _getCustomer($item);
            $scope.found=true;
        };


        $scope.resetChange = function(){
            $scope.customer = angular.copy(_customerTemp);
        };


        $scope.update = function(customer){
            $scope.loading=true;
            if(!_isPresent(customer.name)){
                $customer.update({customer : customer}).then(
                    function(res){
                        $scope.loading=false;
                        $scope.edited=true;
                        _getAllCustomerName();
                    },
                    function(res){
                        $scope.loading=false;
                    }
                );
            }
            else{
                $scope.loading=false;
                $scope.doublon = true;
            }

        };


        $scope.remove = function(customer){
            $scope.loading=true;
            $customer.delete(customer.ID).then(
                function(res){
                    $log.log(res);
                    $scope.loading=false;
                    $scope.deleted=true;
                    _getAllCustomerName();
                    $scope.customer={};
                },
                function(res){
                    $scope.loading=false;
                    $scope.errorDelete=false;

                }
            );
        };


        var _isPresent = function(name){
            // unchanged name
            var exp = "^" + name + "$";
            var regex = new RegExp(exp,"i");


            if(regex.test(_customerTemp.name)){
                return false;
            }

            //look if the name doesn't match with an other customer
            else{
                var found = false;
                regex = new RegExp(exp);
                angular.forEach($scope.customers, function(customer){
                    if(regex.test(customer.name)){
                        found = true;
                    }
                });
               return found;
            }
        };


        var affectCustomer = function(res){
            $scope.customer = res;
            _customerTemp = angular.copy($scope.customer);
        };


        var _affectListCustomerName = function(customerList){
            $scope.customers=[];
            $scope.customers =customerList
        };


        var _getCustomer = function (customer) {
            $customer.get(customer.name).then(
                function (result) {
                    $scope.loading= false;
                    affectCustomer(result.customer);
                },
                function (result) {
                    $scope.loading= false;
                });
        };


        var _getAllCustomerName = function () {
            $customer.getAllName().then(
                function (result) {
                    _affectListCustomerName(result.list);
                },
                function (result) {
                    $log.log("error getAllname");
                });
        };


        _getAllCustomerName();





    }]);
