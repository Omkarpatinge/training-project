define(["app"],function(app) {
  app.directive('popup', function($document,$window,$timeout) {
    return {
      restrict: 'EA',
      scope: {
         dimname: '='
          },
        
      link: function(scope,element,attr) {
         
          element.data('popup',true);
          angular.element($(window)).on('mousedown',function(e) {
              var inThing =  angular.element(e.target).inheritedData('popup');
                 
              if (inThing) {
                
              }
              else {
                //console.log(scope.persons[1].people[0]);
                //scope.$apply();
                console.log('outthing popup');
               try{
                $timeout(function () {
                  scope.dimname.popupadd=false;
                }, 0);
               }
               catch(e){
                angular.element($(window)).unbind( "mousedown");
               } 
                
                
                angular.element($(window)).unbind( "mousedown");
                  
              }
            });
        }
      }
  });
})