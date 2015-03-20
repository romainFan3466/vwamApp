AppModule.directive("spinner", function () {
    return {
        restrict  : "E",
        scope     : {
            loading: "="
        },
        replace : true,
        template : '<div class="spinner-global  ng-cloak" ng-cloak ng-show="loading">' +
        '<div class ="spinner-img fa fa-refresh fa-spin fa-5x"></div>' +
        '</div>'
    }
});
