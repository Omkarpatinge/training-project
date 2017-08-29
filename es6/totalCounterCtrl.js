define(['app','jquery','requestService','dataFactory','removeText','numberSuffix'],function(app,$){
	//console.log(app);
	app.controller('totalCounterCtrl', ['$scope','requestService','dataFactory','$stateParams','$rootScope',
		function($scope,requestService,dataFactory,$stateParams,$rootScope){
		//$scope.tex="I am MainController";
		//var data=JSON.parse(decodeURIComponent($stateParams.req));
		var obj=this;
		$rootScope.$broadcast("check");
		//$rootScope.numForm="";
		obj.status=0;
		obj.loaded=false;

		var x=JSON.parse($stateParams.req);
		x[1].people=[];	
		var data=dataFactory.generateRequest(x);
		
		var metricKey=data.metrics;
		if(metricKey.length==0){
			obj.status=1;
		}
		if(obj.status==0){
			dataFactory.getTotalData(data)
				.then(function(response){
					var result=response.data.result[0]||response.data.result;
					var x={}
					for (var i = 0; i < metricKey.length; i++) {
						x[metricKey[i]]=parseFloat(result[metricKey[i]]);
					}
					console.log(x);
					obj.metricVal=x;
				}, function() {
					console.log('error');
					obj.status=2;
				}).finally(function() {
				    obj.loaded=true;
				});
		}
	}
	])
})