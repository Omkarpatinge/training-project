//app.js
define(['angularAMD','uiRouter','googleChart','dnd'],function(angularAMD){
	var app = angular.module('sam',["ui.router","googlechart",'dndLists']);
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$stateProvider
		.state('main',angularAMD.route({
				templateUrl:'main2.html',
				controller:"MainCtrl",
				controllerAs:"cntr",
				controllerUrl:"MainCtrl"
			})
		)
		.state('main.total',angularAMD.route({
				url:'/totals:req',
				templateUrl:'_total.html',
				controller:"totalCounterCtrl",
				controllerAs:"counter",
				controllerUrl:"totalCounterCtrl"
			})
		)
		.state('main.chart',angularAMD.route({
					url:'/chart:req',
					templateUrl:'_stats.html',
					controller:"chartCtrl",
					controllerAs:"chart",
					controllerUrl:"chartCtrl"
				})
		)
		.state('main.splitTable',angularAMD.route({
				url:'/splitTable:req',
				templateUrl:'_splitData.html',
				controller:"splitCtrl",
				controllerAs:"split",
				controllerUrl:"splitCtrl"
			})
		)
		.state('sample',angularAMD.route({
				url:'/sample',
				template:'<h1>{{tex}}</h1><br><button ui-sref="main">Sample</button>',
				controller:"SampleController",
				controllerUrl:"SampleController"
			})
		)
		var req=encodeURIComponent(JSON.stringify({
		  "metrics": ["Impressions Delivered (HB Rendered Ad)","Adjustment1 (HB Rendered Ad)"],
		  "startTime": "2017-08-09 07:40:37",
		  "endTime": "2017-08-09 13:40:38",
		  "namespace": "Header Bidder",
		  "orderingMetric": "Impressions Delivered (HB Rendered Ad),"
		}));
		//console.log(req);
		$urlRouterProvider.otherwise('/chart');
	}]);
	
	return angularAMD.bootstrap(app);
})