define(['app'],function(app){
	app.constant('api',{
		req:{
			url:"http://localhost:8001/api/v1/query",
			chartUrl:"http://localhost:3000/script/"
		},
		formatShort:[{
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
				}],
		formatLong:[{
					"columnNum": 1,
					"fractionDigits": 2,
					"pattern": "long"
				}, {
					"columnNum": 2,
					"fractionDigits": 2,
					"pattern": "long"
				}, {
					"columnNum": 3,
					"fractionDigits": 2,
				}],		
		chart:[
			{
				"type": "LineChart",
				"cssStyle" :"height:400px;width:100%",
				"options": {
					"focusTarget": "category",
					"showCategories": true,
					"hAxis": {
						"title":"Time",
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
									"format": ["HH:mm a ", "h:mm aa"]
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
									"format": ["HH:mm a", "h:mm aa"]
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
			},
			{
				"type": "AreaChart",
				"cssStyle" :"height:400px; width:100%;",
				"options": {
					"legend": {"position": 'none'},
					"focusTarget":"category",
					"legend":{"position":"none"},
					"hAxis": {
						"title":"Time",
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
									"format": ["HH:mm a ", "h:mm aa"]
								},
								"seconds": {
									"format": ["HH:mm:ss a", "h:mm:ss aa"]
								},
								"milliseconds": {
									"format": ["HH:mm:ss a", "h:mm:ss aa"]
								}
							}
						},
						"minorGridlines": {
							"units": {
								"hours": {
									"format": ["hh:mm:ss aa", "ha"]
								},
								"minutes": {
									"format": ["HH:mm a", "h:mm aa"]
								},
								"milliseconds": {
									"format": ["mm:ss:fff a", "h:mm:ss:fff aa"]
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
			}
		]
	});
})
