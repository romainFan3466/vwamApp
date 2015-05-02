/**
 * @ngdoc controller
 * @name appModule.controller:ListCustomerController
 * @require $scope
 * @require $customer
 * @require $filter
 *
 * @description
 *
 * Interacts with template : "listCustomer.view.html"
 *
 */
AppModule.controller("ListCustomerController", [
    "$scope", "$log", "$customer","$filter",
    function ($scope, $log, $customer, $filter) {

        var _customers = [];
        var _selected = "";
        $scope.customers = [];
        $scope.alphabet = [];
        $scope.alphabet.push("0-9");
        $scope.alphabet = $scope.alphabet.concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
        $scope.inputSearch="";
        $scope.active = {
            name : false,
            city : false,
            country : false,
            accountType : false
        };

        var  _setActive = function(predicate){
            angular.forEach($scope.active,function(value,key){
                $scope.active[key]=(key==predicate);
            });
        };


        $scope.sortArray = function(letter){
            $scope.customers = $filter("firstLetter")(_customers,letter,"name");
            $scope.order("name",false);
            _selected = letter;
        };

        $scope.selected = function(){
            return _selected;
        };

        $scope.$watch('inputSearch', function(value){
            if(angular.isString(value) && !angular.equals(value,"")){
                $scope.customers = $filter("filter")(_customers,value,false);
                $scope.order("name",false);
            }
            else {
                $scope.sortArray(_selected);
                }
            });

        $scope.order = function(predicate, reverse) {
            $scope.customers = $filter('orderBy')($scope.customers, predicate, reverse);
            _setActive(predicate);
        };

        /*$scope.$watchCollection('typeItem', function(value){
            if(angular.isDefined(value)){
                $scope.items = $filter('byType')( _items,value);

                if(angular.isString($scope.itemName)){
                    $scope.items = $filter('filter')($scope.items, $scope.itemName, false);
                }
                $scope.bigTotalItems = $scope.items.length;
            }
        });
        */


        var _getAllCustomers = function(){
            $customer.getAll().then(
                function(res){
                    _customers = res.list;
                    $scope.customers = res.list;
                    $scope.sortArray("A");
                    $scope.order("name",false);
                    $log.log($scope.customers);
                }
            );
        };


        _getAllCustomers();




    }
]);