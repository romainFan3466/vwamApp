/**
 * @ngdoc object
 * @name appModule.object:ItemMapper
 *
 * @description
 * This object parses item data into a ItemMapper object
 *
 *
 */
AppModule.factory('ItemMapper',
    function () {


        var ItemMapper = function (data) {

            this.ID="";
            this.name="";
            this.type="";
            this.price="";
            this.description="";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        ItemMapper.prototype.parse = function(data){
            if (data) {
                var self = this;
                angular.forEach(data, function (value, key) {
                    self[key] = value;
                    if(angular.equals(key, "price")){

                        if(angular.isString(value)){
                            value = value.replace(/\,/g,".");
                        }
                        self[key] = parseFloat(value).toFixed(2);
                        self[key] = isNaN(self[key]) ? "" : self[key];
                    }
                });

            }
        };

        ItemMapper.prototype.setDescription = function(){
            this.description =  this.name + ", " + this.type;
        };


        return ItemMapper;
    }
);