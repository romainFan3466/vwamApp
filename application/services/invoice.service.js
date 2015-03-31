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


        var cache = {
            authenticated : true
        };

        var _add = function(invoice){
            var deferred = $q.defer();
            $http
                .post(Config.baseUrl + '/php/invoices/add', invoice)
                .success(function (res) {
                    deferred.resolve(res);
                })
                .error(function(res){
                    var response = {
                        status : status,
                        message : res.message
                    };
                    deferred.reject(response);
                });

        };




        var _get = function(invoiceID){
            var deferred = $q.defer();

            $http
                .post(Config.baseUrl + '/php/items/' + invoiceID, {})
                .success(function (res) {
                    var invoice = new InvoiceMapper(res);
                    deferred.resolve(invoice);
                })
                .error(function(res){
                    deferred.reject(res);
                });

            return deferred.promise;
        };


        return {
            add : _add,
            get : _get
        };


    }
]);