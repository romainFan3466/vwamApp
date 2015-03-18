/**
 * Angular.js route and module declaration. and blabla
 */
var AppModule = angular.module('WashingModule.app', ['ngRoute', 'ui.bootstrap']);

AppModule.config(['$routeProvider', function ($routeProvider) {
	var routes = [
		{url: "/login", templateUrl: "html/views/login.view.html"},
        {url: "/home", templateUrl: "html/views/home.view.html"},

        {url: "/invoice", templateUrl: "html/views/invoice.view.html"},
        {url: "/invoice/create", templateUrl: "html/views/invoice/createInvoice.view.html"},
        {url: "/invoice/edit", templateUrl: "html/views/invoice/editInvoice.view.html"},
        {url: "/invoice/list", templateUrl: "html/views/invoice/listInvoice.view.html"},

        {url: "/vehicle", templateUrl: "html/views/vehicle.view.html"},
        {url: "/vehicle/create", templateUrl: "html/views/vehicle/createVehicle.view.html"},
        {url: "/vehicle/edit", templateUrl: "html/views/vehicle/editVehicle.view.html"},
        {url: "/vehicle/list", templateUrl: "html/views/vehicle/listVehicle.view.html"},

        {url: "/customer", templateUrl: "html/views/customer.view.html"},
        {url: "/customer/create", templateUrl: "html/views/customer/createCustomer.view.html"},
        {url: "/customer/edit", templateUrl: "html/views/customer/editCustomer.view.html"},
        {url: "/customer/list", templateUrl: "html/views/customer/listCustomer.view.html"}

	];

	$routeProvider.otherwise({redirectTo: '/home'});



	angular.forEach(routes, function (route) {

        /*route.resolve = {
            resolve : "$start"
            };*/
        $routeProvider.when(route.url, route);
	});

}]);



