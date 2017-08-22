"use strict";

define(["app", "urls"], function (app) {
	app.factory('callserver', function ($http, urls) {
		return {
			calldim: function calldim() {
				return $http.get(urls.dim);
			},
			callmeas: function callmeas() {
				return $http.get(urls.meas);
			},
			callquery: function callquery(obj) {
				return $http.post(urls.query, obj);
			}

		};
	});
});