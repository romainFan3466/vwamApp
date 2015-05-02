<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" ng-app="WashingModule.app" lang="EN">
	<head>
        [[include(<%= appPath %>/templates/head.template.html)]]

	</head>

	<body>
		<!-- Header -->


        [[include(<%= appPath %>/templates/bodyHeader.template.html)]]

		<!-- Main Content -->
		<div id="main-container" class="container-fluid"  ng-view ></div>

		<!-- Footer -->
            [[include(<%= appPath %>/templates/footer.template.html)]]


		<!-- Application -->
        <script src="js/[[pkg.appName]]-lib.min.js?[[pkg.version]]"></script>
        <script src="js/[[pkg.appName]]-app.min.js?[[pkg.version]]"></script>

		<!-- v[[pkg.version]] -->
	</body>
</html>
