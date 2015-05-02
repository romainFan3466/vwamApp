/**
 * @ngdoc controller
 * @name appModule.controller:ListItemController
 * @require $scope
 * @require $item
 * @require $filter
 *
 * @description
 *
 * Interacts with template : "listInvoice.view.html"
 *
 */
AppModule.controller("ListItemController", [
    "$scope", "$log", "$item", "$filter",
    function ($scope, $log, $item, $filter) {

        var _items = [];
        $scope.limitBegin = 0;
        $scope.limitEnd = 15;
        $scope.items= [];
        $scope.itemName="";
        $scope.typeItem = {
            Outside : true,
            Inside : true,
            Other : true
        };

        $scope.active = {
            name : false,
            type : false,
            price : false
        };


        $scope.bigTotalItems=1;

        var _getAllItems = function () {
            $item.getAll().then(
                function (result) {
                    _items = result.list;
                    $scope.items=[];
                    $scope.items =result.list;
                    $scope.bigTotalItems = result.list.length;
                },
                function (result) {
                    $log.log("error getAllname");
                });
        };

        var  _setActive = function(predicate){
            angular.forEach($scope.active,function(value,key){
                $scope.active[key]=(key==predicate);
            });
        };

        $scope.$watch('itemName', function(value){
           if(angular.isString(value)){
               $scope.items = $filter('filter')(_items, value, false);

               if(angular.isDefined($scope.typeItem)){
                   $scope.items = $filter('byType')( $scope.items,$scope.typeItem);
               }
               $scope.bigTotalItems = $scope.items.length;
           }
        });

        $scope.$watchCollection('typeItem', function(value){
            if(angular.isDefined(value)){
                $scope.items = $filter('byType')( _items,value);

                if(angular.isString($scope.itemName)){
                    $scope.items = $filter('filter')($scope.items, $scope.itemName, false);
                }
                $scope.bigTotalItems = $scope.items.length;
            }
        });


        $scope.order = function(predicate, reverse) {
            $scope.items = $filter('orderBy')($scope.items, predicate, reverse);
             _setActive(predicate);
        };



        $scope.pageChanged = function(pageNo) {

                $scope.limitEnd= pageNo*15;
                $scope.limitBegin=(pageNo*15)-15;
        };





        _getAllItems();
    }
]);