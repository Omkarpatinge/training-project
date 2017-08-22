'use strict';

define(['app', 'requestService', 'dataFactory', 'numberSuffix', 'apiConst'], function (app) {
	app.controller('chartCtrl', ['$scope', 'requestService', 'dataFactory', 'numberSuffixFilter', 'api', '$stateParams', function ($scope, requestService, dataFactory, numberSuffixFilter, api, $stateParams) {
		var x = JSON.parse($stateParams.req);
		//dataFactory.ga
		//console.log(x);
		var req = dataFactory.generateRequest(x);
		//console.log("res:",req)
		$scope.status = 0;
		var time = req["dimensionObjectList"].some(function (elem) {
			return elem["dimension"] === "Time";
		});
		$scope.chart = [];
		$scope.status = time ? 1 : $scope.status;
		$scope.status = req["dimensionObjectList"].length > 2 ? 2 : $scope.status;
		$scope.metrics = req["metrics"];
		var dimension = req.dimensionObjectList[1] ? req.dimensionObjectList[0].dimension : undefined;
		var chartNo, JSONChart;
		//$scope.char="";
		if (dimension) {
			chartNo = 0;
		} else {
			chartNo = 1;
		}
		JSONChart = api.chart[chartNo];
		buildChart();
		function buildChart() {
			dataFactory.getLineData(req).then(function (response) {
				console.log("res:", response);

				$scope.response = response;
				loadCharts();
			}, function () {
				$scope.status = 3;
			});
		}
		function loadCharts() {
			var result = $scope.response.data.result;
			for (var i = 0; i < $scope.metrics.length; i++) {
				var m = $scope.metrics[i];
				var title = m.replace("(HB Rendered Ad)", numberSuffixFilter(result[m], 2));
				var data = dataFactory.getDataTable(result, m, dimension);
				//console.log(data,"here");
				//debugger;
				//var dataTable=new google.visualization.arrayToDataTable(data);
				var chart = JSON.parse(JSON.stringify(JSONChart));
				//console.log(chart);
				chart["options"].title = title;
				chart.data = data;
				$scope.chart[i] = chart;
			}
		}
		//console.log(req);
		//var a=dataFactory.getLineData(requestService.getReq());
		//console.log(a);
	}]);
});