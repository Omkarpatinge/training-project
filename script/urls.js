"use strict";

define(["app"], function (app) {
	app.constant('urls', {
		dim: "http://localhost:8001/api/v1/metadata/HB%20Rendered%20Ad/dimensions",
		meas: "http://localhost:8001/api/v1/metadata/HB%20Rendered%20Ad/metrics",
		query: "http://localhost:8001/api/v1/query"
	});
});