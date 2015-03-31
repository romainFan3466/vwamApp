/**
 * @ngdoc service
 * @name appModule.service:$start
 * @require $q
 * @require $authentication
 *
 * @description
 * This service is called by the app before each every route redirection.
 *
 *
 */
AppModule.factory("$start", [
    "$q", "$authentication","$log",

    function ($q, $authentication, $log) {

        var deferred = $q.defer();

        $authentication.getSession().then(function(result){
            deferred.resolve("ok");
        });

        return deferred.promise;
    }
]);