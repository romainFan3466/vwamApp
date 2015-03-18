AppModule.controller("LoginController",[
    "$scope", "$log", "$modal", "$authService", "$location",
    function ($scope, $log, $modal, $authService, $location) {

        $scope.login = {
            email : "",
            password : ""
        };


        $scope.signupCredentials = {
            email:'',
            password:'',
            name:'',
            phone:'',
            address:''
        };


        $scope.loginIn = function (credentials) {
            $authService.loginIn({user: credentials}).then(function (user) {
                $location.path("/home");
              //  $log("user logged : "+ user.email);
            });
        };


        $scope.signUp = function (credentials) {
            $authService.signUp({customer: credentials}).then(function (results) {
                //TODO :
            });
        };


        $scope.logout = function () {
            $authService.logout().then(function (results) {
                //TODO :
            });
        };

   // $log.log("success getSession:" + $authService.getUserMail());
        $log.log("test log");

    $scope.openNewUserModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'html/views/newUser.modal.html',
            controller: 'NewUserModalController'
        });

        modalInstance.result.then(
            //result from login modal
            function (info) {

        },
            //fail from login modal
            function () {
            $log.info('Error create user request : ' + new Date());
        });
    };


}]);

