define(['app','jquery'],function(app,$){
	//console.log(app);
	app.service('requestService',function(){
		var requestedJSON={
		  "namespace": "Header Bidder",
		  "granularity": 3600000,
		  "filters": [
		    {
		      "dimension": "Customer Name",
		      "values": [
		        "Forbes.com (Mobile)",
		        "Forbes PE Project"
		      ],
		      "type": "in"
		    }
		  ],
		  "metrics": [
		    "Impressions Delivered (HB Rendered Ad)","Cookie Present (HB Rendered Ad)","Adjustment1 (HB Rendered Ad)"
		  ],
		  "dimensionObjectList": [
		    {
		      "dimension": "Cookie Flag",
		      "threshold": 5
		    },
		    {
		      "dimension": "Time",
		      "threshold": 5
		    }
		    
		  ],
		  "orderingMetric": "Impressions Delivered (HB Rendered Ad)",
		  "startTime": "2017-08-09 08:00:14",
		  "endTime": "2017-08-09 14:00:15"
		}
		var result={
	        "split": [
	            {
	                "Cookie Flag": "1",
	                "split": [
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "145289.0",
	                        "Cookie Present (HB Rendered Ad)": "145289.0",
	                        "Timestamp": "2017-08-09T13:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "87953.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "138370.0",
	                        "Cookie Present (HB Rendered Ad)": "138370.0",
	                        "Timestamp": "2017-08-09T12:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "83302.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "117605.0",
	                        "Cookie Present (HB Rendered Ad)": "117605.0",
	                        "Timestamp": "2017-08-09T11:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "69450.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "81268.0",
	                        "Cookie Present (HB Rendered Ad)": "81268.0",
	                        "Timestamp": "2017-08-09T10:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "39650.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "51356.0",
	                        "Cookie Present (HB Rendered Ad)": "51356.0",
	                        "Timestamp": "2017-08-09T09:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "28200.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "44822.0",
	                        "Cookie Present (HB Rendered Ad)": "44822.0",
	                        "Timestamp": "2017-08-09T08:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "25608.0"
	                    }
	                ],
	                "Impressions Delivered (HB Rendered Ad)": "578710.0",
	                "Cookie Present (HB Rendered Ad)": "578710.0",
	                "Adjustment1 (HB Rendered Ad)": "334163.0"
	            },
	            {
	                "Cookie Flag": "null",
	                "split": [
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "135570.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T13:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "420960.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "127626.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T12:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "453100.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "101810.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T11:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "436340.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "79153.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T10:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "386920.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "59815.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T09:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "348100.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "51899.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T08:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "318560.0"
	                    }
	                ],
	                "Impressions Delivered (HB Rendered Ad)": "555873.0",
	                "Cookie Present (HB Rendered Ad)": "0.0",
	                "Adjustment1 (HB Rendered Ad)": "2363980.0"
	            },
	            {
	                "Cookie Flag": "0",
	                "split": [
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "27935.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T13:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "2760.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "27299.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T12:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "3572.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "18450.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T11:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "3567.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "13031.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T10:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "2799.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "7902.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T09:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "2807.0"
	                    },
	                    {
	                        "Impressions Delivered (HB Rendered Ad)": "6353.0",
	                        "Cookie Present (HB Rendered Ad)": "0.0",
	                        "Timestamp": "2017-08-09T08:00:00.000Z",
	                        "Adjustment1 (HB Rendered Ad)": "2199.0"
	                    }
	                ],
	                "Impressions Delivered (HB Rendered Ad)": "100970.0",
	                "Cookie Present (HB Rendered Ad)": "0.0",
	                "Adjustment1 (HB Rendered Ad)": "17704.0"
	            }
	        ],
	        "Impressions Delivered (HB Rendered Ad)": "1235553.0",
	        "Cookie Present (HB Rendered Ad)": "578710.0",
	        "Adjustment1 (HB Rendered Ad)": "2715847.0"
	    }
		this.getReq=function(){
			return requestedJSON;
		};
		this.setReq=function(data){
			requestedJSON=data;
		}
		//(function() {console.log(this)})();
	});
	//console.log("JFKK")
})
