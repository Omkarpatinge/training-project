'use strict';

define(["app"], function (app) {
  app.directive('thingTest', function ($document, $window) {
    return {
      restrict: 'EA',
      scope: { listname: '=',
        exact: '=',
        index: '=' },
      link: function link(scope, element, attr) {
        //console.log(scope.exact)
        element.data('thingTest', true);
        angular.element($document[0].body).on('click', function (e) {
          var inThing = angular.element(e.target).inheritedData('thingTest');
          if (inThing) {
            $window.alert('in');
          } else {
            if (!(scope.exact === 'Time' && scope.listname === 'Filters')) {
              for (var i = 0; i < scope.$parent.lists.length; i++) {
                if (scope.$parent.lists[i].label === scope.listname) {
                  if (scope.listname == 'Filters') {
                    scope.$parent.lists[i].people[scope.index].filterselect = false;
                  } else {
                    scope.$parent.lists[i].people[scope.index].thresholdselect = false;
                  }
                  scope.$parent.$apply();
                  break;
                }
              }
            }
            //console.log(scope.listname,exact);
            //check its filtershow value


            /*attr.thingy.filterselect=false;
            console.log(a);
            */
            //scope.model.$parent.filterselect=false;
            angular.element($document[0].body).unbind("click");
            //detach element
          }
        });
      }
    };
  });
});