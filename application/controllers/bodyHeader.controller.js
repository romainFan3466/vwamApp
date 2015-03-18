AppModule.controller("BodyHeaderController",[
    "$scope", "$authService", "$log", "$location",
    function ($scope, $authService, $log, $location) {
        $scope.authenticated = undefined;
        $scope.loading = false;
        $scope.user = "";
       // $scope.authenticated = $authService.modelSession();

        $scope.$watch($authService.isAuthenticated, function(newValue, oldValue) {
            console.log(newValue);
            $log.log("watch auth");
            if(angular.isDefined(newValue)){
                $scope.authenticated = newValue;
                if(newValue==true){
                    $scope.$watch($authService.getUserMail, function(newValue){
                        $scope.user= $authService.getUserMail();
                        $log.log("watch user");
                    });

                }
            }
        });

        $scope.goLogin = function(){
            $location.path("#/login");
        };


        $scope.logout = function(){
            $scope.loading = true;
            $authService.logout().then(function(){
                $scope.loading = false;
                $location.path("#/login");
            });
        };

        /*$authService.getSession().then(function(result){
            // debugger;
            $scope.authenticated = $authService.isAuthenticated();
            if(auth ===false){
                $location.path("/login");
            }
        });*/

       // $scope.user = $authService.getUserMail();
       // $scope.authenticated = $authService.isAuthenticated();

    }
]);

