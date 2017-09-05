define(['app','dataFactory','removeText','numberSuffix','apiConst'],function(app) {
	app.controller('chartCtrl', ['$scope','googleChartApiPromise','dataFactory','numberSuffixFilter','api','$stateParams','$state','$rootScope',
		function($scope,googleChartApiPromise,dataFactory,numberSuffixFilter,api,$stateParams,$state,$rootScope){
		var obj=this;
		obj.loaded=false;
		obj.chartLoaded=false;
		$rootScope.$broadcast("check");
		var x=JSON.parse($stateParams.req);
		//console.log(x);
		for(var i=0;i<x[1].people.length;i++){
  			if (x[1].people[i].name=='Time'&&i!=1) {
  				var timeobj=JSON.parse(JSON.stringify(x[1].people[i]));
  				x[1].people.splice(i,1);
  				x[1].people.splice(1, 0, timeobj);
  				$state.go('main.chart',{req:JSON.stringify(x)});
  			}
  		}
		var req = dataFactory.generateRequest(x);
		var format=$rootScope.val.nFormat;
		var time=req["dimensionObjectList"].some(function(elem) {
			return elem["dimension"]==="Time";
		})
		obj.addTime=function() {
			var time={
				"name":"Time",
				"type":"dimensions",
				"granularity":3600000,
				"threshold":5,
				"filterselect":false,
				"filtertype":"Relative",
				"filteroptions":[],
				"filtersearch":"6H"
			}
			x[1].people.push(time);
			//$state.go("main.chart",{req:JSON.stringify(x)});
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
    	$scope.$watch(function() {return  $rootScope.val.nFormat},function(list,old) {
			format=list;
			if(obj.status==1){
	    		buildChart();
	    	}
		})
	   	function buildChart() {
	   		//console.log(req);
			dataFactory.getLineData(req).then(function(response) {
				//console.log("res:",response)
				var res =response.data.result; 
				obj.response=response;
				if(res[req.metrics[0]]){
					loadCharts();
				}
				else{
					obj.status=4;
				}			
				//console.log(response);
			},function(error)
			{
			 	console.log("error");
				obj.status=3;
			}).finally(function() {
				obj.loaded=true;
			})
	   	}
		//console.log(obj,JSON.stringify(this))
		function loadCharts() {
			var result = obj.response.data.result;
			obj.result=result;
			for(var i=0;i<obj.metrics.length;i++){	
				var m=obj.metrics[i];
				var data=dataFactory.getDataTable(result,m,dimension);

				//console.log(data,"here");
				//debugger;
				//var dataTable=new google.visualization.arrayToDataTable(data);
	   			var chart=JSON.parse(JSON.stringify(JSONChart));
	   			//console.log(chart);
				if(format){
		    		chart.formatters.number=api.formatShort;
		    		chart.options.vAxis={
		    			"format":"short",
		    			"title":m.replace("(HB Rendered Ad)","")
		    		}
		    	}
		    	else{
		    		chart.options.vAxis={
		    			"title":m.replace("(HB Rendered Ad)","")
		    		}
		    	}
				chart.data=data;
				obj.chart[i]=chart;
			}
			googleChartApiPromise.then(function() {},function() {}).finally(function() {
				obj.chartLoaded=true;				
			})
		}
	}])
})