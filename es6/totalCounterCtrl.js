define(['app','jquery','requestService','dataFactory','removeText','numberSuffix'],function(app,$){

	//console.log(app);
	app.controller('totalCounterCtrl', ['$scope','requestService','dataFactory','$stateParams',
		function($scope,requestService,dataFactory,$stateParams){
		//$scope.tex="I am MainController";
		//var data=JSON.parse(decodeURIComponent($stateParams.req));
		var data=requestService.getReq();
		var metricKey=data.metrics;

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

			/*var metricVal= {
		        "Impressions Delivered (HB Rendered Ad)": "1235553.0",
		        "Adjustment1 (HB Rendered Ad)": "2715847.0",
		        "split": [
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "145289.0",
		                        "Adjustment1 (HB Rendered Ad)": "87953.0"
		                    },
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "135570.0",
		                        "Adjustment1 (HB Rendered Ad)": "420960.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "27935.0",
		                        "Adjustment1 (HB Rendered Ad)": "2760.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "308794.0",
		                "Timestamp": "2017-08-09T13:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "511673.0"
		            },
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "138370.0",
		                        "Adjustment1 (HB Rendered Ad)": "83302.0"
		                    },
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "127626.0",
		                        "Adjustment1 (HB Rendered Ad)": "453100.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "27299.0",
		                        "Adjustment1 (HB Rendered Ad)": "3572.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "293295.0",
		                "Timestamp": "2017-08-09T12:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "539974.0"
		            },
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "117605.0",
		                        "Adjustment1 (HB Rendered Ad)": "69450.0"
		                    },
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "101810.0",
		                        "Adjustment1 (HB Rendered Ad)": "436340.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "18450.0",
		                        "Adjustment1 (HB Rendered Ad)": "3567.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "237865.0",
		                "Timestamp": "2017-08-09T11:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "509357.0"
		            },
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "81268.0",
		                        "Adjustment1 (HB Rendered Ad)": "39650.0"
		                    },
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "79153.0",
		                        "Adjustment1 (HB Rendered Ad)": "386920.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "13031.0",
		                        "Adjustment1 (HB Rendered Ad)": "2799.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "173452.0",
		                "Timestamp": "2017-08-09T10:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "429369.0"
		            },
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "59815.0",
		                        "Adjustment1 (HB Rendered Ad)": "348100.0"
		                    },
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "51356.0",
		                        "Adjustment1 (HB Rendered Ad)": "28200.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "7902.0",
		                        "Adjustment1 (HB Rendered Ad)": "2807.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "119073.0",
		                "Timestamp": "2017-08-09T09:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "379107.0"
		            },
		            {
		                "split": [
		                    {
		                        "Cookie Flag": "null",
		                        "Impressions Delivered (HB Rendered Ad)": "51899.0",
		                        "Adjustment1 (HB Rendered Ad)": "318560.0"
		                    },
		                    {
		                        "Cookie Flag": "1",
		                        "Impressions Delivered (HB Rendered Ad)": "44822.0",
		                        "Adjustment1 (HB Rendered Ad)": "25608.0"
		                    },
		                    {
		                        "Cookie Flag": "0",
		                        "Impressions Delivered (HB Rendered Ad)": "6353.0",
		                        "Adjustment1 (HB Rendered Ad)": "2199.0"
		                    }
		                ],
		                "Impressions Delivered (HB Rendered Ad)": "103074.0",
		                "Timestamp": "2017-08-09T08:00:00.000Z",
		                "Adjustment1 (HB Rendered Ad)": "346367.0"
		            }
		        ]
		    }*/

			
		//console.log(out);
		//console.log(metrics);
		//var metrics=DataFactory.getTotalData(RequestService.requestedJSON)
		//console.log(metrics);
	}])
})