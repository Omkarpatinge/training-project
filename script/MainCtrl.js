"use strict";

define(["app", "moment", "jquery", 'bootstrap', "callserver", "thingTest", "searching", 'dnd', 'myCalender', "popup", "countselected", "collapse"], function (app, moment, $) {
	app.controller('MainCtrl', function ($scope, $http, callserver, $stateParams, $state, $location, $rootScope, $timeout) {
		var scope = this;
		scope.over = [false, false, false];
		scope.clps = [0, 0, 0];
		scope.loaded = false;
		scope.collapseEvent = new Event('dropCollapse');
		$rootScope.val = {
			nFormat: true
		};
		$rootScope.$on("check", function (event) {
			var cur = $state.current.name;
			if (cur === "main.total") {
				scope.total = true;
				scope.chart = false;
				scope.split = false;
			} else if (cur === "main.chart") {
				scope.total = false;
				scope.chart = true;
				scope.split = false;
			} else if (cur === "main.splitTable") {
				scope.total = false;
				scope.chart = false;
				scope.split = true;
			}
		});
		scope.datePicker = { date: { startDate: '2017-08-09 07:51:02', endDate: '2017-08-19 07:51:02' } };
		scope.request = {
			namespace: "Header Bidder",
			granularity: "3600000",
			metrics: [],
			filters: [],
			dimensionObjectList: [
				/*{
      "dimension": "Country Code",
      "threshold": 5
    }*/
			],
			orderingMetric: "",
			startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
			endTime: moment().format('YYYY-MM-DD HH:mm:ss')
		};

		scope.jreq = JSON.stringify(scope.request);
		scope.dimensions = [{
			label: "Dimensions",
			allowedTypes: ['dimensions'],
			people: [
				/*{name:saf,type:dim,threshold:5,thresholdselect}*/
			]
		}];

		scope.measures = [{
			label: "Measures",
			allowedTypes: ['Measures'],
			people: []
		}];

		callserver.calldim().then(function (response) {
			for (var i = 0; i < response.data.result.length; i++) {
				scope.dimensions[0].people.push({ name: response.data.result[i].dimensionName, type: "dimensions", granularity: 3600000, threshold: 5, thresholdselect: false, filterselect: false, clickok: false, filteroptions: [], filtertype: 'in', popupadd: false });
			}
		}, function (response) {
			console.log(response);
		});

		callserver.callmeas().then(function (response) {

			for (var i = 0; i < response.data.result.length; i++) {

				scope.measures[0].people.push({ name: response.data.result[i].alias.replace(' (HB Rendered Ad)', ''), type: "Measures" });
			}
		}, function (response) {
			console.log(response);
		});

		if ($state.params.req) {
			scope.lists = JSON.parse($state.params.req);
			for (var j = 0; j < scope.lists[1].people.length; j++) {
				scope.lists[1].people[j].thresholdselect = false;
			}

			for (j = 0; j < scope.lists[0].people.length; j++) {
				if (scope.lists[0].people[j].name != 'Time' && !scope.lists[0].people[j].clickok) {
					scope.lists[0].people.splice(j, 1);
				} else if (scope.lists[0].people[j].name == 'Time') {
					scope.lists[0].people[j].filterselect = false;
					if (scope.lists[0].people[j].filtertype === 'Specific') {
						scope.datePicker.date.startDate = scope.lists[0].people[j].filteroptions[0].startDate;
						scope.datePicker.date.endDate = scope.lists[0].people[j].filteroptions[0].endDate;
					}
				}
			}
		} else {

			scope.lists = [{
				label: "Filters",
				allowedTypes: ['dimensions'],
				people: [{ name: "Time", type: 'dimensions', granularity: 3600000, threshold: 5, filterselect: false, filtertype: 'Relative', filteroptions: [{ startDate: '2017-08-09 07:51:02', endDate: '2017-08-19 07:51:02' }], filtersearch: '6H', clickok: false }]
			}, {
				label: "Split",
				allowedTypes: ['dimensions'],
				people: []
			}, {
				label: "Values",
				allowedTypes: ['Measures'],
				people: [{ name: 'Impressions Delivered', type: "Measures" }]
			}];
		}

		$rootScope.$on("changed", function (event, args) {
			scope.lists = JSON.parse(args);
		});
		/*
  	scope.removething = function(person){
  		console.log(person);
  	}*/
		scope.refresh = function () {
			$state.go($state.current, {}, { reload: true });
		};
		scope.cancelfilterclicked = function (person, list) {
			if (person.clickok == true) {
				scope.lists = JSON.parse($state.params.req);
				for (var i = 0; i < scope.lists[0].people.length; i++) {
					scope.lists[0].people[i].filterselect = false;
				}
			} else {
				for (var i = 0; i < list.people.length; i++) {
					if (list.people[i].name == person.name) list.people.splice(i, 1);
				}
			}
		};

		scope.filterclickok = function ($event, person, list) {
			person.clickok = true;
			if (person.filtertype != 'regex') {
				var count = 0;
				var flag = 1; //Non selected	
				for (var i = 0; i < person.filteroptions.length; i++) {
					if (person.filteroptions[i].selected) {
						if (flag == 1) {
							person.firstFil = person.filteroptions[i].fname;
						}
						flag = 0; //atleast one selected
						count++;
					}
				}
				person.filtercount = count;

				if (flag) {
					for (i = 0; i < list.people.length; i++) {
						if (list.people[i].name == person.name) list.people.splice(i, 1);
					}
				} else {
					console.log('from ok filters in');
					person.clickokfor = 'in';
					person.filterselect = false;
					$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
				}
			} else {
				if (person.filtersearch === '') {
					for (i = 0; i < list.people.length; i++) {
						if (list.people[i].name == person.name) list.people.splice(i, 1);
					}
				} else {
					try {
						person.regexstring = new RegExp(person.filtersearch).toString();
						person.clickokfor = 'regex';
						person.filterselect = false;
						console.log('state.go from filter regex');
						$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
					} catch (e) {
						alert('invalid regex');
					}
				}
			}
		};
		scope.splitfilterclicked = function (list, peopleValue, event, indexlatest) {
			if (list.label === "Split" && event != null) {
				console.log('in plitf');
				console.log(arguments);
				list.people[indexlatest].thresholdselect = true;
			} else if (list.label == "Filters") {
				scope.loaded = false;
				if (peopleValue.name == 'Time') {
					peopleValue.filterselect = true;

					if (peopleValue.filtertype == 'Specific') {
						peopleValue.filteroptions = [];
						peopleValue.filteroptions.push({
							startDate: moment(scope.datePicker.date.startDate).format('YYYY-MM-DD HH:mm:ss'), endDate: moment(scope.datePicker.date.endDate).format('YYYY-MM-DD HH:mm:ss')
						});
					}
				}
				if (peopleValue.name != 'Time') {
					peopleValue.filterselect = true;
					var requestforfilter = {
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
						"dimensionObjectList": [{
							"dimension": peopleValue.name,
							"threshold": 200
						}],
						"orderingMetric": scope.lists[2].people.length > 0 ? scope.lists[2].people[0].name.concat(' (HB Rendered Ad)') : "Impressions Delivered (HB Rendered Ad)",
						"startTime": scope.request.startTime,
						"endTime": scope.request.endTime
					};
					if (scope.lists[2].people.length > 0) {
						for (var i = 0; i < scope.lists[2].people.length; i++) {
							requestforfilter.metrics.push(scope.lists[2].people[i].name.concat(" (HB Rendered Ad)"));
						}
					} else {
						requestforfilter.metrics.push("Impressions Delivered (HB Rendered Ad)");
					}

					for (var i = 0; i < indexlatest; i++) {

						if (scope.lists[0].people[i].name != 'Time') {
							var obj = {
								dimension: scope.lists[0].people[i].name,
								values: [],
								pattern: "",
								type: scope.lists[0].people[i].filtertype
							};
							if (scope.lists[0].people[i].filtertype == 'regex') {
								delete obj.values;
								obj.pattern = scope.lists[0].people[i].filtersearch;
								requestforfilter.filters.push(obj);
							} else {
								var count = 0;
								delete obj.pattern;
								for (var j = 0; j < scope.lists[0].people[i].filteroptions.length; j++) {

									if (scope.lists[0].people[i].filteroptions[j].selected) {
										count++;
										obj.values.push(scope.lists[0].people[i].filteroptions[j].fname);
									}
								}
								if (obj.values.length > 0 && count != 0) {
									requestforfilter.filters.push(obj);
								}
							}
						}
					}
					console.log(JSON.stringify(requestforfilter));
					callserver.callquery(JSON.stringify(requestforfilter)).then(function (response) {
						//peopleValue.filtertype='in';
						var filterops = []; //updating filteroptions
						for (i = 0; i < response.data.result.split.length; i++) {
							var flag = 0; //did not get the option
							for (j = 0; j < peopleValue.filteroptions.length; j++) {
								if (peopleValue.filteroptions[j].fname == response.data.result.split[i][peopleValue.name]) {
									filterops.push({ fname: response.data.result.split[i][peopleValue.name], selected: peopleValue.filteroptions[j].selected });
									flag = 1;
									break;
								}
							}
							if (!flag) {
								filterops.push({ fname: response.data.result.split[i][peopleValue.name], selected: false });
							}
						}
						peopleValue.filteroptions = [];
						for (i = 0; i < filterops.length; i++) {
							peopleValue.filteroptions[i] = filterops[i];
						}
					}, function (response) {
						console.log(response);
					}).finally(function () {
						scope.loaded = true;
					});
				}
			}
			//scope.liststhresholdselect
		};

		scope.dimzoneclicked = function (person, event) {
			console.log($(event.target).text());
			if ($(event.target).text() === 'Split') {

				var flag = 1; //does not exists already

				for (var i = 0; i < scope.lists[1].people.length; i++) {
					if (scope.lists[1].people[i].name === person.name) {
						flag = 0;
						break;
					}
				}
				if (flag) {
					scope.lists[1].people.push(person);
				}
				$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
			} else if ($(event.target).text() === 'Filters') {
				var flag = 1; //does not exists already
				console.log('in filters');
				for (var i = 0; i < scope.lists[0].people.length; i++) {
					if (scope.lists[0].people[i].name === person.name) {
						flag = 0;
						break;
					}
				}
				if (flag) {
					scope.lists[0].people.push(person);
					scope.splitfilterclicked(scope.lists[0], person, null, scope.lists[0].people.length - 1);
				}
			}
			person.popupadd = false;
		};

		scope.dropCallback = function (index, item, external, type, list, event) {
			var repl = event.toElement;
			if (repl.tagName === "UL" || repl.tagName === "LI" && !repl.innerHTML || repl.tagName === "I") {
				list.people.splice(index, 0, item);
			} else {
				if (repl.tagName === "P" || repl.tagName === "SPAN") {
					repl = repl.parentElement;
				}
				console.log(repl);
				if (repl.children[0].innerHTML.indexOf("Time") > -1 && list.label == "Filters") {
					list.people.splice(index, 0, item);
				} else {

					var rInd = angular.element(repl).index();
					list.people.splice(rInd, 1, item);
				}
			}
			var indexes = scope.containsObject(list.people, item);
			indexes.splice(indexes.indexOf(index), 1);
			if (indexes.length > 0) {
				list.people.splice(indexes[0], 1);
			}
			if (list.label === 'Filters') {
				scope.splitfilterclicked(list, item, null, index);
			}
			return true;
		};
		scope.containsObject = function (values, item) {
			var valueArr = values.map(function (item) {
				return item.name;
			});
			var indexes = [];
			var isDuplicate = valueArr.filter(function (element, index) {
				if (element === item.name) {
					indexes.push(index);
					return index;
				}
			});
			return indexes;
		};
		scope.measurezoneclicked = function (person, event) {

			var flag = 1; //does not exists already

			for (var i = 0; i < scope.lists[2].people.length; i++) {
				if (scope.lists[2].people[i].name === person.name) {
					flag = 0;
					break;
				}
			}
			if (flag) {
				scope.lists[2].people.push(person);
			}
			$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
		};
		scope.buttonsclicked = function (type) {
			if (type === 'totals') {
				//scope.lists[1].people=[];
				$state.go('main.total', { req: JSON.stringify(scope.lists) });
				//$location.path("/totals"+JSON.stringify(scope.lists));
			} else if (type === 'splitdata') {
				$state.go('main.splitTable', { req: JSON.stringify(scope.lists) });
			} else {
				$state.go('main.chart', { req: JSON.stringify(scope.lists) });
			}
		};

		scope.fullscreen = function () {

			var el = document.getElementById("makefullscreen");
			var rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

			rfs.call(el);
		};

		$scope.$watch(function () {
			return scope.lists[0];
		}, function (lists, old) {
			scope.request.filters = [];
			for (var i = 0; i < scope.lists[0].people.length; i++) {
				if (scope.lists[0].people[i].name == 'Time') {
					var oldstart = scope.request.startTime;
					var oldend = scope.request.endTime;
					if (scope.lists[0].people[i].filtertype == 'Specific') {
						try {
							scope.request.startTime = scope.lists[0].people[i].filteroptions[0].startDate;
							scope.request.endTime = scope.lists[0].people[i].filteroptions[0].endDate;
						} catch (e) {
							scope.request.startTime = moment(scope.datePicker.date.startDate).format('YYYY-MM-DD HH:mm:ss');
							scope.request.endTime = moment(scope.datePicker.date.endDate).format('YYYY-MM-DD HH:mm:ss');
						}
					} else if (scope.lists[0].people[i].filtertype == 'Relative') {
						var option = scope.lists[0].people[i].filtersearch;
						var startTime = '';
						var endTime = moment().format('YYYY-MM-DD HH:mm:ss');;
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
						scope.request.startTime = startTime;
						scope.request.endTime = endTime;
					}
					if (!(moment(oldstart).format('YYYY-MM-DD HH') === moment(scope.request.startTime).format('YYYY-MM-DD HH') && moment(oldend).format('YYYY-MM-DD HH') === moment(scope.request.endTime).format('YYYY-MM-DD HH'))) {
						console.log('satte.go from filter time');

						$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
					}
				} else {

					var obj = {
						dimension: scope.lists[0].people[i].name,
						values: [],
						pattern: "",
						type: scope.lists[0].people[i].filtertype
					};
					if (scope.lists[0].people[i].filtertype == 'regex') {
						delete obj.values;
						obj.pattern = scope.lists[0].people[i].filtersearch;
						scope.request.filters.push(obj);
					} else {
						var count = 0;
						delete obj.pattern;
						for (var j = 0; j < scope.lists[0].people[i].filteroptions.length; j++) {
							if (scope.lists[0].people[i].filteroptions[j].selected) {
								count++;
								obj.values.push(scope.lists[0].people[i].filteroptions[j].fname);
							}
						}
						if (obj.values.length > 0 && count != 0) {
							scope.request.filters.push(obj);
						}
					}
				}
			}
			if (old.people.length != lists.people.length) {
				$timeout(function () {
					$('#filterwrapper ul')[0].dispatchEvent(scope.collapseEvent);
				}, 5);
				console.log('new filter added/removed satte.go');
				$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
			}
		}, true);

		$scope.$watch(function () {
			return scope.lists[1];
		}, function (lists, old) {

			if ($state.current.name === 'main.total' && old.people.length != lists.people.length) {
				$timeout(function () {
					$('#filterwrapper ul')[1].dispatchEvent(scope.collapseEvent);
				}, 5);
			}
			if ($state.current.name === 'main.total' && old.people.length < lists.people.length && lists.people.length > 0) {
				console.log('redicreting to splitdata');
				console.log('from dimensions');
				$state.go('main.splitTable', { req: JSON.stringify(scope.lists) });
			} else {
				//for charts and splitable
				//console.log($state)
				//$state.params="somthing";
				//console.log($state.current.name);
				if ($state.current.name == 'main.chart') {

					for (var i = 0; i < scope.lists[1].people.length; i++) {
						if (scope.lists[1].people[i].name == 'Time' && i != 1) {
							var timeobj = JSON.parse(JSON.stringify(lists.people[i]));
							scope.lists[1].people.splice(i, 1);
							scope.lists[1].people.splice(1, 0, timeobj);
							break;
						}
					}
				}
				if (old.people.length != lists.people.length) {
					$timeout(function () {
						$('#filterwrapper ul')[1].dispatchEvent(scope.collapseEvent);
					}, 5);
					console.log('from dimensions old new');
					$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
				} else {
					var flagforthreshold = 0;

					//threshold not updated

					for (i = 0; i < scope.lists[1].people.length; i++) {
						if (old.people[i].thresholdselect != lists.people[i].thresholdselect) {
							flagforthreshold = 1;
							break;
						}
					}
					if (flagforthreshold == 0) {
						console.log('from dimensions thres');
						$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
					}
				}
			}
		}, true);

		$scope.$watch(function () {
			return scope.lists[2];
		}, function (lists, old) {
			if (lists.people.length != old.people.length) {
				console.log('from measures 2');
				$state.go($state.current.name, { req: JSON.stringify(scope.lists) });
				$timeout(function () {
					$('#filterwrapper ul')[2].dispatchEvent(scope.collapseEvent);
				}, 5);
			}
		}, true);

		/*$scope.$watch('scope.lists[2]',function(lists,old) {
  
  	       console.log('from measures 2');
      	  		$state.go($state.current.name,{req:JSON.stringify(scope.lists)});
  
  },true);*/
		$scope.cntr = this;
	});
});