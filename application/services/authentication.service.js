AppModule.factory('$authentication',[
 "$http", "SessionMapper", "$q", "$log",
    function ($http, SessionMapper, $q, $log) {


    var _modelSession = {
        authenticated : true
    };

    var _getSession = function(){
        var defered = $q.defer();

        $http
            .get('/php/session')
            .success(function (res) {
                _modelSession = new SessionMapper(res);

                defered.resolve( {email : _modelSession.email});
            })
            .error(function(res){
                defered.reject({message : res});
            });

        return defered.promise;
    };

    var _loginIn = function (credentials) {
        var defered = $q.defer();

        $http
            .post('/php/login', credentials)
            .success(function (res) {
                _modelSession = new SessionMapper(res);
                defered.resolve( {email : _modelSession.email});
            })
            .error(function(res){
                 defered.reject({message : res.message});
            });

        return defered.promise;
    };


    var _logout = function () {
        var defered = $q.defer();
        $http
            .get('/php/logout')
            .success(function (res) {
                _modelSession = new SessionMapper(res);
                defered.resolve( _modelSession.email);
            });

        return defered.promise;
    };


    var _signUp = function (credentials) {
        var defered = $q.defer();
        $http
            .post('/php/signUp', credentials)
            .success(function (res) {
                defered.resolve(res);
            })
            .error(function(res){
                defered.reject(res);
            });

        return defered.promise;
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

