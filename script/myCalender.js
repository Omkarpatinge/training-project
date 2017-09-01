'use strict';

define(['app', 'jquery', 'moment', 'daterangepicker'], function (app, $, moment) {
	app.directive('myCalender', function ($timeout) {
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				date: '=',
				lists: '='
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			template: '<input type="text" id="abc">\n\t\t\t<div id="date-range12-container"></div>\n\t\t\t<div class="conbtn">\n\t\t\t<button class="okbtn btn" ng-click="specificOkClicked()">OK</button>\n\t\t\t<button class="cancelbtn btn" ng-click="specificCancelClicked()"">Cancel</button>\n\t\t\t</div>',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function link(scope, iElm, iAttrs) {
				//console.log(scope,iElm,iAttrs);
				var input = $(iElm[0].childNodes[0]);

				var config = {
					separator: ' to ',
					getValue: function getValue() {
						return this.value;
					},
					setValue: function setValue(s) {
						this.value = s;
					},
					format: 'YYYY-MM-DD',
					singleMonth: true,
					inline: true,
					container: '#date-range12-container',
					alwaysOpen: true
				};

				for (var i = 0; i < scope.lists[0].people.length; i++) {
					if (scope.lists[0].people[i].name == 'Time') {
						break;
					}
				}

				input.dateRangePicker(config);
				input.data('dateRangePicker').setDateRange(scope.date.startDate, scope.date.endDate);

				scope.specificOkClicked = function () {
					try {
						var timeinput = input.val().split(' to ');
						if (timeinput.length == 2 && timeinput[0].split('-').length == 3 && timeinput[1].split('-').length == 3 && timeinput[1].split('-')[1] < 13 && timeinput[0].split('-')[1] < 13) {

							scope.date.startDate = input.val().split(' to ')[0] + ' 00:00:00';
							scope.date.endDate = input.val().split(' to ')[1] + ' 23:59:59';
							scope.lists[0].people[i].filteroptions = [];
							//console.log(scope.datePicker.date);

							scope.lists[0].people[i].filteroptions.push({
								startDate: moment(scope.date.startDate).format('YYYY-MM-DD HH:mm:ss'), endDate: moment(scope.date.endDate).format('YYYY-MM-DD HH:mm:ss')
							});
							$timeout(function () {
								console.log(scope.lists[0].people[i].filterselect);
								scope.lists[0].people[i].filterselect = false;
							}, 0);
							scope.$apply;
						}
					} catch (e) {
						alert('Not a valid date');
					}

					//console.log(moment(start).format('YYYY-MM-DD HH:mm:ss'),end);
				};

				scope.specificCancelClicked = function () {
					//console.log(start.split(' ')[0],end.split(' ')[0]);	
					input.data('dateRangePicker').setDateRange(scope.date.startDate.split(' ')[0], scope.date.endDate.split(' ')[0]);
					$timeout(function () {
						console.log(scope.lists[0].people[i].filterselect);
						scope.lists[0].people[i].filterselect = false;
					}, 0);

					scope.$apply;
				};
			}
		};
	});
});