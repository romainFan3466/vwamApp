

/**
 * @ngdoc directive
 * @name Directives.directive:issuesView
 * @restrict EA
 * @description
 * This displays all issues of the specified title.
 * When you click on one of issues, you'll view this issue in featuredIssue element.
 * The current title must be provided with the route paramater ':titleId'.
 */
kioskLibModule.directive("connectButton", function () {
    return{
        restrict: "E",
        replace : true,
        templateUrl: "html/templates/connectButton.template.html",
        controller: "connectButtonController"
    };
});

