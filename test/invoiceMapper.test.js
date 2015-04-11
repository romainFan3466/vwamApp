describe("InvoiceMapper service test", function () {

    beforeEach(module("WashingModule.app"));

    it('should contain an InvoiceMapper service',
        inject(function(InvoiceMapper) {
            expect(InvoiceMapper).not.toBe(null);
        }));


    it('should have a working InvoiceMapper service',
        inject(['InvoiceMapper',function(InvoiceMapper){
            expect(InvoiceMapper.parse).not.toBe(null);
        }]
        ));


    describe("get method test", function () {

        it("should return invoice , good ID", inject(['InvoiceMapper',"CustomerMapper", "ItemMapper",
            function(InvoiceMapper,CustomerMapper, ItemMapper){



                var resultAPI = {
                    "status": "success",
                    "invoice": {
                        "ID": "57",
                        "totalPrice": "92.12",
                        "created": "2015-04-01 22:36:46",
                        "matriculation": {
                            "first": "SDF E44",
                            "second": "SD34 56"
                        },
                        "items": [
                            {
                                "item": {
                                    "ID": "17",
                                    "name": "Itemblabla",
                                    "type": "inside",
                                    "price": 54
                                },
                                "quantity": 2,
                                "subTotal": 108
                            },
                            {
                                "item": {
                                    "ID": "1",
                                    "name": "item2",
                                    "type": "outside",
                                    "price": 34.56
                                },
                                "quantity": 1,
                                "subTotal": 34.56
                            }
                        ],
                        "customer": {
                            "ID": "85",
                            "name": "DorchiffesRTG",
                            "address": "2 rue du lila",
                            "city": "Lille",
                            "country": "FRANCE",
                            "phone": "0466203467",
                            "accountType": null
                        },
                        "from": {
                            "email": "romain.fanara@sfr.fr",
                            "company": "SARL FANARA",
                            "address": "Burrin Street",
                            "city": "CARLOW",
                            "country": "IRELAND",
                            "phone": "3544576756"
                        }
                    }
                };

                var from = new CustomerMapper(
                    {
                        "email": "romain.fanara@sfr.fr",
                        "company": "SARL FANARA",
                        "address": "Burrin Street",
                        "city": "CARLOW",
                        "country": "IRELAND",
                        "phone": "3544576756"
                    });

                var customer = new CustomerMapper(
                    {
                        "ID": "85",
                        "name": "DorchiffesRTG",
                        "address": "2 rue du lila",
                        "city": "Lille",
                        "country": "FRANCE",
                        "phone": "0466203467",
                        "accountType": null
                    });


                var expected = {
                    "invoice": {
                        "ID": "57",
                        "totalPrice": "92.12",
                        "created": "2015-04-01 22:36:46",
                        "matriculation": {
                            "first": "SDF E44",
                            "second": "SD34 56"
                        },
                        "items": [
                            {
                                "item": new ItemMapper({
                                    "ID": "17",
                                    "name": "Itemblabla",
                                    "type": "inside",
                                    "price": 54
                                }),
                                "quantity": 2,
                                "subTotal": 108
                            },
                            {
                                "item": new ItemMapper({
                                    "ID": "1",
                                    "name": "item2",
                                    "type": "outside",
                                    "price": 34.56
                                    }),
                                "quantity": 1,
                                "subTotal": 34.56
                            }
                        ],
                        "customer": customer,
                        "from": from
                    }
                };


               var invoice = new InvoiceMapper(resultAPI.invoice);
                expect(angular.equals(invoice, expected.invoice)).toBe(true);


            }]));
    });
});
