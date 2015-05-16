/**
 * @ngdoc controller
 * @name appModule.controller:CreateItemController
 * @require $scope
 * @require $item
 *
 * @description
 * Interacts with template : "createItem.view.html"
 *
 */
AppModule.controller("CreateItemController", [
    "$scope", "$log", "$item",
    function ($scope, $log, $item) {



        var _initialize = function(){
            $scope.item={
                name : "",
                type : "Inside",
                price : ""
            };
            $scope.loading = false;
            $scope.invalidName = false;
            $scope.items = [];
            $scope.error= false;
            $scope.wrongPrice = false;
            $scope.success=false;
            getAllItem();


            $scope.$watch("item.price", function(value){
               if(angular.isDefined(value)){
                   if(!angular.equals(value,"")){
                       $scope.wrongPrice =isNaN(parseFloat(value));
                   }
               }
            });

        };

        var _isValidName = function(item){
            var isValid = true;
            var _items = $scope.items;
            var exp = "^" + item.name + "$";
            var regex = new RegExp(exp,"i");

            angular.forEach(_items,function(value){
                //if names don't match and types don't match
                if(regex.test(value.name) && angular.equals(value.type, item.type)){
                    isValid=false;
                }
            });
            return isValid;
        };



        var _affectListItemName = function(itemList){
            $scope.items =itemList ;
        };



        var getAllItem = function () {
            $item.getAll().then(
                function (result) {
                    $log.log(result.list);
                    _affectListItemName(result.list);
                },
                function (result) {
                });
        };

        var _makeRequest = function(item){


            //TODO washingapp , inform user that his price's wrong ?
            $item.add(item).then(
                function(res){
                    _initialize();
                    $scope.success=true;
                },
                function(res){
                    $scope.error= true;
                });


        };


        $scope.addItem = function (item){
            $scope.loading = true;

            if(_isValidName(item)){
                _makeRequest(item);
            }
            else{
                $scope.invalidName = true;
                $scope.loading = false;
            }

        };

        _initialize();
    }
]);



