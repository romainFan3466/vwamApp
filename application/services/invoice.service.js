/**
 * @ngdoc service
 * @name appModule.service:$invoice
 * @require $http
 * @require InvoiceMapper
 * @require $q
 * @require Config
 * @description
 * This service provides all invoice functionalities from the API.
 *
 * Using this service, you can manage invoice
 */
AppModule.factory('$invoice',[
    "$http", "InvoiceMapper", "$q", "$log", "Config",
    function ($http, InvoiceMapper, $q, $log, Config) {

//TODO : washingapp create doc
        var _add = function(invoice){
            var deferred = $q.defer();
            var parsedInvoice = new InvoiceMapper(invoice);
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


        var _get = function(invoiceID){
            var deferred = $q.defer();

            $http
                .post(Config.baseUrl + '/php/invoices/' + invoiceID, {})
                .success(function (res) {
                    var invoice = new InvoiceMapper(res.invoice);
                    deferred.resolve({invoice : invoice});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };

        var _getAll = function(dateFrom, dateTo, customerID){
            var deferred = $q.defer();

            var objRequest = {
                from : dateFrom,
                to : dateTo
            };

            if(angular.isDefined(customerID) && !angular.equals(customerID,"")){
                objRequest.customerID = parseInt(customerID);
            }

            $http
                .post(Config.baseUrl + '/php/invoices/all' , objRequest)
                .success(function (res) {
                    var invoices = [];
                    angular.forEach(res.list, function(value){
                        var invoice = new InvoiceMapper(value);
                        invoices.push(invoice);
                    });

                    deferred.resolve({invoice : invoice});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        return {
            add : _add,
            get : _get,
            getAll : _getAll
        };


    }
]);