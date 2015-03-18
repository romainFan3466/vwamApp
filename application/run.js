//Session checking watcher
AppModule.run(["$rootScope", "$location", "$authService","$log",
    function ($rootScope, $location, $authService, $log) {

       // $authService.getSession();

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $authService.getSession().then(function(result){
                var auth = $authService.isAuthenticated();
                if(auth ===false){
                    $location.path("/login");
                }
            });
        });
    }
]);