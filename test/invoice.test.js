describe("$invoice service test", function () {

    beforeEach(module("WashingModule.app"));

    it('should contain an $invoice service',
        inject(function($invoice) {
            expect($invoice).not.toBe(null);
        }));


    it('should have a working $invoice service',
        inject(['$invoice',function($invoice){

            expect($invoice.get).not.toBe(null);
            expect($invoice.add).not.toBe(null);

        }]
        ));


    describe("get method test", function () {

        it("should return invoice , good ID", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var resultAPI ={
                    "status": "success",
                    "invoice": {
                        "ID": "57",
                        "customerID": "85",
                        "userID": "19446",
                        "totalPrice": "92.12",
                        "created": "2015-04-01 22:36:46",
                        "matriculation": {
                            "first": "SDF E44",
                            "second": "SD34 56"
                        },
                        "items": [
                            {
                                "itemID": "17",
                                "quantity": "2",
                                "subTotal": "47.12"
                            },
                            {
                                "itemID": "1",
                                "quantity": "1",
                                "subTotal": "45"
                            }
                        ]
                    }
                };

                var resultService = new InvoiceMapper(resultAPI.invoice);

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/57", {})
                    .respond(200,resultAPI);

                $invoice.get(57).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res, resultService)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged", inject(['$invoice','$httpBackend',
            function($invoice, $httpBackend){

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/57", {})
                    .respond(401,resultAPI);


                $invoice.get(57).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, invoice ID invalid", inject(['$invoice','$httpBackend',
            function($invoice, $httpBackend){

                var resultAPI ={
                    "status": "error",
                    "message": "no invoice with a such ID exist for the user logged "
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/57", {})
                    .respond(400,resultAPI);


                $invoice.get(57).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });

    describe("add method test", function () {

        it("should add invoice , good data", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };

                var resultAPI = {
                    "success": true,
                    "message": "Invoice and rows added successfully",
                    "ID": 62
                };


                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(200,resultAPI);

                $invoice.add(invoice).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res).not.toBe(null);
                        expect(angular.isNumber(res.ID)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };
                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(401,resultAPI);


                $invoice.add(invoice).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, customer ID invalid", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };
                var resultAPI ={
                    "success": false,
                    "message": "Invoice wasn't added, customer doesn't exist for this user"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(400,resultAPI);


                $invoice.add(invoice).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, item ID invalid", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };
                var resultAPI ={
                    "success": false,
                    "message": "Invoice row wasn't added, itemID doesn't exist"
                }

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(400,resultAPI);


                $invoice.add(invoice).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, insert invoice error", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };
                var resultAPI ={
                    "success": false,
                    "message": "Invoice wasn't added, insert error"
                }

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(400,resultAPI);


                $invoice.add(invoice).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, insert row error", inject(['$invoice','$httpBackend', "InvoiceMapper",
            function($invoice, $httpBackend, InvoiceMapper){

                var invoice  ={
                    "customerID" : 85,
                    "matriculation" : {
                        "first" : "SDF E44",
                        "second" : "SD34 56"
                    },
                    "items" : [
                        {
                            "itemID" : 17,
                            "quantity" : 2
                        },
                        {
                            "itemID" : 1,
                            "quantity" : 1
                        }]
                };
                var resultAPI ={
                    "success": false,
                    "message": "Invoice row wasn't added, insert errorr"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/invoices/add",
                    {invoice : new InvoiceMapper(invoice)})
                    .respond(400,resultAPI);


                $invoice.add(invoice).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });
});
