// configuration for requirejs
require.config({
	map:{

	},
	paths:{
		'config':'rconfig',
		'app':'app',
		'jquery': [
			"lib/jquery-3.2.1",
			"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min"
		],
		'angular':[
			"lib/angular",
			"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min"
		],
		'uiRouter':[
			"lib/angular-ui-router",
			"https://ajax.googleapis.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.min"
		],
		'angularResource':[
			"lib/angular-resource.min.js"
		],
		'angularAMD':'lib/angularAMD.min',
		'ang_config':'ang_config',
		'MainController':'MainController',
		'SampleController':'SampleController'
	},
	shim:{
		'angular':{
			export:'angular'
		},
		'angularAMD': ['angular']
	}
});
require(['app']);