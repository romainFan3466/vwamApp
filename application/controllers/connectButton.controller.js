/*
kioskLibModule.controller("connectButtonController", [
    "$scope", "$user", "$modal",
    function ($scope, $user, $modal) {

        $scope.loggingIn = false;

        var _refreshUser = function () {
            $user.get().then(function () {
                $scope.form = $user.getModel();
                $scope.form.forgotPassword = false;
                $scope.loggingIn = false;
            });
        };


        var _loginUser = function () {
            return $user.login($scope.form.email, $scope.form.password, $scope.form.rememberMe);
        };


        var _forgotPasswordModal = function(){
            var forgotPasswordModalInstance = $modal.open({
                templateUrl: 'html/templates/forgotPasswordModal.template.html',
                controller: 'forgotPasswordModalController'
            });
        };


        var modalResultSuccess = function(form){
            $scope.form = form;

            if($scope.form.forgotPassword){
                _forgotPasswordModal();
            }else {
                $scope.loggingIn = true;
                _loginUser().then(function () {
                        $scope.loggingIn = false;
                        $scope.form.password = "";
                        $scope.form.rememberMe = "";
                        _refreshUser();
                    },
                    function () {
                        $scope.loggingIn = false;
                        _loginModal();
                    });
            }
        };


        var _loginModal = function(){
            var loginModalInstance  = $modal.open({
                templateUrl: 'html/templates/connectionModal.template.html',
                controller: 'connectionModalController',
                resolve: {
                    form: function () {
                        return $scope.form
                    }
                }
            });
            loginModalInstance.result.then(
                function (formResult) {
                    modalResultSuccess(formResult);
                },
                function () {
                    $scope.loggingIn = false;
                    $scope.form.forgotPassword = false;
                    _refreshUser();
                    window.location.reload();
                });
        };


        $scope.login = function () {
            _refreshUser();
            _loginModal();
        };


        $scope.logout = function () {
            $user.logout().then(function () {
                $scope.loggingIn = true;
                _refreshUser();

            });
        };


        _refreshUser();

    }
]);
*/
