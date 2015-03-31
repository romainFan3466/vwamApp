/**
 * @ngdoc controller
 * @name appModule.controller:HomeController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("HomeController", [
    "$scope", "$authentication",
    function ($scope, $authentication) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.user = $authentication.getUserMail();




    }]);


