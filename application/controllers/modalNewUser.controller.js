
AppModule.controller('NewUserModalController',[
    "$scope", "$modalInstance",
 function ($scope, $modalInstance) {

    $scope.credentials = {
        email : "",
        password : ""
    };



    $scope.ok = function () {
        $modalInstance.close("succes");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);