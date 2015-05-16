/**
 * @ngdoc service
 * @name appModule.service:$invoice
 * @require $http
 * @require InvoiceMapper
 * @require $q
 * @require Config
 * @require $filter
 * @description
 * This service provides all invoice functionalities from the API.
 *
 * Using this service, you can manage invoice
 */
AppModule.factory('$invoice',[
    "$http", "InvoiceMapper", "$q", "$log", "Config","$filter",
    function ($http, InvoiceMapper, $q, $log, Config, $filter) {


        /**
         * @ngdoc method
         * @name add
         * @methodOf appModule.service:$invoice
         *
         * @description
         * This method add an invoice.
         *
         * You must send an object like described in the live example.
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         *
         <example module="addExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('addExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$invoice',
         function($scope, $invoice) {
           $scope.invoice = {
                  "created": new Date(),
                  "customer" : {
                    "ID" : "85"
                  },
                  "matriculation" : {
                    "first" : "SDF E44",
                    "second" : "SD34 56"
                  },
                  "items" : [
                    {
                      "item" :{
                        "ID" : 17
                      },
                      "quantity" : 2
                    },
                    {
                      "item" :{
                        "ID" : 20
                      },
                      "quantity" : 2
                    },
                    {
                      "item" :{
                        "ID" : 22
                      },
                      "quantity" : 3
                    },
                    {
                      "item" :{
                        "ID" : 6
                      },
                      "quantity" : 1
                    },
                    {
                      "item" :{
                        "ID" : 9
                      },
                      "quantity" : 1
                    }],
                    "comment" : "This comment must appear on the invoice"
                };

           var add = function(){
                $invoice.add($scope.invoice).then(
                    function(result){
                        $scope.invoiceID=result.ID;
                    },
                    function(result){
                        $scope.error = result;
                    });
           };
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if user is logged, items ID and customer ID exist in his account, method promises as
         * a success an object like :
         *
         *<pre>
         var result = {
                "status": "success",
                "message": "Invoice and rows added successfully",
                "ID": 97
         };
         *</pre>
         * where the server returns the invoice ID related the created invoice.
         *
         * - Otherwise, if there is any error, method will promise as error an object like :
         *
         *  *<pre>
         var result = {
             "success": false,
             "message": "..."
         };
         *</pre>
         * See {@link http://doc.romainfanara.com/#/washing-api API} to know error result
         */
        var _add = function(invoice){
            var deferred = $q.defer();
            var parsedInvoice = new InvoiceMapper(invoice);
            parsedInvoice.setDateNow();
            $http
                .post(Config.baseUrl + '/php/invoices/add',{invoice : parsedInvoice})
                .success(function (res) {
                    deferred.resolve({ID : res.ID});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });
            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name get
         * @methodOf appModule.service:$invoice
         *
         * @description
         * This method allows to get an invoice by a given ID.
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         *
         <example module="getExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$invoice',
         function($scope, $invoice) {
           $scope.invoice = [];

           var get = function(){
                $invoice.add($scope.invoice).then(
                    function(result){
                        $scope.invoice=result.invoice;
                    },
                    function(result){
                        $scope.error = result;
                    });
           };
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if user is logged, and invoice ID exists, method promises as
         * a success an object like :
         *
         *<pre>
         var result = {
                "status": "success",
                "invoice": InvoiceMapper
         };
         *</pre>
         * where the server returns the invoice wrapped into an {@link appModule.object:InvoiceMapper InvoiceMapper} object.
         *
         * - Otherwise, if there is any error, method will promise as error an object like :
         *
         *  *<pre>
         var result = {
                 "status": "error",
                 "message": "no invoice with a such ID exist for the user logged "
            };
         *</pre>
         * See {@link http://doc.romainfanara.com/#/washing-api API} to know error result
         */
        var _get = function(invoiceID){
            var deferred = $q.defer();

            $http
                .post(Config.baseUrl + '/php/invoices/id/' + invoiceID, {})
                .success(function (res) {
                    var invoice = new InvoiceMapper(res.invoice);
                    deferred.resolve({invoice : invoice});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name getAll
         * @methodOf appModule.service:$invoice
         *
         * @description
         * This method allows to get all invoices related to the given clause object
         *
         * You must give an object like :
         *<pre>
         var clause = {
                from : Date,
                to : Date,
                [offset : Integer ],
                [limit : Integer ],
                [customerID : Integer ],
         };
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see how to call method
         * and what are the server results.
         * @example
         *
         <example module="getAllExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getAllExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$invoice',
         function($scope, $invoice) {
           $scope.clause = {
                from : Date.parse("2014-04-02 00:00:00"),
                to : Date.parse("2014-04-06 00:00:00")
           };

           var getAll = function(){
                $invoice.getAll($scope.clause).then(
                    function(result){
                        $scope.invoices=result.list;
                    },
                    function(result){
                        $scope.error = result;
                    });
           };
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if user is logged, and invoice ID exists, method promises as
         * a success an object like :
         *
         *<pre>
         var result = {
                "status": "success",
                "list": [ InvoiceMapper, InvoiceMapper,..]
            };
         *</pre>
         * where the server returns the invoices wrapped into an {@link appModule.object:InvoiceMapper InvoiceMapper} object.
         */
        var _getAll = function(clause){
            var deferred = $q.defer();
            
            var dateFrom = new Date(clause.from);
            var dateTo = new Date(clause.to);

            $log.debug(clause);

            var objRequest = {
                from : new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate(),0,0,0,0),
                to : new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(),23,59,59,0)
            };

            objRequest.from = $filter('date')(objRequest.from, "yyyy-MM-dd HH:mm:ss");
            objRequest.to = $filter('date')(objRequest.to, "yyyy-MM-dd HH:mm:ss");

            objRequest.invoiceType = clause.invoiceType;

            if(angular.isDefined(clause.offset)){
                objRequest.offset = parseInt(clause.offset);
            }

            if(angular.isDefined(clause.limit)){
                objRequest.limit = parseInt(clause.limit);
            }

            if(angular.isDefined(clause.customerID) && !angular.equals(clause.customerID,"")){
                objRequest.customerID = parseInt(clause.customerID);
            }

            $http
                .post(Config.baseUrl + '/php/invoices/all' , {clause : objRequest})
                .success(function (res) {
                    var invoices = [];
                    angular.forEach(res.list, function(value){
                        var invoice = new InvoiceMapper(value);
                        invoices.push(invoice);
                    });

                    deferred.resolve({list : invoices, nbTotalInvoices : res.nbTotalInvoices});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };







        var _generate = function(clause){
            var deferred = $q.defer();

            var dateFrom = new Date(clause.from);
            var dateTo = new Date(clause.to);

            $log.debug(clause);
            var d = new Date();
            var objRequest = {
                from : new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate(),0,0,0,0),
                to : new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(),23,59,59,0),
                created : new Date()
            };


            objRequest.from = $filter('date')(objRequest.from, "yyyy-MM-dd HH:mm:ss");
            objRequest.to = $filter('date')(objRequest.to, "yyyy-MM-dd HH:mm:ss");
            objRequest.created = $filter('date')(objRequest.created, "yyyy-MM-dd HH:mm:ss");

            if(angular.isDefined(clause.customerID)){
                objRequest.customerID = clause.customerID;
            }

            $http
                .post(Config.baseUrl + '/php/invoices/generate' , {clause : objRequest})
                .success(function (res) {

                    if(angular.isDefined(res.ID)){
                        deferred.resolve({ID : res.ID});
                    }
                    else if(angular.isDefined(res.generationID)){
                        deferred.resolve({generation : res.generationID});
                    }

                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        return {
            add : _add,
            get : _get,
            getAll : _getAll,
            generate : _generate
        };


    }
]);