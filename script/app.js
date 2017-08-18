'use strict';

//app.js
define(['angularAMD', 'uiRouter', 'googleChart'], function (angularAMD) {
	var app = angular.module('sam', ["ui.router", "googlechart"]);
	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('total', angularAMD.route({
			url: '/totals:req',
			templateUrl: '_total.html',
			controller: "totalCounterCtrl",
			controllerUrl: "totalCounterCtrl"
		})).state('chart', angularAMD.route({
			url: '/chart',
			templateUrl: '_stats.html',
			controller: "chartCtrl",
			controllerUrl: "chartCtrl"
		})).state('splitTable', angularAMD.route({
			url: '/splitTable',
			templateUrl: '_splitData.html',
			controller: "splitCtrl",
			controllerUrl: "splitCtrl"
		})).state('sample', angularAMD.route({
			url: '/sample',
			template: '<h1>{{tex}}</h1><br><button ui-sref="main">Sample</button>',
			controller: "SampleController",
			controllerUrl: "SampleController"
		}));
		var req = encodeURIComponent(JSON.stringify({
			"metrics": ["Impressions Delivered (HB Rendered Ad)", "Adjustment1 (HB Rendered Ad)"],
			"startTime": "2017-08-09 07:40:37",
			"endTime": "2017-08-09 13:40:38",
			"namespace": "Header Bidder",
			"orderingMetric": "Impressions Delivered (HB Rendered Ad),"
		}));
		//console.log(req);
		$urlRouterProvider.otherwise('/splitTable');
	}]);

	return angularAMD.bootstrap(app);
});