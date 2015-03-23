AppModule.factory('$customer',[
    "$http", "CustomerMapper", "$q", "$log",
    function ($http, CustomerMapper, $q, $log) {

        /**
         *
         * @param customerName
         * @returns {Deferred.promise|*|promise|Q.promise|fd.g.promise|qFactory.Deferred.promise}
         * @private
         */
        var _get = function(customerName){
            var deferred = $q.defer();

            $http
                .post('/php/customer',customerName)
                .success(function (res) {
                    var customer = new CustomerMapper(res);
                    deferred.resolve( {customer : customer});
                })
                .error(function(res){
                    deferred.reject({message : res});
                });

            return deferred.promise;
        };


        /**
         *
         * @returns {Deferred.promise|*|promise|Q.promise|fd.g.promise|qFactory.Deferred.promise}
         * @private
         */
        var _getAllName = function(){
            var deferred = $q.defer();

            $http
                .post('/php/customer/all',{})
                .success(function (res) {
                    var list =[];
                    angular.forEach(res, function(value){
                        var customer = new CustomerMapper(value);
                        list.push(customer);
                    });
                    deferred.resolve( {list : list});
                })
                .error(function(res){
                    deferred.reject({message : res});
                });

            return deferred.promise;
        };


        /**
         *
         * @param customer
         * @returns {Deferred.promise|*|promise|Q.promise|fd.g.promise|qFactory.Deferred.promise}
         * @private
         */
        var _add = function(customer){
            var deferred = $q.defer();
            var parsedCustomer = new CustomerMapper(customer);

            $http
                .post('/php/customer/add',{customer:parsedCustomer})
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res, status){
                    var response = {};
                    response.status=status;

                    if(status==500){
                        response.message="server doesn't respond"
                    }
                    else if (status==400){
                        response.message=res.message;
                    }
                    deferred.reject(response);
                });

            return deferred.promise;
        };


        /**
         *
         * @param ID
         * @private
         */
        var _delete = function(ID){
            var deferred = $q.defer();

            $http
                .post('/php/customer/delete', ID)
                .success(function(res){
                   deferred.resolve(res);
                })
                .error(function(res, status){
                    var response = {
                        status : status,
                        message : res.message
                    };
                    deferred.reject(response);
                });
            return deferred.promise;
        };


        var _update = function(customer){
            var deferred = $q.defer();
            $http
                .post('/php/customer/update', customer)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(res, status){
                    var response = {
                        status : status,
                        message : res.message
                    };
                    deferred.reject(response);
                });
            return deferred.promise;
        };


        return {
            get : _get,
            getAllName : _getAllName,
            add : _add,
            delete : _delete,
            update : _update
        };
    }]
);

