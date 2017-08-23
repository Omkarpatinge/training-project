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
      //controller:'MainCtrl',
      //controllerAs:'thcntr',
      //bindToController: true,   
      link: function link(scope, element, attr) {
        //console.log(scope.listname=25);
        element.data('thingTest', true);
        angular.element($document[0].body).on('click', function (e) {
          var inThing = angular.element(e.target).inheritedData('thingTest');

          if (inThing) {
            $window.alert('in');
          } else {
            //console.log(scope.persons[1].people[0]);
            //scope.$apply();
            try {
              $timeout(function () {
                if (scope.listname === 'Split') {
                  scope.persons[1].people[scope.index].thresholdselect = false;
                } else if (scope.listname === 'Filters' && scope.persons[0].people[scope.index].name != 'Time') {
                  scope.persons[0].people[scope.index].filterselect = false;
                }
              }, 0);
            } catch (e) {
              angular.element($document[0].body).unbind("click");
            }

            //scope.persons.thresholdselect=false;
            //console.log(scope.persons);

            /* console.log('in');
             if (scope.exact!='Time'&&scope.listname.label==='Filters') {
               
               scope.listname.people[scope.index].filterselect=false;
             }
             else if (scope.listname.label==='Split') {
               console.log(scope.listname.people[scope.index]);  
               scope.listname.people[scope.index].thresholdselect=false;
             }*/
            //scope.$apply();
            //console.log(scope.listname,exact);
            //check its filtershow value


            /*attr.thingy.filterselect=false;
            console.log(a);
            */
            //scope.model.cntr.filterselect=false;
            angular.element($document[0].body).unbind("click");
            //detach element
          }
        });
      }
    };
  });
});