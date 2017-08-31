define(['app','dataFactory','removeText','numberSuffix','splitTab'],function(app) {
	app.controller('splitCtrl', ['$scope','dataFactory','$state','$stateParams','$rootScope', 
		function($scope,dataFactory,$state,$stateParams,$rootScope){
			var obj=this;
			obj.sort={
				name:"",
				state:0//0-nosort // 1--asc //2--dec
			}
			$rootScope.$broadcast("check");
			obj.param={req:$stateParams.req}
			obj.loaded=false;
			var x=JSON.parse($stateParams.req);
			var req=dataFactory.generateRequest(x);
			obj.metrics=req["metrics"];
			var dimensions=[]
			req["dimensionObjectList"].forEach(function(elm) {
				if(elm.dimension!=="Time"){
					dimensions.push(elm["dimension"]);
				}
				else{
					dimensions.push("Timestamp");	
				}
			})
			obj.dimensions=dimensions;
			if(req['dimensionObjectList'].length==0){
				obj.status=1;
			}
			else{
				obj.status=0;
			}
			$scope.split=obj;
		/*	$scope.getSplit=function(deep) {
				var splt;
				splt=$scope.result.spilt	
				for (var i = 0; i <deep; i++) {
					splt=splt.split;
				}
				return splt;
			}*/
		}
	])
})