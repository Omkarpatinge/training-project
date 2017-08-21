/*<script type="text/javascript" src="jquery.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  	<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
	
	<script type="text/javascript" src="angular.js"></script>
	<script type="text/javascript" src="angulardate.js"></script>
	<script type="text/javascript" src="dnd.js"></script>
	
	<script type="text/javascript" src="app.js"></script>
	<script type="text/javascript" src="MainCtrl.js"></script>
	<script type="text/javascript" src="urls.js"></script>
	<script type="text/javascript" src="searching.js"></script>
	<script type="text/javascript" src="callserver.js"></script>
	<script type="text/javascript" src="thingTest.js"></script>
	*/
	require.config({
		map:{

		},
		paths:{
			"config":"rconfig",
			"app":"app",
			"MainCtrl":"MainCtrl",
			"urls":"urls",
			"searching":"searching",
			"callserver":"callserver",
			"thingTest":"thingTest",
			"jquery":"jquery",
			"moment":"https://cdn.jsdelivr.net/momentjs/latest/moment.min",
			"bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
			"daterangepicker":"https://cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker",
			"angular":"angular",
			'angularAMD':'angularAMD.min',
			"angulardate":"angulardate",
			"dnd":"dnd"

		},
		shim:{
		 	"moment":{
		 		deps:["jquery"]
		 	},
		 	"daterangepicker":{
		 		deps:["moment"]
		 	},
		 	"angular":{
		 		export:'angular'
		 	},
		 	"angulardate":{
		 		deps:["angular","daterangepicker"]
		 	},
		 	"dnd":{
		 		deps:["angular"]	
		 	},
		 	'angularAMD': ['angular'],
		}

	})
	require(["app","MainCtrl"]);