// configuration for requirejs
require.config({
	map:{

	},
	paths:{
		'config':'rconfig',
		'app':'app',
		'jquery': [
			"lib/jquery-3.2.1",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min"
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

		"moment":[
			"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min"
		],
		"bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
		"daterangepicker":"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/2.1.25/daterangepicker.min",
		"angulardate":[
			"lib/angulardate",

		],
		"dnd":"lib/dndv2",
		'angularAMD':'lib/angularAMD.min',
		'requestService':'requestService',//Service
		'dataFactory':'dataFactory',//Factory
		'apiConst':'apiConst',//Constant
		'removeText':'removeText',//Filter
		'numberSuffix':'numberSuffix',//Filter
		'splitTab':'splitTab',
		"MainCtrl":"MainCtrl",
		"urls":"urls",
		"searching":"searching",
		"callserver":"callserver",
		"thingTest":"thingTest",
	},
	shim:{
		'angular':{
			export:'angular'
		},
		"bootstrap":{
			deps:["jquery"]
		},
		'uiRouter':['angularAMD'],
		'angularAMD': ['angular'],
		'googleChart':{
			deps:['angular']
		},

		"angulardate":{
	 		deps:['moment',"angular",'daterangepicker']
	 	},
	 	'moment':{
	 		
	 	},
	 	"dnd":['angular']
	}
});
require(['app','MainCtrl']);