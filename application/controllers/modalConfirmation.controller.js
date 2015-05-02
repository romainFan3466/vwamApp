/**
 * @ngdoc controller
 * @name appModule.controller:ModalConfirmationController
 * @require $scope
 * @require $authentication
 * @require $modalInstance
 *
 * @description
 *
 *
 */
AppModule.controller('ModalConfirmationController',[
    "$scope", "$modalInstance", "$log","message",
    function ($scope, $modalInstance, $log, message) {


        $scope.message = message;

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
]);
