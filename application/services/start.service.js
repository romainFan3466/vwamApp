AppModule.factory("$start", [
    "$q", "$authentication","$log",

    function ($q, $authentication, $log) {

        var defered = $q.defer();

        $authentication.getSession().then(function(result){
            $log.log("user logged: " + $authentication.getUserMail());
            defered.resolve("ok");
        });

        return defered.promise;
    }
]);