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
			"lib/angular.min",
			"https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular"
		],
		'uiRouter':[
			"lib/angular-ui-router.min",
			"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.4.2/angular-ui-router"
		],
		'googleChart':[
			'lib/ng-google-chart.min',
			'https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.1.0/ng-google-chart.min'
		],
		'angularAMD':'lib/angularAMD.min',
		'requestService':'requestService',//Service
		'dataFactory':'dataFactory',//Factory
		'apiConst':'apiConst',//Constant
		'removeText':'removeText',//Filter
		'numberSuffix':'numberSuffix',//Filter
		'splitTab':'splitTab'
	},
	shim:{
		'angular':{
			export:'angular'
		},
		'uiRouter':['angularAMD'],
		'angularAMD': ['angular'],
		'googleChart':{
			deps:['angular']
		}

	}
});
require(['app']);