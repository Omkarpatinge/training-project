'use strict';

define(["app"], function (app) {
	app.filter('searching', function () {
		return function (input, value, objname, ftype) {
			if (!value) {
				return input;
			}
			var filtered = [];
			if (objname && ftype === 'in') {
				for (var i = 0; i < input.length; i++) {
					if (input[i][objname].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
						filtered.push(input[i]);
					}
				}
			} else if (objname && ftype === 'regex') {

				for (var i = 0; i < input.length; i++) {
					try {
						if (input[i][objname].search(value) != -1) {
							filtered.push(input[i]);
						}
					} catch (e) {}
				}
			} else {
				for (var i = 0; i < input.length; i++) {
					if (input[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) filtered.push(input[i]);
				}
			}
			return filtered;
		};
	});
});