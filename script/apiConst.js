'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['app'], function (app) {
	var _options;

	app.constant('api', {
		req: {
			url: "http://localhost:8001/api/v1/query",
			chartUrl: "http://localhost:3000/script/"
		},
		formatShort: [{
			"columnNum": 1,
			"fractionDigits": 2,
			"pattern": "short"
		}, {
			"columnNum": 2,
			"fractionDigits": 2,
			"pattern": "short"
		}, {
			"columnNum": 3,
			"fractionDigits": 2
		}],
		formatLong: [{
			"columnNum": 1,
			"fractionDigits": 2,
			"pattern": "long"
		}, {
			"columnNum": 2,
			"fractionDigits": 2,
			"pattern": "long"
		}, {
			"columnNum": 3,
			"fractionDigits": 2
		}],
		chart: [{
			"type": "LineChart",
			"cssStyle": "height:400px;width:100%",
			"options": {
				"focusTarget": "category",
				"showCategories": true,
				"hAxis": {
					"gridlines": {
						"count": -1,
						"units": {
							"years": {
								"format": ["YYYY"]
							},
							"months": {
								"format": ["MMM"]
							},
							"days": {
								"format": ["MMM dd"]
							},
							"hours": {
								"format": ["h:mm aa", "ha"]
							},
							"minutes": {
								"format": ["HH:mm a ", "h:mm"]
							},
							"seconds": {
								"format": ["HH:mm:ss a", "h:mm:ss"]
							},
							"milliseconds": {
								"format": ["HH:mm:ss a", "h:mm:ss"]
							}
						}
					},
					"minorGridlines": {
						"units": {
							"hours": {
								"format": ["hh:mm:ss aa", "ha"]
							},
							"minutes": {
								"format": ["HH:mm a", "h:mm"]
							},
							"milliseconds": {
								"format": ["mm:ss:fff a", "h:mm:ss:fff"]
							}

						}
					}
				}
			},
			"formatters": {
				"date": [{
					"columnNum": 0,
					"pattern": "MMM d, yyyy , h:mm aa"
				}]
			}
		}, {
			"type": "AreaChart",
			"cssStyle": "height:400px; width:100%;",
			"options": (_options = {
				"legend": { "position": 'none' },
				"focusTarget": "category"
			}, _defineProperty(_options, 'legend', { "position": "none" }), _defineProperty(_options, "hAxis", {
				"gridlines": {
					"count": -1,
					"units": {
						"years": {
							"format": ["YYYY"]
						},
						"months": {
							"format": ["MMM"]
						},
						"days": {
							"format": ["MMM dd"]
						},
						"hours": {
							"format": ["h:mm aa", "ha"]
						},
						"minutes": {
							"format": ["HH:mm a ", "h:mm"]
						},
						"seconds": {
							"format": ["HH:mm:ss a", "h:mm:ss"]
						},
						"milliseconds": {
							"format": ["HH:mm:ss a", "h:mm:ss"]
						}
					}
				},
				"minorGridlines": {
					"units": {
						"hours": {
							"format": ["hh:mm:ss aa", "ha"]
						},
						"minutes": {
							"format": ["HH:mm a", "h:mm"]
						},
						"milliseconds": {
							"format": ["mm:ss:fff a", "h:mm:ss:fff"]
						}

					}
				}
			}), _options),
			"formatters": {
				"date": [{
					"columnNum": 0,
					"pattern": "MMM d, yyyy , h:mm aa"
				}]
			}
		}]
	});
});