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
    "ItemMapper", "CustomerMapper",
    function (ItemMapper, CustomerMapper) {


        var InvoiceMapper = function (data) {

            this.ID="";
            this.customer = {};
            this.from  = {};
            this.items= [];
            this.matriculation = {
                first : "",
                second : ""
            };
            this.totalPrice="";
            this.created = "";

            if (angular.isDefined(data)) {
                this.parse(data);
            }
        };

        InvoiceMapper.prototype.parse = function(data){
            if (data) {
                var self = this;
                angular.forEach(data, function (value, key) {
                    if(angular.equals(key,"customer") ||
                        angular.equals(key, "from")){
                        self[key] = new CustomerMapper(value);
                    }

                    else if(angular.equals(key, "items")){
                        angular.forEach(value, function (itemRow) {
                            var _itemRow = {
                                item : new ItemMapper(itemRow.item),
                                quantity : itemRow.quantity
                            };
                            self[key].push(_itemRow);
                        });
                    }
                    else{
                        self[key] = value;
                    }
                });
            }
        };



        return InvoiceMapper;
    }]
);