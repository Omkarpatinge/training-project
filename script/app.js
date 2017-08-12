'use strict';

//app.js
define(['angular', 'ui-router'], function (angular) {
	var app = angular.module('sam', ["ui.router"]);
	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {}]);
	app.init = function () {
		angular.bootstrap(document, ['sam']);
	};
	return app;
});