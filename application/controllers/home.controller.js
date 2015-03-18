AppModule.controller("HomeController", [
    "$scope", "$authService",
    function ($scope, $authService) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.user = $authService.getUserMail();




    }]);


