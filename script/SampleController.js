'use strict';

define(['app'], function (app) {
	console.log("SampleController");
	app.controller('SampleController', ['$scope', function ($scope) {
		$scope.tex = "I am SampleController";
	}]);
});