AppModule.controller("EditCustomerController", [
    "$scope", "$log", "$customer",
    function ($scope, $log, $customer) {

        $scope.customer = "";
        $scope.customers =[];
        $scope.loading=false;
        $scope.found = false;
        $scope.editor=false;
        $scope.edited=false;

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
            $customer.update({customer : customer}).then(
                function(res){
                    $scope.loading=false;
                    $scope.edited=true;
                },
                function(res){
                    $scope.loading=false;
                }
            );
        };

        var affectCustomer = function(res){
            $scope.customer = res;
            _customerTemp = angular.copy($scope.customer);
        };

        var _affectListCustomerName = function(customerList){
            $scope.customers =customerList ;
        };


        var _getCustomer = function (customer) {
            $customer.get({customer: customer}).then(
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
                    //TODO :
                });
        };

        _getAllCustomerName();





    }]);

