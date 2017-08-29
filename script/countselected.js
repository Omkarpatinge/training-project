"use strict";

define(["app"], function (app) {
	app.filter('countselected', function () {
		return function (input) {
			//console.log(input);
			var count = 0;
			for (var i = 0; i < input.length; i++) {
				if (input[i].selected) {
					count++;
				}
			}
			return "(" + count + ")";
		};
	});
});