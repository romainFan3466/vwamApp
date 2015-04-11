//Session checking watcher
AppModule.run(["$rootScope", "$location", "$authentication","$log",
    function ($rootScope, $location, $authentication, $log) {


        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $authentication.getSession().then(function(result){
                var auth = $authentication.isAuthenticated();
                if(auth ===false){
                    $location.path("/login");
                }
            });
        });
    }
]);