/**
 * @ngdoc service
 * @name appModule.service:$item
 * @require $http
 * @require ItemMapper
 * @require $q
 * @require Config
 *
 * @description
 * This service provides all item functionalities from the API.
 *
 *
 */
AppModule.factory('$item',[
    "$http", "ItemMapper", "$q", "$log", "Config",
    function ($http, ItemMapper, $q, $log, Config) {

        /**
         * @ngdoc method
         * @name getAll
         * @methodOf appModule.service:$item
         *
         * @description
         * Get all item data.
         *
         * This method requires you are currently logged.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="getAllExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>Nothing to display, see script.js for method call</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getAllExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$item',
         function($scope, $item) {
           $scope.result = {};
           var affect = function(obj){
                $scope.result=obj;
           };

           var exec = function(){
                $item.getAll().then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           // call exec function to retrieve data. Do not forget you must be logged before use it.
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if user is logged, and items are existing in his account, method promises as
         * a success an object like :
         *
         *<pre>
         var result = {
                    list: [ItemMapper, ItemMapper, ...],
                    message: "Item created successfully"
                };
         *</pre>
         * Go to see {@link appModule.object:ItemMapper ItemMapper} for more information.
         *
         * - Otherwise, if there is any error, method will promise the result from server.
         * Go to see {@link http://doc.romainfanara.com/#/washing-api API} to know the returns.
         * <pre>
               var result ={
                    "message": "Unauthorized access, need to login in"
                };
         </pre>
         */
        var _getAll = function(){
            var deferred = $q.defer();

            $http
                .post(Config.baseUrl + '/php/items/all',{})
                .success(function (res) {
                    var list =[];
                    angular.forEach(res, function(value){
                        var item = new ItemMapper(value);
                        item.setDescription();
                        list.push(item);
                    });
                    deferred.resolve( {list : list});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name add
         * @methodOf appModule.service:$item
         * @param {Object} item Item data to add. See description.
         * @description
         * Add a item.
         *
         * This method requires you are currently logged.
         *
         * You must provide an object representing a item following the format below :
          <pre>
               var item = {
                    name : "name of item",
                    type : "Inside/Outside/Others",
                   price : 345.50
                   };
          </pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="addExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>Nothing to display, see script.js for method call</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('addExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$item',
         function($scope, $item) {
           var item = {
                      name : "name of item",
                      type : "Inside/Outside/Others",
                     price : 345.50
                     };
           $scope.result = {};
           var affect = function(obj){
                $scope.result=obj;
           };

           var exec = function(){
                $item.add(item).then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           // call exec function to add item. Do not forget you must be logged before use it.
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and item added successfully,
         * method promises as a success an object like :
         *
         *<pre>
                var result = {
                    status: "success",
                    message: "Item created successfully"
                };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as an error like :
         *
         *<pre>
                var result = {
                    message : "An Item with the provided name already exists!"
                };
         *</pre>
         */
        var _add = function(item){
            var deferred = $q.defer();
            var parsedItem = new ItemMapper(item);

            $http
                .post(Config.baseUrl + '/php/items/add',{item:parsedItem})
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res, status){
                    var response = {
                        message : res.message
                    };
                    deferred.reject(response);
                });

            return deferred.promise;
        };



        var _delete = function(itemID){
            var deferred = $q.defer();

            $http
                .delete(Config.baseUrl + '/php/items/' + itemID)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res){
                    var response = {
                        message : res.message
                    };
                    deferred.reject(response);
                });
            return deferred.promise;
        };


        var _update = function(item){
            var deferred = $q.defer();
            var itemParse = new ItemMapper(item);
            $http
                .put(Config.baseUrl + '/php/items', {item : itemParse})
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res){
                    var response = {
                        message : res.message
                    };
                    deferred.reject(response);
                });
            return deferred.promise;
        };


        return {
            getAll : _getAll,
            add : _add,
            delete : _delete,
            update : _update
        };
    }]
);

