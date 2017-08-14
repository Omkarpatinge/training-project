//app.js
define(['angularAMD','uiRouter'],function(angularAMD){
	var app = angular.module('sam',["ui.router"]);
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state('main',angularAMD.route({
				url:'/main',
				template:'<h1></h1><br><button ui-sref="sample">Sample</button>',
				controller:"MainController",
				controllerUrl:"MainController"
			})
		)
		.state('sample',angularAMD.route({
				url:'/sample',
				template:'<h1></h1><br><button ui-sref="main">Main</button>',
				controller:"SampleController",
				controllerUrl:"SampleController"
			})
		)
		$urlRouterProvider.otherwise('/main');
	}]);
	return angularAMD.bootstrap(app);
})