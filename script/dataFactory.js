'use strict';

define(['app', "moment", 'apiConst'], function (app, moment) {
	//console.log(moment);
	app.factory('dataFactory', ['$http', 'api', function ($http, api) {
		var con = {};
		con.getLineData = function (data) {
			return $http.post(api.req.url, JSON.stringify(data));
		};
		con.getTotalData = function (data) {
			return $http.post(api.req.url, JSON.stringify(data));
		};
		con.getDataTable = function (result, metric, dimension) {
			var data = [];
			var col = [{ type: 'datetime', label: 'Timestamp', id: 'Timestamp' }];
			var timeArr;
			//console.log(result);
			if (dimension) {
				timeArr = result.split[0].split;
			} else {
				timeArr = result.split;
				col.push({ type: 'number' });
			}
			for (var i = 0; i < timeArr.length; i++) {
				if (dimension) {
					data.push([new Date(timeArr[i]["Timestamp"])]);
				} else {
					data.push([new Date(timeArr[i]["Timestamp"]), parseFloat(timeArr[i][metric])]);
				}
			}
			if (dimension) {
				var s = result.split;
				for (var i = 0; i < s.length; i++) {
					col.push({ type: "number", label: s[i][dimension], id: s[i][dimension] });
					//console.log(s); 
					var s2 = s[i]["split"];
					for (var j = 0; j < s2.length; j++) {
						data[j].push(parseFloat(s2[j][metric]));
					}
				}
			}
			data.unshift(col);
			return data;
		};
		function tab(val) {
			var t = '';
			for (var i = 0; i < val; i++) {
				t += '&emsp;&emsp;&emsp;';
			}
			return t;
		}
		con.createSplit = function (split, dimension, htmlElm, depth) {
			var temp = "";
			for (var i = 0; i < split.length; i++) {
				var currElm = split[i];
				var newHtml = htmlElm + '[' + i + ']';
				temp += '<tr>' + '<td>' + tab(depth) + split[i][dimension[depth]] + '</td>' + '<td ng-repeat="m in split.metrics">{{' + newHtml + '[m]|numberSuffix:2:val.nFormat}}</td>' + '</tr>';
				if (currElm.split) {
					temp += this.createSplit(currElm.split, dimension, newHtml + ".split", depth + 1);
				}
			}
			return temp;
		};
		con.generateRequest = function (lists) {
			var request = {
				namespace: "Header Bidder",
				granularity: "3600000",
				metrics: [],
				filters: [],
				dimensionObjectList: [],
				orderingMetric: "",
				startTime: "2017-08-09 07:51:02",
				endTime: "2017-08-09 13:51:03"
			};
			//request.filters=[];
			for (var i = 0; i < lists[0].people.length; i++) {
				if (lists[0].people[i].name == 'Time') {
					var oldstart = request.startTime;
					var oldend = request.endTime;
					if (lists[0].people[i].filtertype == 'Specific') {
						request.startTime = lists[0].people[i].filteroptions[0].startDate;
						request.endTime = lists[0].people[i].filteroptions[0].endDate;
					} else if (lists[0].people[i].filtertype == 'Relative') {
						var option = lists[0].people[i].filtersearch;
						var startTime = '';
						var endTime = moment().format('YYYY-MM-DD HH:mm:ss');
						if (option == '1H') {
							startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
						} else if (option == '6H') {
							startTime = moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
						} else if (option == '1D') {
							startTime = moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
						} else if (option == 'LCD') {
							startTime = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
							endTime = moment().format('YYYY-MM-DD 00:00:00');
						} else if (option == 'LCW') {
							startTime = moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
							endTime = moment().format('YYYY-MM-DD 00:00:00');
						} else if (option == 'LPD') {
							endTime = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
							startTime = moment().subtract(2, 'days').format('YYYY-MM-DD 00:00:00');
						} else if (option == 'LPW') {
							endTime = moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
							startTime = moment().subtract(14, 'days').format('YYYY-MM-DD 00:00:00');
						}
						request.startTime = startTime;
						request.endTime = endTime;
					}
				} else {
					var obj = {
						dimension: lists[0].people[i].name,
						values: [],
						pattern: "",
						type: lists[0].people[i].filtertype
					};
					if (lists[0].people[i].filtertype == 'regex') {
						delete obj.values;
						obj.pattern = lists[0].people[i].filtersearch;
						request.filters.push(obj);
					} else {
						var count = 0;
						delete obj.pattern;
						for (var j = 0; j < lists[0].people[i].filteroptions.length; j++) {
							if (lists[0].people[i].filteroptions[j].selected) {
								count++;
								obj.values.push(lists[0].people[i].filteroptions[j].fname);
							}
						}
						if (obj.values.length > 0 && count != 0) {
							request.filters.push(obj);
						}
					}
				}
			}
			var flagforgranularity = 0;
			for (i = 0; i < lists[1].people.length; i++) {
				if (lists[1].people[i].name === 'Time' && lists[1].people[i].granularity) {
					request.granularity = lists[1].people[i].granularity;
					flagforgranularity = 1;
				}
				request.dimensionObjectList.push({ 'dimension': lists[1].people[i].name, 'threshold': lists[1].people[i].threshold });
			}
			if (!flagforgranularity) {
				request.granularity = 3600000;
			}
			for (var i = 0; i < lists[2].people.length; i++) {
				request.metrics.push(lists[2].people[i].name.concat(" (HB Rendered Ad)"));
			}
			if (lists[2].people.length) {
				request.orderingMetric = lists[2].people[0].name.concat(" (HB Rendered Ad)");
			}
			return request;
		};
		return con;
	}]);
});