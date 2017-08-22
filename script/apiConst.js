'use strict';

define(['app'], function (app) {
	app.constant('api', {
		req: {
			url: "http://localhost:8001/api/v1/query",
			chartUrl: "http://localhost:3000/script/"
		},
		chart: [{
			"type": "LineChart",
			"cssStyle": "height:400px; width:300px;",
			"options": {
				"focusTarget": "category",
				"showCategories": true,
				"vAxis": {
					"format": "short"
				},
				"hAxis": {
					"gridlines": {
						"count": -1,
						"units": {
							"days": {
								"format": ["MMM dd"]
							},
							"hours": {
								"format": ["h:mm aa", "ha"]
							}
						}
					},
					"minorGridlines": {
						"units": {
							"hours": {
								"format": ["hh:mm:ss aa", "ha"]
							},
							"minutes": {
								"format": ["HH:mm a Z", "h:mm"]
							}
						}
					}
				}
			},
			"formatters": {
				"date": [{
					"columnNum": 0,
					"pattern": "MMM d, yyyy , h:mm aa"
				}],
				"number": [{
					"columnNum": 1,
					"fractionDigits": 2,
					"pattern": "short"
				}, {
					"columnNum": 2,
					"fractionDigits": 2,
					"pattern": "short"
				}, {
					"columnNum": 3,
					"fractionDigits": 2,
					"pattern": "short"
				}]
			}
		}, {
			"type": "AreaChart",
			"cssStyle": "height:400px; width:300px;",
			"options": {
				"focusTarget": "category",
				"legend": { "position": "none" },
				"vAxis": {
					"format": "short"
				},
				"hAxis": {
					"gridlines": {
						"count": -1,
						"units": {
							"days": {
								"format": ["MMM dd"]
							}
						}
					},
					"minorGridlines": {
						"units": {
							"hours": {
								"format": ["hh:mm:ss aa", "ha"]
							},
							"minutes": {
								"format": ["HH:mm a Z", "h:mm"]
							}
						}
					}
				}
			},
			"formatters": {
				"date": [{
					"columnNum": 0,
					"pattern": "MMM d, yyyy , h:mm aa"
				}],
				"number": [{
					"columnNum": 1,
					"fractionDigits": 2,
					"pattern": "short"
				}]
			}
		}]
	});
});