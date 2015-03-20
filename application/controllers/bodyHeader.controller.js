AppModule.controller("BodyHeaderController",[
    "$scope", "$authentication", "$log", "$location",
    function ($scope, $authentication, $log, $location) {
        $scope.authenticated = undefined;
        $scope.loading = false;
        $scope.user = "";
       // $scope.authenticated = $authentication.modelSession();

        $scope.$watch($authentication.isAuthenticated, function(newValue, oldValue) {
            console.log(newValue);
            $log.log("watch auth");
            if(angular.isDefined(newValue)){
                $scope.authenticated = newValue;
                if(newValue==true){
                    $scope.$watch($authentication.getUserMail, function(newValue){
                        $scope.user= $authentication.getUserMail();
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
            $authentication.logout().then(function(){
                $scope.loading = false;
                $location.path("#/login");
            });
        };

        /*$authentication.getSession().then(function(result){
            // debugger;
            $scope.authenticated = $authentication.isAuthenticated();
            if(auth ===false){
                $location.path("/login");
            }
        });*/

       // $scope.user = $authentication.getUserMail();
       // $scope.authenticated = $authentication.isAuthenticated();

    }
]);

