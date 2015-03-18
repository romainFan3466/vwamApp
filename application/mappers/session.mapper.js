AppModule.factory('SessionMapper',
    function () {


        var SessionMapper = function (data) {

            this.authenticated = false;
            this.uid = "";
            this.email = "";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        SessionMapper.prototype.parse = function(data){
            if (data) {
                var self = this;
                angular.forEach(data, function (value, key) {
                    self[key] = value;
                });
            }
        };


        return SessionMapper;
    }
);