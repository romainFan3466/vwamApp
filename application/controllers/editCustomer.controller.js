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
    "$scope", "$log", "$customer","$routeParams","$modal", "$filter","$country",
    function ($scope, $log, $customer, $routeParams, $modal, $filter,$country) {

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
            $scope.loadingLocations = false;
            $scope.phoneCode = "";
        };

        var affectCustomer = function(res){
            $scope.customer = res;
            var str = res.phone.split(/\)/);
            console.log(str);
            console.log(res.phone);
            $scope.customer.phone = (str.length>1)?str[1]:"";
            $scope.phoneCode= (str.length>1)?str[0]+")":"";
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
            $scope.editor = false;
            $scope.found=true;
        };


        $scope.resetChange = function(){
            $scope.customer = angular.copy(_customerTemp);
        };


        var _update = function(customer){
            $scope.loading=true;
            if(!_isPresent(customer.name)){
                customer.phone = $scope.phoneCode + customer.phone;
                $customer.update(customer).then(
                    function(res){
                        _init();
                        $scope.edited=true;
                        $scope.tempName = $scope.customer.name;
                        $scope.customer={};
                        $scope.retrieved = "";
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
                    $scope.retrieved = "";
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


        $scope.onSelectCountry = function ($item, $model, $label) {
            $scope.phoneCode = "+" + angular.copy($item.phoneCode) + "(0)";
        };


        $scope.getLocation = function(val){
            return $country.getLocation(val).then(
                function(res){
                    return res;
                }
            );
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
                        return $filter('translate')('customer.confirmation_deletion');
                    }
                }
            });

            modalInstance.result.then(function (val) {
                _remove(customer);
            }, function () {
            });
        };

        $scope.update = function (customer) {

            var modalInstance = $modal.open({
                templateUrl: 'html/templates/modalConfirmation.template.html',
                controller: 'ModalConfirmationController',
                size : 'sm',
                resolve: {
                    message: function () {
                        return $filter('translate')('customer.confirmation_update');
                    }
                }
            });

            modalInstance.result.then(function (val) {
                _update(customer);
            }, function () {
            });
        };

        _init();
        _getAllCustomerName();





    }]);

