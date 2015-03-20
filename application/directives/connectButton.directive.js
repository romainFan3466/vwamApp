


AppModule.directive("connectButton", function () {
    return{
        restrict: "E",
        replace : true,
        templateUrl: "html/templates/connectButton.template.html",
        controller: "connectButtonController"
    };
});

