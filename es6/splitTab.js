define(['app','jquery','requestService','dataFactory'],function(app,$) {
	app.directive('splitTab', [ 'requestService','dataFactory','$compile',
		function(requestService,dataFactory,$compile){
		// Runs during compile	
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			 scope:true, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			 template:'<tr>'+
						'<td>Total</td>'+
						'<td ng-repeat="m in metrics">{{result[m]|numberSuffix:2}}</td>'+
					'</tr>' ,
			// templateUrl: '',
			//replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				var scope=$scope.$parent;
				var container=document.createElement('div');
				dataFactory.getTotalData(requestService.getReq()).then(function(response) {
					scope.result=response.data.result;
					console.log(scope.metrics);
					var x =requestService.createSplit(scope.result.split,scope.dimensions,'result.split',0);
			 		var d=$compile(x)($scope)
			 		for(var i=0;i<d.length;i++){
			 			iElm[0].appendChild(d[i]);
			 		}
			 		//console.log(x,d,d.length);
							
				}, function(){
					console.log("error");
				})
			}
		};
	}]);
})