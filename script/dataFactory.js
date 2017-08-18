'use strict';

define(['app', 'apiConst'], function (app) {
	app.factory('dataFactory', ['$http', 'api', function ($http, api) {
		var con = {};
		var out = {};
		con.getLineData = function (data) {
			return $http.post(api.req.url, JSON.stringify(data));
			//return out;
		};
		con.getTotalData = function (data) {
			//var metrics=data.metrics;
			return $http.post(api.req.url, JSON.stringify(data));
		};
		return con;
	}]);
});