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
    "$q", "$authentication","$log","$translate","tmhDynamicLocale",

    function ($q, $authentication, log, $translate, tmhDynamicLocale) {

        var deferred = $q.defer();

        //set internationalization
        var local = angular.copy($translate.use());
        $log.log("pd " + local);
        tmhDynamicLocale.set(local);

        $authentication.getSession().then(function(result){
            deferred.resolve("ok");
        });

        return deferred.promise;
    }
]);