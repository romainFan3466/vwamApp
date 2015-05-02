//TODO : Washingapp , confirm remove ,and edit
/**
 * @ngdoc controller
 * @name appModule.controller:EditItemController
 * @require $scope
 * @require $item
 * @require $routeParams
 *
 * @description
 *
 * Interacts with template : "editItem.view.html"
 */
AppModule.controller("EditItemController", [
    "$scope", "$log", "$item","$routeParams",
    function ($scope, $log, $item_app, $routeParams) {

        $scope.item = {};
        $scope.items =[];
        $scope.itemPrev ={};
        var _itemTemp;

        var _init = function(){
            $scope.found=false;
            $scope.loading= false;
            $scope.edited=false;
            $scope.deleted=false;
            $scope.errorDelete = false;
            $scope.doublon = false;
            $scope.editor = false;
        };


        $scope.onSelect = function ($item, $model, $label) {
            $scope.item = angular.copy($item);
            _itemTemp = angular.copy($scope.item);
            _init();
            $scope.found= true;
        };


        $scope.resetChange = function(){
            $scope.item = angular.copy(_itemTemp);
        };


        $scope.update = function(item){
            $scope.loading=true;
            if(!_isPresent(item.name)){

                $item_app.update(item).then(
                    function(res){
                        _init();
                        $scope.edited=true;
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
                    _init();
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


        var _getParamsAndLoadItem = function(){
            if (angular.isDefined($routeParams.itemID)) {
                var itemID = $routeParams.itemID;
                angular.forEach($scope.items, function(value){
                   if(value.ID == itemID){
                       $scope.item = angular.copy(value);
                       _itemTemp = angular.copy(value);
                       $scope.editor = false;
                       $scope.found=true;
                   }
                });
            }
            $scope.loading = false;
        };


        var _getAllItems = function () {
            $scope.loading = true;
            $item_app.getAll().then(
                function (result) {
                    $log.log(result.list);
                    $scope.items=[];
                    $scope.items =result.list;
                    _getParamsAndLoadItem();
                },
                function (result) {
                    $log.log("error getAllname");
                });
        };

        _init();
        _getAllItems();





    }]);

