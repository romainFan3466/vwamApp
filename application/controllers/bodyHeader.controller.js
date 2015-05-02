/**
 * @ngdoc controller
 * @name appModule.controller:BodyHeaderController
 * @require $scope
 * @require $authentication
 * @require $location
 *
 * @description
 *
 * Interacts with template : "bodyHeader.template.html"
 *
 *
 */
AppModule.controller("BodyHeaderController",[
    "$scope", "$authentication", "$log", "$location","$translate","tmhDynamicLocale",
    function ($scope, $authentication, $log, $location, $translate, tmhDynamicLocale) {
        $scope.authenticated = undefined;
        $scope.loading = false;
        $scope.user = "";
       // $scope.authenticated = $authentication.modelSession();

        $scope.langSelected = "";
        $scope.langSelected = angular.copy($translate.preferredLanguage());
        $scope.languages =  [
                {id: 'en',title: 'English',name: ' English',flagImg: '/images/gb.png',flagTitle: 'Great Britain'},
                {id: 'fr',title: 'French',name: ' Français',flagImg: '/images/fr.png',flagTitle: 'France'}
            ];


        $scope.$on('pls.onLanguageChanged', function(evt, lang){
            tmhDynamicLocale.set(lang.lang.id);
            $translate.use(lang.lang.id);
        });

        $scope.$watch($authentication.isAuthenticated, function(newValue, oldValue) {
            if(angular.isDefined(newValue)){
                $scope.authenticated = newValue;
                if(newValue==true){
                    $scope.$watch($authentication.getUserMail, function(newValue){
                        $scope.user= $authentication.getUserMail();
                    });

                }
            }
        });

        $scope.goLogin = function(){
            $location.path("#/login");
        };


        $scope.logout = function(){
            $scope.loading = true;
            $authentication.logout().then(function(){
                $scope.loading = false;
                $location.path("#/login");
            });
        };
    }
]);

