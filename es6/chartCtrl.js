define(['app','requestService','dataFactory','numberSuffix','apiConst'],function(app) {
	app.controller('chartCtrl', ['$scope','requestService','dataFactory','numberSuffixFilter','api','$stateParams','$state','$rootScope',
		function($scope,requestService,dataFactory,numberSuffixFilter,api,$stateParams,$state,$rootScope){
		var obj=this;
		$rootScope.$broadcast("check");
		var x=JSON.parse($stateParams.req);
		var req = dataFactory.generateRequest(x);

		var time=req["dimensionObjectList"].some(function(elem) {
			return elem["dimension"]==="Time";
		})
		obj.addTime=function() {
			var time={
				"name":"Time",
				"type":"dimensions",
				"threshold":5,
				"filterselect":false,
				"filtertype":"Relative",
				"filteroptions":[],
				"filtersearch":"6H"
			}
			x[1].people.push(time);
			//$state.go("main.chart",{req:JSON.stringify(x)});
			console.log(x);
			$rootScope.$broadcast("changed",JSON.stringify(x));
			//console.log("her");

			//$location.path("/chart"+JSON.stringify(x));
		}
		obj.status=0;
		obj.chart=[];
		obj.status=time?1:obj.status;
		obj.status=req["dimensionObjectList"].length>2?2:obj.status;
		obj.metrics=req["metrics"];
		var dimension=(req.dimensionObjectList[1])?req.dimensionObjectList[0].dimension:undefined;
		var chartNo,JSONChart;
		//$scope.char="";
		if(dimension){
			chartNo=0;
		}
		else{
			chartNo=1;	
		}
    	JSONChart=api.chart[chartNo];
    	if(obj.status==1){
    		buildChart(obj);
    	}
	   	function buildChart() {
	   		//console.log(req);
			dataFactory.getLineData(req).then(function(response) {
				//console.log("res:",response)
				obj.response=response;
				//console.log(response);
				loadCharts();
			},function(error)
			{
			 	console.log(error);
				obj.status=3;
			})
	   	}
		//console.log(obj,JSON.stringify(this))
		function loadCharts() {
			var result = obj.response.data.result;
			for(var i=0;i<obj.metrics.length;i++){	
				var m=obj.metrics[i];
				var title=m.replace("(HB Rendered Ad)",numberSuffixFilter(result[m],2));
				var data=dataFactory.getDataTable(result,m,dimension);
				//console.log(data,"here");
				//debugger;
				//var dataTable=new google.visualization.arrayToDataTable(data);
	   			var chart=JSON.parse(JSON.stringify(JSONChart));
	   			//console.log(chart);
				chart["options"].title=title;
				chart.data=data;
				obj.chart[i]=chart;
			}
		}
		//$scope.chart=this;
		//console.log(req);
		//var a=dataFactory.getLineData(requestService.getReq());
		//console.log(a);
	}])
})