AppModule.factory('CustomerMapper',
    function () {


        var CustomerMapper = function (data) {

            this.ID="";
            this.name="";
            this.address="";
            this.city="";
            this.country="";
            this.phone="";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        CustomerMapper.prototype.parse = function(data){
            if (data) {
                var self = this;
                angular.forEach(data, function (value, key) {
                    self[key] = value;
                });
            }
        };


        return CustomerMapper;
    }
);