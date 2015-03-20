AppModule.controller("CreateInvoiceController", [
    "$scope", "$log", "$customer",
    function ($scope, $log, $customer) {

        $scope.customer = "";
        $scope.customers =[];

        $scope.found = false;

        $scope.coordonnate = {
            address: "rue des printemps",
            zip: "60000",
            contry: "france"
        };

        $scope.value = "";

        $scope.onSelect = function ($item, $model, $label) {
            _getCustomer($item);
            $scope.found=true;
        };


        $scope.data = {
            name: ""
        };

        var affectCustomer = function(res){
            $scope.customer = res;
        };

        var _affectListCustomerName = function(customerList){
            $scope.customers =customerList ;
        };


        var _getCustomer = function (customer) {
            $customer.get({customer: customer}).then(
                function (result) {
                    affectCustomer(result.customer);
                },
                function (result) {
                    //TODO :
                });
        };

        var _getAllCustomerName = function () {
            $customer.getAllName().then(
                function (result) {
                    $log.log(result.list);
                    _affectListCustomerName(result.list);
                },
                function (result) {
                    //TODO :
                });
        };

        _getAllCustomerName();





    }]);
