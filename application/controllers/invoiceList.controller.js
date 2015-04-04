/**
 * @ngdoc controller
 * @name appModule.controller:InvoiceListController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 *
 */
AppModule.controller("InvoiceListController", [
    "$scope", "$log", "$item",
    function ($scope, $log, $item_app) {

        $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    }
]);