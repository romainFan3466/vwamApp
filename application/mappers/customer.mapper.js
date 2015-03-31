/**
 * @ngdoc object
 * @name appModule.object:CustomerMapper
 *
 * @description
 * This object parses customer data into a CustomerMapper object.
 *
 *
 */
AppModule.factory('CustomerMapper',
    function () {


        var CustomerMapper = function (data) {

            /**
             * @ngdoc property
             * @name ID
             * @propertyOf appModule.object:CustomerMapper
             * @description
             * CustomerMapper identifier
             * @returns {Integer} identifier
             */
            this.ID="";

            /**
             * @ngdoc property
             * @name name
             * @propertyOf appModule.object:CustomerMapper
             * @description
             * Customer's name
             * @returns {String} name
             */
            this.name="";

            /**
             * @ngdoc property
             * @name address
             * @propertyOf appModule.object:CustomerMapper
             * @type {String}
             * @description
             * Customer's address
             * @returns {String} address
             */
            this.address="";

            /**
             * @ngdoc property
             * @name city
             * @propertyOf appModule.object:CustomerMapper
             * @description
             * Customer's city
             * @returns {String} city
             */
            this.city="";

            /**
             * @ngdoc property
             * @name country
             * @propertyOf appModule.object:CustomerMapper
             * @description
             * Customer's country
             * @returns {String} country
             */
            this.country="";

            /**
             * @ngdoc property
             * @name phone
             * @propertyOf appModule.object:CustomerMapper
             * @description
             * Customer's phone
             * @returns {String} phone
             */
            this.phone="";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

       /** @ngdoc method
        * @name parse
        * @methodOf appModule.object:CustomerMapper
        * @param {Object} data This object is supposed to have the same propriety than CustomerMapper.
        * @description
        * Set all propriety matching by a provided object
        */
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