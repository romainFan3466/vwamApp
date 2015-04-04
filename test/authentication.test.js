describe("$authentication service test", function () {

    beforeEach(module("WashingModule.app"));

    it('should contain an $authentication service',
        inject(function($authentication) {
            expect($authentication).not.toBe(null);
        }));


    it('should have a working $authentication service',
        inject(['$authentication',function($authentication){

            expect($authentication.loginIn).not.toBe(null);
            expect($authentication.logout).not.toBe(null);
            expect($authentication.signUp).not.toBe(null);
            expect($authentication.isAuthenticated).not.toBe(null);
            expect($authentication.getUserMail).not.toBe(null);
            expect($authentication.getSession).not.toBe(null);
            expect($authentication.getUserData).not.toBe(null);

        }]
        ));

    describe("loginIn method test", function () {

        it("should return email , good credentials", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var credentials = {
                    email : "example@test.com",
                    password : "pwd"
                };

                var resultAPI = {
                    "status": "success",
                    "message": "Logged in successfully.",
                    "uid": "1456",
                    "email": "example@test.com",
                    "createdAt": "2015-03-20 01:18:30",
                    "authenticated": true
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/login",
                    {user : credentials})
                    .respond(200,resultAPI);

                $authentication.loginIn(credentials).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.email).not.toBe(null);
                        expect(angular.equals(res.email, credentials.email)).toEqual(true);
                        expect($authentication.isAuthenticated()).toEqual(true);
                        expect($authentication.getUserMail()).toEqual(credentials.email);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error ,bad credentials", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var credentials = {
                    email : "example@test.com",
                    password : "pwd"
                };

                var resultAPI = {
                    "status": "error",
                    "message": "Login failed. Incorrect credentials"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/login",
                    {user : credentials})
                    .respond(401,resultAPI);

                $authentication.loginIn(credentials).then(
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

    describe("logout method test", function () {

        it("should return success message , logged earlier", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "status": "success",
                    "message": "Logged Out Successfully..."
                };

                $httpBackend.expectGET("http://washing-app.romainfanara.com/php/logout")
                    .respond(200,resultAPI);

                $authentication.logout().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);

                        expect($authentication.isAuthenticated()).toEqual(false);
                        expect($authentication.getUserMail()).toEqual("");
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return success message , not logged earlier", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "status": "success",
                    "message": "Not logged in..."
                };

                $httpBackend.expectGET("http://washing-app.romainfanara.com/php/logout")
                    .respond(200,resultAPI);

                $authentication.logout().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                        expect($authentication.isAuthenticated()).toEqual(false);
                        expect($authentication.getUserMail()).toEqual("");
                    }
                );
                $httpBackend.flush();
            }]));
    });

    describe("signUp method test", function () {

        it("should sign up user , good credentials", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var credentials = {
                    email : "test@sf.fe",
                    password : "eeee",
                    confirmedPassword:"eeee",
                    company : "Test company",
                    address : "Main Street",
                    city : "Dublin",
                    country :"IRELAND",
                    phone : "546546"
                };

                var resultAPI = {
                    status : "success",
                    message : "User account created successfully",
                    uid : 4566
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/signUp",
                    {user : credentials})
                    .respond(200,resultAPI);

                $authentication.signUp(credentials).then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(angular.equals(res, resultAPI)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return error , email already exist", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var credentials = {
                    email : "test@sf.fe",
                    password : "eeee",
                    confirmedPassword:"eeee",
                    company : "Test company",
                    address : "Main Street",
                    city : "Dublin",
                    country :"IRELAND",
                    phone : "546546"
                };

                var resultAPI = {
                    "status": "error",
                    "message": "An user with the provided  email exists!"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/signUp",
                    {user : credentials})
                    .respond(400,resultAPI);

                $authentication.signUp(credentials).then(
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

        it("should return error , insert error", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var credentials = {
                    email : "test@sf.fe",
                    password : "eeee",
                    confirmedPassword:"eeee",
                    company : "Test company",
                    address : "Main Street",
                    city : "Dublin",
                    country :"IRELAND",
                    phone : "546546"
                };

                var resultAPI = {
                    "status": "error",
                    "message": "Failed to create user. Please try again"
                };

                $httpBackend.expectPOST("http://washing-app.romainfanara.com/php/signUp",
                    {user : credentials})
                    .respond(400,resultAPI);

                $authentication.signUp(credentials).then(
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

    describe("getUserData method test", function () {

        it("should return user data , user logged", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "user": {
                        "email": "test@sd.fr",
                        "company": "SARL something",
                        "address": "main Street",
                        "city": "Dublin",
                        "country": "IRELAND",
                        "phone": "3544576756"
                    },
                    "status": "success"
                };

                $httpBackend.whenPOST("http://washing-app.romainfanara.com/php/session/user", {})
                    .respond(200,resultAPI);

                $authentication.getUserData().then(
                    function(res) {
                        expect(res.user).not.toBe(null);
                        expect(angular.equals(res.user, resultAPI.user)).toEqual(true);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return user data , user logged", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "message": "Unauthorized access, need to login in"
                };

                $httpBackend.whenPOST("http://washing-app.romainfanara.com/php/session/user", {})
                    .respond(401,resultAPI);

                $authentication.getUserData().then(
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

    describe("getSession method test", function () {

        it("should return user data , user logged", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "uid": "196",
                    "email": "romain.fanara@sfr.fr",
                    "authenticated": true
                };

                $httpBackend.whenGET("http://washing-app.romainfanara.com/php/session")
                    .respond(200,resultAPI);

                $authentication.getSession().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                        expect($authentication.isAuthenticated()).toEqual(resultAPI.authenticated);
                        expect($authentication.getUserMail()).toEqual(resultAPI.email);
                    }
                );
                $httpBackend.flush();
            }]));

        it("should return user data , user logged", inject(['$authentication','$httpBackend', "SessionMapper",
            function($authentication, $httpBackend, SessionMapper){

                var resultAPI ={
                    "authenticated": false,
                    "uid": "",
                    "email": ""
                };

                $httpBackend.whenGET("http://washing-app.romainfanara.com/php/session")
                    .respond(200,resultAPI);

                $authentication.getSession().then(
                    function(res) {
                        expect(res).not.toBe(null);
                        expect(res.message).not.toBe(null);
                        expect(angular.equals(res.message, resultAPI.message)).toEqual(true);
                        expect($authentication.isAuthenticated()).toEqual(resultAPI.authenticated);
                        expect($authentication.getUserMail()).toEqual(resultAPI.email);
                    }
                );
                $httpBackend.flush();
            }]));
    });

});