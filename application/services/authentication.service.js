/**
 * @ngdoc overview
 * @name appModule
 * @description
 *
 * This is where all directives, services are regrouped for the project " Washing App"
 *
 *
 *
 */



/**
 * @ngdoc service
 * @name appModule.service:$authentication
 * @require $http
 * @require SessionMapper
 * @require $q
 * @require Config
 * @description
 * This service provides all authentication functionalities from the API.
 *
 * Using this service, you can manage user session and allows to retrieve data from server.
 */
AppModule.factory('$authentication',[
    "$http", "SessionMapper", "$q", "$log", "Config",
    function ($http, SessionMapper, $q, $log, Config) {


        var _modelSession = {
            authenticated : true
        };

        /**
         * @ngdoc method
         * @name getSession
         * @methodOf appModule.service:$authentication
         * @description
         * Get user session
         * @example
         <example module="getSessionExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
            <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('getSessionExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$authentication',
         function($scope, $authentication) {
           $scope.session = {};
           var affect = function(obj){
                $scope.session=obj;
           };

           var getSession = function(){
                $authentication.getSession().then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           //call getSession function to retrieve session data
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, and item added successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    email: "test@test.com",
                };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an error only if a status 500 occurs.
         */
        var _getSession = function(){
            var deferred = $q.defer();

            $http
                .get(Config.baseUrl + '/php/session')
                .success(function (res) {
                    _modelSession = new SessionMapper(res);

                    deferred.resolve( {email : _modelSession.email});
                })
                .error(function(res){
                    deferred.reject(res);
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name loginIn
         * @methodOf appModule.service:$authentication
         * @param {Object} credentials Credentials to provide (See description)
         *
         * @description
         * Process to login in the app.
         * You must provide an object as credentials within the following format :
         *
         *<pre>
         var credentials = {
                    email : "test@test.com",
                    password : "pawsrd",
                   };
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see credentials
         *  object structure and for more explanations.
         *  @example
         <example module="loginExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('loginExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$authentication',
         function($scope, $authentication) {
           $scope.result = {};
           // structure expectation
           var credentials = {
                email : "example@test.com",
                password : "pwd"
         };

         var affect = function(obj){
            $scope.result = obj;
         };

         var login = function(){
                $authentication.loginIn(credentials).then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
         // call "login" function to process login
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, and item added successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    email: "test@test.com",
         };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as error like:
         *
         *<pre>
         var result = {
                    status : "error",
                    message : "Login failed. Incorrect credentials"
         };
         *</pre>
         */
        var _loginIn = function (credentials) {
            var deferred = $q.defer();

            $http
                .post(Config.baseUrl + '/php/login', credentials)
                .success(function (res) {
                    _modelSession = new SessionMapper(res);
                    deferred.resolve( {email : _modelSession.email});
                })
                .error(function(res){
                    deferred.reject({message : res.message});
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name logout
         * @methodOf appModule.service:$authentication
         *
         * @description
         * Process to logout of the app.
         *
         * @example
         <example module="logoutExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('logoutExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$authentication',
         function($scope, $authentication) {
           $scope.result = {};
           var affect = function(obj){
                $scope.result=obj;
           };

           var logout = function(){
                $authentication.logout().then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
           //call logout function to process logout
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - We assume the server logs out user successfully for each request, and the method promises as
         * success an string which is message from server like :
         *
         *<pre>
            var result = "Logout successfully";
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} for more information about message
         * from server.
         */
        var _logout = function () {
            var deferred = $q.defer();
            $http
                .get(Config.baseUrl + '/php/logout')
                .success(function (res) {
                    _modelSession = new SessionMapper(res);
                    deferred.resolve(res.message);
                });

            return deferred.promise;
        };


        /**
         * @ngdoc method
         * @name signUp
         * @methodOf appModule.service:$authentication
         * @param {Object} credentials Credentials to provide (See description)
         * @description
         * Process to sign up into the app.
         * You must provide an object as credentials.
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} and live example to see credentials
         * object structure and for more explanations.
         * @example
         <example module="signUpExample">
         <file name="index.html">
         <div ng-controller="ExampleController">
         <p>nothing to display, see script.js</p>
         </div>
         </file>
         <file name="script.js">
         angular.module('signUpExample', ['WashingModule.app'])
         .controller('ExampleController', ['$scope', '$authentication',
         function($scope, $authentication) {
           $scope.result = {};
           // structure expectation
           var credentials = {
                email : "example@test.com",
                password : "pwd"
         };

         var affect = function(obj){
            $scope.result = obj;
         };

         var signUp = function(){
                $authentication.signUp(credentials).then(
                    function(result){
                        affect(result);
                    },
                    function(result){
                        affect(result);
                    });
           };
         // call "signUp" function to process sign up
         }]);
         </file>
         </example>
         * @returns {Promise} Promise within an object as result from server
         *
         * - if the server receives a well formatted object, and item added successfully,
         * method promises as a success an object like :
         *
         *<pre>
         var result = {
                    status : "success",
                    message : "User account created successfully",
                    uid : 199
         };
         *</pre>
         *
         * - Otherwise, if there is any error, method will promises an object as error like:
         *
         *<pre>
         var result = {
                    status : "error";
                    message : "An user with the provided  email exists!";
         };
         *</pre>
         *
         * See {@link http://doc.romainfanara.com/#/washing-api API} for more information
         */
        var _signUp = function (credentials) {
            var deferred = $q.defer();
            var user = { user : credentials};
            $http
                .post(Config.baseUrl + '/php/signUp', user)
                .success(function (res) {
                    deferred.resolve(res);
                })
                .error(function(res){
                    deferred.reject(res);
                });

            return deferred.promise;
        };


        var _isAuthenticated = function () {
            return _modelSession.authenticated;
        };



        var _getUserMail = function(){
            return _modelSession.email;
        };



        /* authService.isAuthorized = function (authorizedRoles) {
         if (!angular.isArray(authorizedRoles)) {
         authorizedRoles = [authorizedRoles];
         }
         return (authService.isAuthenticated() &&
         authorizedRoles.indexOf(SessionMapper.userRole) !== -1);
         };*/


        return {
            loginIn : _loginIn,
            logout  : _logout,
            signUp  : _signUp,
            isAuthenticated : _isAuthenticated,
            getUserMail : _getUserMail,
            getSession : _getSession
        };
    }]
);

