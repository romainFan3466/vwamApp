/**
 * @ngdoc controller
 * @name appModule.controller:HomeController
 * @require $scope
 * @require $authentication
 *
 * @description
 *
 * Interacts with template : "home.view.html"
 *
 */
AppModule.controller("HomeController", [
    "$scope", "$authentication","$translate",
    function ($scope, $authentication, $translate) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.date = new Date();

        $scope.languages =  [
            {id: 'en',title: 'English',name: ' English',flagImg: 'images/gr.png',flagTitle: 'Great Britain'},
            {id: 'fr',title: 'French (France)',name: ' Français (France)',flagImg: 'images/fr.png',flagTitle: 'France'}
        ];

        $scope.user = $authentication.getUserMail();

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };


    }]);


