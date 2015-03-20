AppModule.factory('$customer',[
    "$http", "CustomerMapper", "$q", "$log",
    function ($http, CustomerMapper, $q, $log) {


        var _get = function(customerName){
            var defered = $q.defer();

            $http
                .post('/php/customer',customerName)
                .success(function (res) {
                    var customer = new CustomerMapper(res);
                    defered.resolve( {customer : customer});
                })
                .error(function(res){
                    defered.reject({message : res});
                });

            return defered.promise;
        };

        var _getAllName = function(){
            var defered = $q.defer();

            $http
                .post('/php/customer/all',{})
                .success(function (res) {
                    var list =[];
                    angular.forEach(res, function(value){
                        var customer = new CustomerMapper(value);
                        list.push(customer);
                    });
                    defered.resolve( {list : list});
                })
                .error(function(res){
                    defered.reject({message : res});
                });

            return defered.promise;
        };



        return {
           get : _get,
           getAllName : _getAllName
        };
    }]
);

