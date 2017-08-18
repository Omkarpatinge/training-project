'use strict';

define(['app', 'requestService', 'dataFactory', 'removeText', 'numberSuffix', 'splitTab'], function (app) {
	app.controller('splitCtrl', ['$scope', 'requestService', 'dataFactory', function ($scope, requestService, dataFactory) {
		var req = requestService.getReq();
		$scope.metrics = req["metrics"];
		$scope.dimensions = [];
		req["dimensionObjectList"].forEach(function (elm) {
			if (elm.dimension !== "Time") {
				$scope.dimensions.push(elm["dimension"]);
			} else {
				$scope.dimensions.push("Timestamp");
			}
		});
		$scope.getSplit = function (deep) {
			var splt;
			splt = $scope.result.spilt;
			for (var i = 0; i < deep; i++) {
				splt = splt.split;
			}
			return splt;
		};
	}]);
});