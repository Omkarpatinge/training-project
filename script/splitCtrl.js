'use strict';

define(['app', 'requestService', 'dataFactory', 'removeText', 'numberSuffix', 'splitTab'], function (app) {
	app.controller('splitCtrl', ['$scope', 'requestService', 'dataFactory', '$state', '$stateParams', '$rootScope', function ($scope, requestService, dataFactory, $state, $stateParams, $rootScope) {
		var obj = this;
		$rootScope.$broadcast("check");
		obj.param = { req: $stateParams.req };
		var x = JSON.parse($stateParams.req);
		var req = dataFactory.generateRequest(x);
		obj.metrics = req["metrics"];
		var dimensions = [];
		req["dimensionObjectList"].forEach(function (elm) {
			if (elm.dimension !== "Time") {
				dimensions.push(elm["dimension"]);
			} else {
				dimensions.push("Timestamp");
			}
		});
		obj.dimensions = dimensions;
		if (req['dimensionObjectList'].length == 0) {
			obj.status = 1;
		} else {
			obj.status = 0;
		}
		$scope.split = obj;
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