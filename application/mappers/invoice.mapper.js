/**
 * @ngdoc object
 * @name appModule.object:InvoiceMapper
 *
 * @description
 * This object parses invoice data into a InvoiceMapper object
 *
 *
 */
AppModule.factory('InvoiceMapper',[
    "ItemMapper", "CustomerMapper","$filter",
    function (ItemMapper, CustomerMapper, $filter) {


        var InvoiceMapper = function (data) {

            /**
             * @ngdoc property
             * @name ID
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * InvoiceMapper identifier
             * @returns {number} identifier
             */
            this.ID="";

            /**
             * @ngdoc property
             * @name type
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * InvoiceMapper type (invoice/receipt)
             * @returns {string} identifier
             */
            this.type="";


            /**
             * @ngdoc property
             * @name customer
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Customer related to the invoice
             * @returns {CustomerMapper} Customer
             */
            this.customer = {};

            /**
             * @ngdoc property
             * @name from
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Editor related to the invoice
             * @returns {CustomerMapper} Editor, Vendor
             */
            this.from = {};

            /**
             * @ngdoc property
             * @name items
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Row of items
             * @returns {array} Array of object respecting the format :
             * <pre>
             *      var itemRow = {
                                item : ItemMapper,
                                quantity : Double,
                                subTotal : Double
                            };
             </pre>
             */
            this.items= [];

            /**
             * @ngdoc property
             * @name matriculation
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Matriculation of washed vehicle
             * @returns {Object} object as :
             * <pre>
                      var mat = {
                           first : string,
                           second : string
                      };
             </pre>
             */
            this.matriculation = {
                first : "",
                second : ""
            };

            /**
             * @ngdoc property
             * @name totalPrice
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Total amount of invoice
             * @returns {number} total Price
             */
            this.totalPrice="";

            /**
             * @ngdoc property
             * @name comment
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Invoice comment
             * @returns {string} comment brought to the invoice
             */
            this.comment = "";

            /**
             * @ngdoc property
             * @name paymentMode
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Invoice payment Mode
             * @returns {string} payment mode
             */
            this.paymentMode = "";

            /**
             * @ngdoc property
             * @name created
             * @propertyOf appModule.object:InvoiceMapper
             * @description
             * Invoice date creation
             * @returns {Date} date when the invoice was created
             */
            this.created = "";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        /** @ngdoc method
         * @name parse
         * @methodOf appModule.object:InvoiceMapper
         * @param {Object} data This object is supposed to have the same propriety than InvoiceMapper.
         * @description
         * Set all propriety matching by a provided object
         */
        InvoiceMapper.prototype.parse = function(data){
            if (data) {
                var self = this;
                angular.forEach(data, function (value, key) {

//                    self[key] = value;


                    if(angular.equals(key, "items")){
                        angular.forEach(value, function (itemRow) {
                            var _itemRow = {
                                item : new ItemMapper(itemRow.item),
                                quantity : itemRow.quantity,
                                subTotal : parseFloat(itemRow.subTotal).toFixed(2)
                            };
                            self[key].push(_itemRow);
                        });
                    }
                    else if(angular.equals(key, "customer") ||
                        angular.equals(key, "from")){
                           self[key] = new CustomerMapper(value);
                    }
                    else if(angular.equals(key, "totalPrice")){
                        self[key]=(angular.isDefined(value) && !angular.equals(value,null))? parseFloat(value).toFixed(2) : "";
                    }
                    else if(angular.equals(key, "created")){
                        self[key]=$filter('date')(value, "yyyy-MM-dd HH:mm:ss");
                    }
                    else{
                        self[key] = value;
                    }
                });
            }
        };


        InvoiceMapper.prototype.setDateNow = function(){
            var d = new Date();
            this.created = $filter('date')(d, "yyyy-MM-dd HH:mm:ss");
        };

        return InvoiceMapper;
    }]
);