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
			"moment":"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min",
			"bootstrap":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
			"daterangepicker":"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/2.1.25/daterangepicker.min",
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