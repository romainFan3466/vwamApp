AppModule.factory("$start", [
    "$q", "$authentication","$log",

    function ($q, $authentication, $log) {

        var deferred = $q.defer();

        $authentication.getSession().then(function(result){
            $log.log("user logged: " + $authentication.getUserMail());
            deferred.resolve("ok");
        });

        return deferred.promise;
    }
]);