AppModule.factory("$start", [
    "$q", "$authService","$log",

    function ($q, $authService, $log) {

        var defered = $q.defer();

        $authService.getSession().then(function(result){
            $log.log("user logged: " + $authService.getUserMail());
            defered.resolve("ok");
        });

        return defered.promise;
    }
]);