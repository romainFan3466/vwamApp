/**
 * @ngdoc service
 * @name appModule.service:$country
 * @require $http
 * @require CustomerMapper
 * @require $q
 * @require Config
 *
 * @description
 * This service provides all $country functionalities from the API.
 *
 * Using this service, you can manage customer of the logged user and allows to retrieve data from server.
 *
 *
 */
AppModule.factory('$country',[
    "$http", "$q", "$log","$translate",
    function ($http, $q, $log, $translate) {



        var _getLocation = function(val) {
            var deferred = $q.defer();
            var lang = $translate.use();

            $http
                .get('https://restcountries.eu/rest/v1/name/'+val)
                .success(function(data) {
                    var result = data.map(function(item){
                        return {country : item.translations[lang] || item.name , phoneCode : item.callingCodes};
                    });
                    deferred.resolve(result);

                })
                .error(function(data, status, headers, config) {

                });

            return deferred.promise;

        };

        var _getPhoneCode = function(val) {
            var deferred = $q.defer();

            $http
                .get('https://restcountries.eu/rest/v1/name/'+val)
                .success(function(data) {
                    var result = data.map(function(item){
                        return "+" + item.callingCodes;
                    });
                    deferred.resolve(result);

                })
                .error(function(data, status, headers, config) {

                });

            return deferred.promise;

        };



        return {
            getLocation :_getLocation,
            getPhoneCode : _getPhoneCode
        }

    }




]);
