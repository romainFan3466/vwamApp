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

                    self[key] = value;


                    /*else if(angular.equals(key, "items")){
                        angular.forEach(value, function (itemRow) {
                            var _itemRow = {
                                itemID : itemRow.itemID,
                                quantity : itemRow.quantity,
                                subTotal : itemRow.subTotal
                            };
                            self[key].push(_itemRow);
                        });
                    }
                    else{
                        self[key] = value;
                    }*/
                });
            }
        };



        return InvoiceMapper;
    }]
);