/**
 * @ngdoc controller
 * @name appModule.controller:EditItemController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("EditItemController", [
    "$scope", "$log", "$item",
    function ($scope, $log, $item_app) {

        $scope.item = {};
        $scope.items =[];
        $scope.loading=false;
        $scope.found = false;
        $scope.editor=false;
        $scope.edited=false;
        $scope.deleted=false;
        $scope.errorDelete = false;
        $scope.doublon = false;
        $scope.itemPrev ={};
        var _itemTemp;


        $scope.onSelect = function ($item, $model, $label) {
            $scope.item = angular.copy($item);
            _itemTemp = angular.copy($scope.item);
            $scope.found=true;
            $scope.loading= false;
            $scope.edited=false;
            $scope.deleted=false;
            $scope.errorDelete = false;
            $scope.doublon = false;
        };


        $scope.resetChange = function(){
            $scope.item = angular.copy(_itemTemp);
        };


        $scope.update = function(item){
            $scope.loading=true;
            if(!_isPresent(item.name)){
                $item_app.update({item : item}).then(
                    function(res){
                        $scope.loading=false;
                        $scope.edited=true;
                        $scope.editor = false;
                        $scope.retrieved ="";
                        $scope.itemPrev.name = angular.copy($scope.item.name);
                        $scope.item={};
                        $scope.found=false;
                        _getAllItems();
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


        $scope.remove = function(item){
            $scope.loading=true;
            $item_app.delete(item.ID).then(
                function(res){
                    $log.log(res);
                    $scope.loading=false;
                    $scope.deleted=true;
                    _getAllItems();
                    $scope.retrieved ="";
                    $scope.itemPrev.name = angular.copy($scope.item.name);
                    $scope.item={};
                    $scope.found=false;
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


            if(regex.test(_itemTemp.name)){
                return false;
            }

            //look if the name doesn't match with an other item
            else{
                var found = false;
                regex = new RegExp(exp);
                angular.forEach($scope.items, function(item){
                    if(regex.test(item.name)){
                        found = true;
                    }
                });
                return found;
            }
        };


        var _affectListItemName = function(itemList){
            $scope.items=[];
            $scope.items =itemList
        };


        var _getAllItems = function () {
            $item_app.getAll().then(
                function (result) {
                    $log.log(result.list);
                    _affectListItemName(result.list);
                },
                function (result) {
                    $log.log("error getAllname");
                });
        };


        _getAllItems();





    }]);

