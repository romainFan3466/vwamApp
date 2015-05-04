describe("$customer service test", function () {
    var $customer, httpBackend;

    beforeEach(module("WashingModule.app"));

    /*beforeEach(inject(function (_$customer_, $httpBackend) {
        $customer = _$customer_;
        httpBackend = $httpBackend;
    }));*/

    it('should contain an $appStorage service',
        inject(function($customer) {
            expect($customer).not.toBe(null);
        }));


    it('should have a working $customer service',
      inject(['$customer',function($customer){

            expect($customer.get).not.toBe(null);
            expect($customer.getByID).not.toBe(null);
            expect($customer.getAllName).not.toBe(null);
            expect($customer.add).not.toBe(null);
            expect($customer.delete).not.toBe(null);
            expect($customer.update).not.toBe(null);
        }]
    ));


    describe("$customer get method test", function () {

        it("should return a customer data, good name ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var objRequest = {
                    customer : {
                        name : "Dorchies"
                    }
                };
                var result = {
                    "customer" : {
                        "ID": "12",
                        "name": "Dorchies",
                        "address": "2 rue du lila",
                        "city": "Lille",
                        "country": "FRANCE",
                        "phone": "0466203467",
                        "accountType": null,
                        "userID": "196"
                    }
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers", objRequest)
                    .respond(200,result);


                $customer.get("Dorchies").then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.customer).not.toBe(null);
                        expect(angular.equals(res.customer, result.customer)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it("should return error, not logged ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var objRequest = {
                    customer : {
                        name : "Dorchies"
                    }
                };
                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers", objRequest)
                    .respond(401,result);


                $customer.get("Dorchies").then(
                    function(res) {

                    },
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it("should return error, no customer name valid ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var objRequest = {
                    customer : {
                        name : "Dorchies"
                    }
                };
                var result = {
                    "message": "no customer with a such name for the logged user"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers", objRequest)
                    .respond(400,result);


                $customer.get("Dorchies").then(
                    function(res){

                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });


    describe("$customer getByID method test", function () {

        it(" should return a customer data, good ID ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){


                var result = {
                    "customer" : {
                        "ID": "12",
                        "name": "Dorchies",
                        "address": "2 rue du lila",
                        "city": "Lille",
                        "country": "FRANCE",
                        "phone": "0466203467",
                        "accountType": null,
                        "userID": "196"
                    }
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/id/12",{})
                    .respond(200,result);

                $customer.getByID(12).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.customer).not.toBe(null);
                        expect(angular.equals(res.customer, result.customer)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it(" should return error, not logged ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/id/12", {})
                    .respond(401,result);


                $customer.getByID(12).then(
                    function(res) {},
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it("should return error, no customer id valid ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){


                var result = {
                    "message": "no customer with a such name for the logged user"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/id/12", {})
                    .respond(400,result);


                $customer.getByID(12).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });


    describe("$customer getAllName method test", function () {

        it(" should return all customer names ", inject(['$customer','$httpBackend',"CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){


                var resultAPI = [
                    {
                        "name": "Dorchies"
                    },
                    {
                        "name": "Blanchet"
                    },
                    {
                        "name": "Celerier"
                    },
                    {
                        "name": "Mesguen"
                    }
                ];

                var resultService = {
                    list : [
                        new CustomerMapper({"name": "Dorchies"}),
                        new CustomerMapper({"name": "Blanchet"}),
                        new CustomerMapper({"name": "Celerier"}),
                        new CustomerMapper({"name": "Mesguen"})
                    ]
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/all/names",{})
                    .respond(200,resultAPI);

                $customer.getAllName().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.list).not.toBe(null);
                        expect(angular.equals(res.list, resultService.list)).toEqual(true);
                    }
                );

                $httpBackend.flush();
            }]));

        it(" should return error, not logged ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/all/names", {})
                    .respond(401,result);


                $customer.getAllName().then(
                    function(res) {},
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });


    describe("$customer add method test", function () {

        it(" should add customer, good object ", inject(['$customer','$httpBackend',"CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "name": "Dorchies",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null
                };

                var result = {
                    status: "success",
                    message: "Customer created successfully"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/add",
                    {customer : new CustomerMapper(customer)})
                    .respond(200,result);

                $customer.add(customer).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res, result)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it(" should return error, not logged ", inject(['$customer','$httpBackend',"CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "name": "Dorchies",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null
                };

                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/add",
                    {customer : new CustomerMapper(customer)})
                    .respond(401,result);


                $customer.add(customer).then(
                    function(res) {},
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));


        it("should return error, no customer name already taken ", inject(['$customer','$httpBackend',"CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "name": "Dorchies",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null
                };

                var result = {
                    message : "A Customer with the provided name already exists!"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/customers/add",
                    {customer : new CustomerMapper(customer)})
                    .respond(400,result);


                $customer.add(customer).then(
                    function(res) {},
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });




    describe("$customer delete method test", function () {

        it(" should delete a customer, good ID ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var result = {
                    status: "success",
                    message: "Customer deleted successfully"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/customers/12")
                    .respond(200,result);

                $customer.delete(12).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res, result)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it(" should return error, not logged ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/customers/12")
                    .respond(401,result);


                $customer.delete(12).then(
                    function(res) {},
                    function(res){
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, no customer id valid ", inject(['$customer','$httpBackend',
            function($customer, $httpBackend){

                var result = {
                    "message": "no customer with a such name for the logged user"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/customers/12")
                    .respond(401,result);


                $customer.delete(12).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });


   describe("$customer update method test", function () {

        it(" should update a customer data, good object ", inject(['$customer','$httpBackend', "CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "ID": "12",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null,
                    "userID": "196"
                };

                var request = {
                    customer : new CustomerMapper(customer)
                };

                var result = {
                    status: "success",
                    message: "Customer changed successfully"
                };


                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/customers",request)
                    .respond(200,result);


                $customer.update(customer).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it(" should return error, not logged ", inject(['$customer','$httpBackend', "CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "ID": "12",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null,
                    "userID": "196"
                };

                var request = {
                    customer : new CustomerMapper(customer)
                };

                var result = {
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/customers",request)
                    .respond(401,result);


                $customer.update(customer).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );

                $httpBackend.flush();
            }]));

        it("should return error, no customer id valid ", inject(['$customer','$httpBackend', "CustomerMapper",
                function($customer, $httpBackend, CustomerMapper){

                    var customer = {
                        "ID": "12",
                        "address": "2 rue du lila",
                        "city": "Lille",
                        "country": "FRANCE",
                        "phone": "0466203467",
                        "accountType": null,
                        "userID": "196"
                    };

                    var request = {
                        customer : new CustomerMapper(customer)
                    };

                    var result ={
                        "status": "error",
                        "message": "the customer to change with the provided ID doesn't exist!"
                    };

                    $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/customers",request)
                        .respond(400,result);


                    $customer.update(customer).then(
                        function(res){
                        },
                        function(res) {
                            expect(res).not.toBe(null);
                            expect(res.message).not.toBe(null);
                            expect(angular.equals(res.message, result.message)).toEqual(true);
                        }
                    );
                    $httpBackend.flush();
                }]));

        it("should return error, customer name matches with an other name", inject(['$customer','$httpBackend', "CustomerMapper",
            function($customer, $httpBackend, CustomerMapper){

                var customer = {
                    "ID": "12",
                    "address": "2 rue du lila",
                    "city": "Lille",
                    "country": "FRANCE",
                    "phone": "0466203467",
                    "accountType": null,
                    "userID": "196"
                };

                var request = {
                    customer : new CustomerMapper(customer)
                };

                var result ={
                    "status": "error",
                    "message": "the customer to change with the provided ID doesn't exist!"
                };

                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/customers",request)
                    .respond(400,result);


                $customer.update(customer).then(
                    function(res){
                    },
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, result.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));
    });


});

