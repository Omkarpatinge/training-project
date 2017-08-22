define(['app','jquery','requestService','dataFactory','removeText','numberSuffix'],function(app,$){
	//console.log(app);
	app.controller('totalCounterCtrl', ['$scope','requestService','dataFactory','$stateParams',
		function($scope,requestService,dataFactory,$stateParams){
		//$scope.tex="I am MainController";
		//var data=JSON.parse(decodeURIComponent($stateParams.req));
		$scope.status=0;

		var x=JSON.parse($stateParams.req);
		var data=dataFactory.generateRequest(x);
		
		var metricKey=data.metrics;
		if(metricKey.length==0){
			$scope.status=1;
		}
		if($scope.status==0){
			dataFactory.getTotalData(data)
				.then(function(response){
					var result=response.data.result[0]||response.data.result;
					var x={}
					for (var i = 0; i < metricKey.length; i++) {
						x[metricKey[i]]=parseFloat(result[metricKey[i]]);
					}
					console.log(x);
					$scope.metricVal=x;
				}, function() {
					console.log('error');
				});
		}
	}
	])
})