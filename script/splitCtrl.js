'use strict';

define(['app', 'requestService', 'dataFactory', 'removeText', 'numberSuffix', 'splitTab'], function (app) {
	app.controller('splitCtrl', ['$scope', 'requestService', 'dataFactory', '$stateParams', function ($scope, requestService, dataFactory, $stateParams) {
		var x = JSON.parse($stateParams.req);
		var req = dataFactory.generateRequest(x);
		$scope.metrics = req["metrics"];
		$scope.dimensions = [];
		req["dimensionObjectList"].forEach(function (elm) {
			if (elm.dimension !== "Time") {
				$scope.dimensions.push(elm["dimension"]);
			} else {
				$scope.dimensions.push("Timestamp");
			}
		});

		if (req['dimensionObjectList'].length == 0) {
			$scope.status = 1;
		} else {
			$scope.status = 0;
		}
		/*	$scope.getSplit=function(deep) {
  		var splt;
  		splt=$scope.result.spilt	
  		for (var i = 0; i <deep; i++) {
  			splt=splt.split;
  		}
  		return splt;
  	}*/
	}]);
});