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

            /**
             * @ngdoc property
             * @name ID
             * @propertyOf appModule.object:ItemMapper
             * @description
             * ItemMapper identifier
             * @returns {number} identifier
             */
            this.ID="";

            /**
             * @ngdoc property
             * @name name
             * @propertyOf appModule.object:ItemMapper
             * @description
             * Name of ItemMapper Item
             * @returns {string} name
             */
            this.name="";

            /**
             * @ngdoc property
             * @name type
             * @propertyOf appModule.object:ItemMapper
             * @description
             * Type of ItemMapper Item
             * @returns {string} type
             */
            this.type="";

            /**
             * @ngdoc property
             * @name price
             * @propertyOf appModule.object:ItemMapper
             * @description
             * Price of ItemMapper Item
             * @returns {number} price
             */
            this.price="";

            /**
             * @ngdoc property
             * @name description
             * @propertyOf appModule.object:ItemMapper
             * @description
             * ItemMapper description
             * @returns {string} description
             */
            this.description="";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        /** @ngdoc method
         * @name parse
         * @methodOf appModule.object:ItemMapper
         * @param {Object} data This object is supposed to have the same propriety than ItemMapper.
         * @description
         * Set all propriety matching by a provided object
         */
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


        /** @ngdoc method
         * @name setDescription
         * @methodOf appModule.object:ItemMapper
         * @description
         * Generate and assign description propriety from name and type
         */
        ItemMapper.prototype.setDescription = function(){
            this.description =  this.name + ", " + this.type;
        };


        return ItemMapper;
    }
);