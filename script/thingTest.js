'use strict';

define(["app"], function (app) {
  app.directive('thingTest', function ($document, $window, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        listname: '=',
        exact: '=',
        index: '=',
        persons: '='
      },

      link: function link(scope, element, attr) {

        element.data('thingTest', true);
        angular.element($(window)).on('mousedown', function (e) {
          var inThing = angular.element(e.target).inheritedData('thingTest');

          if (inThing) {} else {
            //console.log(scope.persons[1].people[0]);
            //scope.$apply();
            console.log('outthing');
            try {
              $timeout(function () {
                if (scope.listname === 'Split') {
                  scope.persons[1].people[scope.index].thresholdselect = false;
                } else if (scope.listname === 'Filters') {
                  if (scope.persons[0].people[scope.index].name == 'Time') {
                    scope.persons[0].people[scope.index].filterselect = false;
                  } else {
                    if (scope.persons[0].people[scope.index].clickok) {
                      scope.persons[0].people[scope.index].filterselect = false;
                    } else {
                      scope.persons[0].people.splice(scope.index, 1);
                    }
                  }
                }
              }, 0);
            } catch (e) {
              angular.element($(window)).unbind("mousedown");
            }

            angular.element($(window)).unbind("mousedown");
          }
        });
      }
    };
  });
});