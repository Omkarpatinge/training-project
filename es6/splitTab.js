define(['app','jquery','requestService','dataFactory'],function(app,$) {
	app.directive('splitTab', [ 'requestService','dataFactory','$compile','$stateParams','$state',
		function(requestService,dataFactory,$compile,$stateParams,$state){
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
						'<td ng-repeat="m in $parent.split.metrics">{{result[m]|numberSuffix:2}}</td>'+
					'</tr>' ,
			// templateUrl: '',
			//replace: true,
			//transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				var x=JSON.parse($stateParams.req);
				var data=dataFactory.generateRequest(x);
				if(data.metrics.length===0){
					data.metrics=["Impressions Delivered (HB Rendered Ad)"];
					data.orderingMetric="Impressions Delivered (HB Rendered Ad)";
					console.log(JSON.stringify(data));
				}
				else{
					console.log(JSON.stringify(data));
				}
				var container=document.createElement('div');
				var dim=data['dimensionObjectList'];
				if(dim.length!=0){
					dataFactory.getTotalData(data).then(function(response) {
						var scope=$scope.$parent;
						scope.result=response.data.result;
						console.log($scope,scope);
						console.log(response);
						var x =dataFactory.createSplit(scope.result.split,scope.split.dimensions,'result.split',0);
				 		var d=$compile(x)(scope)
				 		for(var i=0;i<d.length;i++){
				 			iElm[0].appendChild(d[i]);
				 		}
				 		//console.log(x,d,d.length);								
					}, function(response){
						var scope=$scope.$parent;
						scope.split.status=2;
						console.log("error:",response);
					})
				}
				else{
					scope.status=1
				}
			}
		};
	}]);
})