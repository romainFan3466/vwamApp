/**
 * @ngdoc directive
 * @name appModule.directive:modalConfirm
 * @element ANY
 * @restrict A


 * @description
 * When you click on the current element, you will be redirected to the provided path
 */
AppModule.directive("modalConfirm",[ "$modal",  function ($modal) {
    return {
        restrict  : "A",
        scope     : {
            message : '@',
            confirmationYes : '&',
            confirmationNo : '&'
        },
        link : function (scope, element, attrs) {

            element.bind('click',function(){

                var modalInstance = $modal.open({
                    templateUrl: 'html/templates/modalConfirmation.template.html',
                    controller: function ($scope, $modalInstance, $log, message) {

                        $scope.message = message;

                        $scope.okfortest = function () {
                            console.log("ok click");
                            $modalInstance.close();
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                    },
                    size : 'sm',
                    resolve: {
                        message: function () {
                            return scope.message;
                        }
                    }
                });

                modalInstance.result.then(function (val) {
                    console.log("ok result");
                    (angular.isDefined(scope.confirmationYes))? scope.confirmationYes(): null ;
                    console.log("ok result confirm apllied");
                }, function () {
                    (angular.isDefined(scope.confirmationNo))? scope.confirmationNo(): null ;
                });

            });
        }
    }
}]);
