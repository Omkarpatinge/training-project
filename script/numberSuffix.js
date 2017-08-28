'use strict';

define(['app'], function (app) {
  app.filter('numberSuffix', function () {
    return function (input, decimals) {
      var exp,
          rounded,
          suffixes = ['k', 'm', 'b', 'T'];

      if (window.isNaN(input)) {
        return null;
      }
      if (window.isNaN(decimals)) {
        rounded = 2;
      } else {
        rounded = decimals;
      }
      if (input < 1000) {
        return Math.round(input * 100) / 100;
      }
      exp = Math.floor(Math.log(input) / Math.log(1000));
      var x = (input / Math.pow(1000, exp)).toFixed(rounded) + suffixes[exp - 1];
      console.log(x);
      return x;
    };
  });
});