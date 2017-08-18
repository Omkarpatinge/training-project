'use strict';

define(['app'], function (app) {
	app.filter('removeText', function () {
		return function (input, text) {
			input = input || '';
			return input.replace(text, '');
		};
	});
});