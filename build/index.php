<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" ng-app="WashingModule.app" lang="EN">
	<head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>

<title>Washing App</title>

<link rel="shortcut icon" href="images/logo.png"/>

<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<meta name="fragment" content="!"/>

<!-- No cache on html -->
<meta http-equiv="cache-control" content="max-age=0"/>
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="expires" content="0"/>
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>
<meta http-equiv="pragma" content="no-cache"/>

<link rel="stylesheet" href="css/Washing-App.min.css?0.8.01426637867017" type="text/css">


	</head>

	<body>
		<!-- Header -->


        <section id="bodyheader">

    <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">

            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Washing App</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">

                    <li><a href="#/home">Home</a></li>
                    <li><a href="#/invoice">invoice</a></li>
                    <li><a href="#/customer">customer</a></li>
                    <li><a href="#/vehicle">vehicle</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right" ng-controller="BodyHeaderController">
                    <li class="ng-cloak navbar-text" ng-show="authenticated != undefined && authenticated" ng-cloak>{{user}}</li>
                    <li class="ng-cloak  navbar-text"
                        ng-show="authenticated != undefined && !authenticated"
                        ng-cloak>
                        <button type="button" class="btn btn-primary" ng-click="goLogin()">Login</button></li>

                    <li class=" ng-cloak navbar-text" ng-show="loading"><i class="fa fa-refresh fa-spin"></i></li>
                    <li class="ng-cloak btn-login"
                        ng-show="authenticated != undefined && authenticated"
                        ng-cloak
                        ng-click="logout()">
                        <button type="button" class="btn btn-primary" ng-click="goLogin()">Logout</button>
                        </li>
                </ul>

            </div>
        </div>
    </nav>

</section>


		<!-- Main Content -->
		<div id="main-container" class = "container" ng-view ></div>

		<!-- Footer -->
            


		<!-- Application -->
        <script src="js/Washing-App-lib.min.js?0.8.01426637867017"></script>
        <script src="js/Washing-App-app.min.js?0.8.01426637867017"></script>

		<!-- v0.8.01426637867017 -->
	</body>
</html>
