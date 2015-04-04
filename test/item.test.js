describe("$item service test", function () {

    beforeEach(module("WashingModule.app"));

    it('should contain an $item service',
        inject(function($item) {
            expect($item).not.toBe(null);
        }));


    it('should have a working $item service',
        inject(['$item',function($item){

            expect($item.getAll).not.toBe(null);
            expect($item.add).not.toBe(null);
            expect($item.delete).not.toBe(null);
            expect($item.update).not.toBe(null);
        }]
        ));


    describe("getAll method test", function () {

        it("should return item list ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var resultAPI =
                    [
                        {
                            "ID": "1",
                            "name": "Camion porteur",
                            "type": "Inside",
                            "price": "45",
                            "userID": "196"
                        },
                        {
                            "ID": "6",
                            "name": "Rmaoj",
                            "type": "Outside",
                            "price": "5667",
                            "userID": "196"
                        },
                        {
                            "ID": "7",
                            "name": "RRTT",
                            "type": "Outside",
                            "price": "0",
                            "userID": "196"
                        }
                    ];

                var resultService = {
                    list : []
                };

                angular.forEach(resultAPI, function(item){
                    var i = new ItemMapper(item);
                    i.setDescription();
                   resultService.list.push(i);
                });

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/items/all", {})
                    .respond(200,resultAPI);


                $item.getAll().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.list).not.toBe(null);
                        expect(angular.equals(res.list, resultService.list)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged ", inject(['$item','$httpBackend',
            function($item, $httpBackend){

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/items/all", {})
                    .respond(401,resultAPI);


                $item.getAll().then(
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

        it("should return item list ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    name : "name of item",
                    type : "Inside/Outside/Others",
                    price : 345.50
                };


                var resultAPI = {
                    status: "success",
                    message: "Item created successfully"
                };

                /*var req = {
                    item : new ItemMapper(item)
                };*/

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/items/add",
                    {item : new ItemMapper(item)})
                    .respond(200,resultAPI);


                $item.add(item).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res, resultAPI)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    name : "name of item",
                    type : "Inside/Outside/Others",
                    price : 345.50
                };

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/items/add",
                    {item : new ItemMapper(item)})
                    .respond(401,resultAPI);


                $item.add(item).then(
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

        it("should return error, name matches with an other item ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    name : "name of item",
                    type : "Inside/Outside/Others",
                    price : 345.50
                };

                var resultAPI ={
                    "status": "error",
                    "message": "An Item with the provided name already exists!"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/items/add",
                    {item : new ItemMapper(item)})
                    .respond(400,resultAPI);

                $item.add(item).then(
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

    describe("delete method test", function () {

        // TODO : washingapp keep history for an invoice, otherwise won't delete item
        xit("should delete item ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    name : "name of item",
                    type : "Inside/Outside/Others",
                    price : 345.50
                };

                var resultAPI = {
                    "status": "success",
                    "message": "Item deleted successfully"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/items/7")
                    .respond(200,resultAPI);

                $item.delete(7).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged ", inject(['$item','$httpBackend',
            function($item, $httpBackend){

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/items/7")
                    .respond(401,resultAPI);

                $item.delete(7).then(
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

        it("should return error, item ID invalid", inject(['$item','$httpBackend',
            function($item, $httpBackend){

                var resultAPI ={
                    "status": "error",
                    "message": "the item to deleted with the provided ID doesn't exist!"
                };

                $httpBackend.expectDELETE("http://washing-app.romainfanara.com/php/items/7")
                    .respond(401,resultAPI);

                $item.delete(7).then(
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

    describe("update method test", function () {

        it("should update item", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    "ID": "1",
                    "name": "Camion porteur",
                    "type": "Inside",
                    "price": "45",
                    "userID": "196"
                };

                var resultAPI = {
                    "status": "success",
                    "message": "Item changed successfully"
                };

                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/items",
                    {item : new ItemMapper(item)})
                    .respond(200,resultAPI);

                $item.update(item).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res, resultAPI)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error, not logged ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    "ID": "1",
                    "name": "Camion porteur",
                    "type": "Inside",
                    "price": "45",
                    "userID": "196"
                };

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/items",
                    {item : new ItemMapper(item)})
                    .respond(401,resultAPI);

                $item.update(item).then(
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

        it("should return error, invalid item ID ", inject(['$item','$httpBackend', "ItemMapper",
            function($item, $httpBackend, ItemMapper){

                var item = {
                    "ID": "1",
                    "name": "Camion porteur",
                    "type": "Inside",
                    "price": "45",
                    "userID": "196"
                };

                var resultAPI ={
                    "status": "error",
                    "message": "the item to change with the provided ID doesn't exist!"
                };

                $httpBackend.expectPUT("http://washing-app.romainfanara.com/php/items",
                    {item : new ItemMapper(item)})
                    .respond(400,resultAPI);

                $item.update(item).then(
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
