"use strict";

define(["app"], function (app) {
	app.filter('gettimevalue', function () {
		return function (input) {
			var output;
			switch (input) {
				case 60000:
					output = " (1M)";
					break;
				case 300000:
					output = " (5M)";
					break;
				case 3600000:
					output = " (1H)";
					break;
				case 86400000:
					output = " (1D)";
					break;
				case 604800000:
					output = " (1W)";
					break;
				default:
					return input;
			}
			return output;
		};
	});
});