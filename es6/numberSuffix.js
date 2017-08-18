define(['app'],function(app){
  app.filter('numberSuffix', function () {
    return function (input, decimals) {
      var exp, rounded,
        suffixes = ['k', 'm', 'b','T'];

      if(window.isNaN(input)) {
        return null;
      }

      if(input < 1000) {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
  });
})