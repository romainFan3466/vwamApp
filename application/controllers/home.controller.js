AppModule.controller("HomeController", [
    "$scope", "$authentication",
    function ($scope, $authentication) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.user = $authentication.getUserMail();




    }]);


