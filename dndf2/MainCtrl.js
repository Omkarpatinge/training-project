define(["app","moment","callserver","thingTest","<searching>		</searching>"],function(app,moment) {
	app.controller('MainCtrl', function($scope,$http,callserver){
	   	$scope.datePicker = { date: {startDate:null,endDate: null} };
	    $scope.request={   	
		  	namespace: "Header Bidder",
		  	granularity:"3600000",
		  	metrics: [],
		  	dimensionObjectList: [
		    /*{
		      "dimension": "Country Code",
		      "threshold": 5
		    }*/
		  	],
		  	orderingMetric: "",
		  	startTime: "2017-08-09 07:51:02",
		  	endTime: "2017-08-09 13:51:03"
	    };
	    $scope.jreq=JSON.stringify($scope.request);
	    $scope.dimensions=[{
	        label: "Dimensions",
	        allowedTypes: ['dimensions'],
	        people: [
	        	/*{name:saf,type:dim,threshold:5,thresholdselect}*/
	        ]
	 	}];
	    $scope.measures=[{
	        label: "Measures",
	        allowedTypes: ['Measures'],
	        people: []
	    }];  	
		$http.get("http://localhost:8001/api/v1/metadata/HB%20Rendered%20Ad/dimensions")
		.then(function(response) {
			for (var i=0;i<response.data.result.length;i++) {		
				$scope.dimensions[0].people.push({name:response.data.result[i].dimensionName,type:"dimensions",threshold:5,thresholdselect:false,filterselect:false,filteroptions:[],filtertype:'in'});
			}	
		},function(response) {
			console.log(response);
		});
		$http.get("http://localhost:8001/api/v1/metadata/HB%20Rendered%20Ad/metrics")
		.then(function(response) {	
			for (var i=0;i<response.data.result.length;i++) {	
				$scope.measures[0].people.push({name:(response.data.result[i].alias).replace(' (HB Rendered Ad)',''),type:"Measures"});
			}
		},function(response) {
			console.log(response);
		});
	    $scope.lists = [{
	    	label: "Splits",
	       	allowedTypes: ['dimensions'],
	        people: []
	   	},
	  	{
	   	  	label: "Measures",
	      	allowedTypes: ['Measures'],
	    	people: []
	  	},
	   	{
	        label: "Filters",
	        allowedTypes: ['dimensions'],
	        people: [
	            {name: "Time", type: 'dimensions',threshold:5,filterselect:false,filtertype:'Relative',filteroptions:[/*{fname:'',selected:true}*/],filtersearch:'6H'}
	        ]
	    }];
	    $scope.filterclickok =function($event,person,list){
		    if(person.filtertype!='regex'){
		    flag=1;	//Non selected	
		    	for(var i=0;i<person.filteroptions.length;i++){
		    		if (person.filteroptions[i].selected) {
		    			flag=0;//atleast one selected
		    			break;
		    		}
		    	}
		    	if(flag){
		    		for (i = 0; i < list.people.length; i++) {
		    			if(list.people[i].name==person.name)
		    				list.people.splice(i,1);	
		    		}
		    	} 	
		    }
		    person.filterselect=false; 
	    }
	    $scope.setspecificdate= function(person){
	    	person.filteroptions=[];
	    	//console.log($scope.datePicker.date);
	    	try{
	    	person.filteroptions.push({
	    		startDate: $scope.datePicker.date.startDate.format('YYYY-MM-DD HH:mm:ss'),endDate:$scope.datePicker.date.endDate.format('YYYY-MM-DD HH:mm:ss')
	    	});
	    	person.filterselect=false;
	    	person.filtersearch="";
	    	}
	    	catch(e){
	    		alert('select some date');
	    	}
	    }
	    $scope.filterclickcan= function($event,person,list){
	    }
	    $scope.splitfilterclicked = function(event,list,peopleValue){
	    	if (list.label=="Splits") {
	    		list.people[$(event.target).closest('li').index()].thresholdselect=true;
	    	}
	    	else if (list.label=="Filters") {
	    		if (peopleValue.name=='Time') {
	    			peopleValue.filterselect=true;
	    			if(peopleValue.filtertype=='Specific'){
		    			peopleValue.filteroptions=[];
		    			peopleValue.filteroptions.push({
		    				startDate: $scope.datePicker.date.startDate.format('YYYY-MM-DD HH:mm:ss'),endDate:$scope.datePicker.date.endDate.format('YYYY-MM-DD HH:mm:ss')	
		    			});
	    			}
	    		}
	    		if ($scope.lists[1].people.length>0 && peopleValue.name!='Time') {
	    			peopleValue.filterselect=true;
	    			var requestforfilter={
					  	"namespace": "Header Bidder",
					  	"metrics": [],
					  	"filters": [
					    /*{
					      "dimension": "Customer Name",
					      "values": [
					        "Forbes.com (Mobile)",
					        "Forbes PE Project"
					      ],
					      "type": "in"
					    }*/],
					  	"dimensionObjectList": [
						    {
						      "dimension": peopleValue.name,
						      "threshold": 200
						    }
					  	],
					  	"orderingMetric": $scope.lists[1].people[0].name.concat(' (HB Rendered Ad)'),
					  	"startTime": $scope.request.startTime,
					  	"endTime": $scope.request.endTime	
					};
					for (var i =0;i< $scope.lists[1].people.length; i++) {
				   		requestforfilter.metrics.push($scope.lists[1].people[i].name.concat(" (HB Rendered Ad)"));		
				  	}			        	
					for (var i = 0; i < $(event.target).closest('li').index(); i++) {	
						if($scope.lists[2].people[i].name!='Time'){
							let obj={
									dimension: $scope.lists[2].people[i].name,
									values:[],
									type:$scope.lists[2].people[i].filtertype
							};
							if ($scope.lists[2].people[i].filtertype=='regex') {
								obj.values.push($scope.lists[2].people[i].filtersearch);
							}
							else{
								var count=0;
								for(var j=0;j<$scope.lists[2].people[i].filteroptions.length;j++){		
									if ($scope.lists[2].people[i].filteroptions[j].selected) {
										count++;
										obj.values.push($scope.lists[2].people[i].filteroptions[j].fname);
									}
								}
							}
							if (obj.values.length>0&&count==0	) {
								requestforfilter.filters.push(obj);	
							}					
						}
					}
					console.log(JSON.stringify(requestforfilter));
					$http.post("http://localhost:8001/api/v1/query",JSON.stringify(requestforfilter))
					.then(function(response){
						console.log(response);
						peopleValue.filtertype='in';
						var filterops=[]; //updating filteroptions
						for (i = 0; i < response.data.result.split.length; i++) {
							var flag=0;//did not get the option
							for(j=0;j<peopleValue.filteroptions.length;j++){
								if(peopleValue.filteroptions[j].fname==response.data.result.split[i][peopleValue.name]){
									filterops.push({fname:response.data.result.split[i][peopleValue.name],selected:peopleValue.filteroptions[j].selected});
									flag=1;
									break;
								}
							}
							if(!flag){
								filterops.push({fname:response.data.result.split[i][peopleValue.name],selected:false});
							}
						}
						peopleValue.filteroptions=[];
						for (i = 0; i < filterops.length; i++) {
							peopleValue.filteroptions[i]=filterops[i];
						}
					},function(response){
						console.log(response);
					});
				}	
	    	}
	    	//$scope.liststhresholdselect
	    }
	   	$scope.dropCallback= function(index, item, external, type,list){
	    	var indexes=$scope.containsObject(list.people,item);
	    	indexes.splice(indexes.indexOf(index),1);
	    	if(indexes.length>0){
	    		list.people.splice(indexes[0],1);
		   }
	   	}
	   	$scope.containsObject=function(values,item) {
			var valueArr = values.map(function(item){ return item.name });  
		    var indexes=[];
			var isDuplicate = valueArr.filter(function(element, index){
				if (element===item.name) {
				    indexes.push(index);
				   	return index;
				}  
			});
			return indexes;	
		}
	    // Model to JSON for demo purpose
	    $scope.$watch('lists', function(lists,listsold) {
	    	//Keep watch for splits and measures
	        $scope.listsAsJson = angular.toJson(lists, true);       
	        $scope.request.metrics=[];
	        $scope.request.dimensionObjectList=[];
	        var flagforgranularity=0;
	        for (var i =0;i< $scope.lists[1].people.length; i++) {
	        	$scope.request.metrics.push($scope.lists[1].people[i].name.concat(" (HB Rendered Ad)"));		
	        }
	        for (i =0;i< $scope.lists[0].people.length; i++) {
	        	if ($scope.lists[0].people[i].name==='Time'&&$scope.lists[0].people[i].granularity) {
	        		$scope.request.granularity=$scope.lists[0].people[i].granularity;
	        		flagforgranularity=1;
	        	}
	        	$scope.request.dimensionObjectList.push({'dimension':$scope.lists[0].people[i].name,'threshold':$scope.lists[0].people[i].threshold});		
	        }
	        if ($scope.lists[1].people.length) {
	        $scope.request.orderingMetric=$scope.lists[1].people[0].name.concat(" (HB Rendered Ad)");
	        }
	        if (!flagforgranularity) {
	        $scope.request.granularity=3600000;
	        }
	       	for (var i = 0; i < $scope.lists[2].people.length; i++) {
				if ($scope.lists[2].people[i].name=='Time') {
					if ($scope.lists[2].people[i].filtertype=='Specific') {
						$scope.request.startTime=$scope.lists[2].people[i].filteroptions[0].startDate;
						$scope.request.endTime=$scope.lists[2].people[i].filteroptions[0].endDate;		
					}
					else if ($scope.lists[2].people[i].filtertype=='Relative'){
						var option=$scope.lists[2].people[i].filtersearch;
						var startTime= moment().format('YYYY-MM-DD HH:mm:ss');
						var endTime='';
						if (option=='1H') {
							endTime=moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
						}
						else if (option=='6H') {
							endTime=moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');	
						}
						else if (option=='1D') {
							endTime=moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');	
						}
						else if (option=='LCD') {
							startTime=moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
							endTime=moment().format('YYYY-MM-DD 00:00:00');
							
						}
						else if (option=='LCW') {
							endTime=moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
							startTime=moment().format('YYYY-MM-DD 00:00:00');
							
						}
						else if (option=='LPD') {
							endTime=moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
							startTime=moment().subtract(2, 'days').format('YYYY-MM-DD 00:00:00');
						}
						else if (option=='LPW') {
							endTime=moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
							startTime=moment().subtract(14, 'days').format('YYYY-MM-DD 00:00:00');
						}
						$scope.request.startTime=startTime;
						$scope.request.endTime=endTime;
					}
					break;
				}				
			}
	    }, true);
	});
})
