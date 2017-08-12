// configuration for requirejs
require.config({
	map:{

	},
	paths:{
		'config':'rconfig',
		'app':'app',
		'jquery': [
			"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
			"lib/jquery"
		],
		'angular':[
			"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js",
			"lib/angular.min"
		],
		'ui-router':[
			"https://ajax.googleapis.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.min.js",
			"lib/angular-ui-router.min"
		],
		'ang_config':'ang_config'
	},
	shim:{
		'angular':{
			export:'angular'
		}
		'ui-router':{
			deps:['angular']
		}
	}
});
require(['app'],function(app){
	app.init();
})