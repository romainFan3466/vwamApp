
AppModule.controller('NewUserModalController',[
    "$scope", "$modalInstance","$authentication",
 function ($scope, $modalInstance, $authentication) {

    $scope.credentials = {
        email : "",
        password : ""
    };

     $scope.success=false;
     $scope.error=false;
     $scope.loading=false;

     $scope.signUp = function (credentials) {
         $scope.loading= true;
         $authentication.signUp({user: credentials}).then(
             function (results) {
                 $scope.loading=false;
                 $scope.success=true;
             },
             function(){
                 $scope.loading=false;
                 $scope.error=true;
             });
     };


    $scope.ok = function () {
        $modalInstance.close("succes");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);