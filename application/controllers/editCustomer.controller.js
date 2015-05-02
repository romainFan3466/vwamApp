/**
 * @ngdoc controller
 * @name appModule.controller:EditCustomerController
 * @require $scope
 * @require $customer
 * @require $routeParams
 *
 * @description
 * Interacts with template : "editCustomer.view.html"
 *
 */
AppModule.controller("EditCustomerController", [
    "$scope", "$log", "$customer","$routeParams","$modal",
    function ($scope, $log, $customer, $routeParams, $modal) {

        $scope.customer = {};
        $scope.customers =[];

        var _customerTemp;

        var _init = function(){
            $scope.found=false;
            $scope.loading= false;
            $scope.edited=false;
            $scope.deleted=false;
            $scope.errorDelete = false;
            $scope.doublon = false;
            $scope.editor = false;
        };

        var affectCustomer = function(res){
            $scope.customer = res;
            _customerTemp = angular.copy($scope.customer);
        };


        if (angular.isDefined($routeParams.customerID)) {
            var customerID = $routeParams.customerID;
            $scope.loading= true;
            $customer.getByID(customerID).then(
                function (result) {
                    $log.log("result");
                    $log.log(result);
                    $scope.found=true;
                    $scope.loading= false;
                    affectCustomer(result.customer);
                },
                function (result) {
                    $scope.loading= false;
                    $log.log("error");
                });

        }


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
                $customer.update(customer).then(
                    function(res){
                        _init();
                        $scope.edited=true;
                        $scope.tempName = $scope.customer.name;
                        $scope.customer={};
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


        var _remove = function(customer){
            $scope.loading=true;
            $customer.delete(customer.ID).then(
                function(res){
                    $log.log(res);
                    _init();
                    $scope.deleted=true;
                    _getAllCustomerName();
                    $scope.tempName = $scope.customer.name;
                    $scope.customer={};
                },
                function(res){
                    $scope.loading=false;
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
            $scope.loading= true;
            $customer.getAllName().then(
                function (result) {
                    _affectListCustomerName(result.list);
                    $scope.loading= false;
                },
                function (result) {
                    $scope.loading= false;
                    $log.log("error getAllname");
                });
        };


        $scope.remove = function (customer) {

            var modalInstance = $modal.open({
                templateUrl: 'html/templates/modalConfirmation.template.html',
                controller: 'ModalConfirmationController',
                size : 'sm',
                resolve: {
                    message: function () {
                        return "Are you sure to delete this customer ?";
                    }
                }
            });

            modalInstance.result.then(function (val) {
                _remove(customer);
            }, function () {
            });
        };

        _init();
        _getAllCustomerName();





    }]);

