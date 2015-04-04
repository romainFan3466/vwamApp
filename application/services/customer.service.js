

/**
 * @ngdoc service
 * @name appModule.service:$customer
 * @require $http
 * @require CustomerMapper
 * @require $q
 * @require Config
 *
 * @description
 * This service provides all customer functionalities from the API.
 *
 * Using this service, you can manage customer of the logged user and allows to retrieve data from server.
 *
 *
 */
AppModule.factory('$customer',[
    "$http", "CustomerMapper", "$q", "$log","Config",
    function ($http, CustomerMapper, $q, $log, Config) {

        /**
         * @ngdoc method
         * @name get
         * @methodOf appModule.service:$customer
         * @param {string} customerName customer's name to provide
         *
         * @description
         * Get a customer data from a provided name
         *
         * This method requires you are currently logged.
         *
         * You must provide a customer's name.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="getExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>Nothing to display, see script.js for method call</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
           $scope.result = {};
           var affect = function(obj){
                $scope.result=obj;
           };

           var exec = function(){
                $customer.get("RH haulage").then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           // call exec function to retrieve data. Do not forget you must be logged before.
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and customer exists,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                customer : CustomerMapper;
                };
         *</pre>
         *
         * See {@link appModule.CustomerMapper CustomerMapper} for more information.
         *
         * - Otherwise, if there is any error, method will promises an object as error like:
         *
         *<pre>
         var result = {
                    message : "no customer with a such name for the logged user"
         };
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} for more information
         */
        var _get = function(customerName){
            var deferred = $q.defer();
            var objRequest = {
                customer : {
                    name : customerName
                }
            };
            $http
                .post(Config.baseUrl + '/php/customers',objRequest)
                .success(function (res) {
                    var customer = new CustomerMapper(res.customer);
                    deferred.resolve( {customer : customer});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };

        /**
         * @ngdoc method
         * @name getByID
         * @methodOf appModule.service:$customer
         * @param {string} customerID customer's ID to provide
         *
         * @description
         * Get a customer data from a provided ID
         *
         * This method requires you are currently logged.
         *
         * You must provide a customer's ID.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="getByIDExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>Nothing to display, see script.js for method call</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getByIDExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
           $scope.result = {};
           var affect = function(obj){
                $scope.result=obj;
           };

           var exec = function(){
                $customer.get(15).then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           // call exec function to retrieve data. Do not forget you must be logged before.
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and customer exists,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                customer : CustomerMapper;
                };
         *</pre>
         *
         * See {@link appModule.CustomerMapper CustomerMapper} for more information.
         *
         * - Otherwise, if there is any error, method will promises an object as error like:
         *
         *<pre>
         var result = {
                    message : "no customer with a such ID for the logged user"
         };
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} for more information
         */
        var _getByID = function(customerID){
            var deferred = $q.defer();
            $http
                .post(Config.baseUrl + '/php/customers/id/' + customerID,{})
                .success(function (res) {
                    var customer = new CustomerMapper(res.customer);
                    deferred.resolve(customer);
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name getAllName
         * @methodOf appModule.service:$customer
         *
         * @description
         * Get all customers' name
         *
         * This method requires you are currently logged.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         *
         <example module="getAllNameExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getAllNameExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
           $scope.customers = [];
           $scope.error = "";

           var getAllName = function(){
                $customer.getAllName().then(
                    function(result){
                        $scope.customers=result;
                    },
                    function(result){
                        $scope.error = result;
                    });
           };
           //call getAllName function to retrieve all customer name.
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if user is logged, and customers are existing in his account, method promises as
         * a success an object like :
         *
         *<pre>
         var result = {
                    list: [
                            CustomerMapper({name : "name1}),
                            CustomerMapper({name : "name2}),
                            CustomerMapper({name : "name2}),
                            ...
                          ]
         };
         *</pre>
         * Go to see {@link appModule.object:CustomerMapper CustomerMapper} for more information.
         *
         * - Otherwise, if there is any error, method will promise as error an object like :
         *
         *  *<pre>
         var result = {
                    message : "Unauthorized access, need to login in"
         };
         *</pre>
         */
        var _getAllName = function(){
            var deferred = $q.defer();
            $http
                .post(Config.baseUrl + '/php/customers/all',{})
                .success(function (res) {
                    var list =[];
                    angular.forEach(res, function(value){
                        var customer = new CustomerMapper(value);
                        list.push(customer);
                    });
                    deferred.resolve({list : list});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name add
         * @methodOf appModule.service:$customer
         * @param {Object} customer Customer object. See description
         * @description
         * Add a customer providing an object with specific data.
         *
         * This method requires you are currently logged.
         *
         * You must provide an object representing a customer within the following format :
           <pre>
               var customer = {
                    name : "nameofCustomer",
                    address : "2 avenue of my customer",
                    country : "CountryOfCustomer",
                    phone : "445556655"
                };
           </pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="addExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('addExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
            var customer = {
                name : "nameofCustomer",
                address : "2 avenue of my customer",
                country : "CountryOfCustomer",
                phone : "445556655"
            };
           $scope.result = "";

           var add = function(){
                $customer.add(customer).then(
                    function(result){
                        $scope.result=result;
                    },
                    function(result){
                        $scope.result = result;
                    });
           };
           //call add function to add customer on server
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and customer added successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    status: "success",
                    message: "Customer created successfully"
                };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as an error like :
         *
         *<pre>
         var result = {
                    message : "A Customer with the provided name already exists!"
                };
         *</pre>
         */
        var _add = function(customer){
            var deferred = $q.defer();
            var parsedCustomer = new CustomerMapper(customer);

            $http
                .post(Config.baseUrl + '/php/customers/add',{customer:parsedCustomer})
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name delete
         * @methodOf appModule.service:$customer
         * @param {String} customerID Customer ID.
         * @description
         * Delete a customer providing his ID.
         *
         * This method requires you are currently logged.
         *
         * You must provide an String variable representing a customer ID.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="deleteExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('deleteExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
           var customerID = "1567";
           $scope.result = "";

           var _delete = function(){
                $customer.delete(customerID).then(
                    function(result){
                        $scope.result=result;
                    },
                    function(result){
                        $scope.result = result;
                    });
           };
           //call _delete function to delete customer from server
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and customer deleted successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    status: "success",
                    message: "Customer deleted successfully"
                };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as an error like :
         *
         *<pre>
         var result = {
                    message : "the customer to deleted with the provided ID doesn't exist!"
                };
         *</pre>
         */

        var _delete = function(customerID){
            var deferred = $q.defer();

            $http
                .delete(Config.baseUrl + '/php/customers/'+ customerID)
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


        /**
         * @ngdoc method
         * @name update
         * @methodOf appModule.service:$customer
         * @param {String} customer Customer ID.
         * @description
         * Update a customer providing his ID and all information that you wish to update.
         *
         * This method requires you are currently logged.
         *
         * You must provide an object representing a customer within the following format :
           <pre>
               var customer = {
                    ID   : "1233",
                    name : "nameofCustomer",
                    address : "2 avenue of my customer",
                    country : "CountryOfCustomer",
                    phone : "445556655"
                };
           </pre>
         *
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         <example module="updateExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('updateExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$customer',
         function($scope, $customer) {
            var customer = {
                ID  : "123444",
                name : "nameofCustomer",
                address : "2 avenue of my customer",
                country : "CountryOfCustomer",
                phone : "445556655"
            };
           $scope.result = "";

           var add = function(){
                $customer.update(customer).then(
                    function(result){
                        $scope.result=result;
                    },
                    function(result){
                        $scope.result = result;
                    });
           };
           //call add function to add customer on server
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, user logged, and customer updated successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    message: "Customer changed successfully"
                };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as an error like :
         *
         *<pre>
         var result = {
                    message : "the customer to change with the provided ID doesn't exist!"
                };
         *</pre>
         */
        var _update = function(customer){
            var deferred = $q.defer();
            var request = {
                customer : new CustomerMapper(customer)
            };

            $http
                .put(Config.baseUrl + '/php/customers', request)
                .success(function(res){
                    deferred.resolve({message : res.message});
                })
                .error(function(res, status){
                    var response = {
                        message : res.message
                    };
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        var _test = function(){
          return 4;
        };

        return {
            get : _get,
            getByID : _getByID,
            getAllName : _getAllName,
            add : _add,
            delete : _delete,
            update : _update
        };
    }]
);

