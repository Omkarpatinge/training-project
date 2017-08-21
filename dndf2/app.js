define(["angularAMD","dnd","angulardate"],function(angularAMD) {
	var app = angular.module('sam',['dndLists','daterangepicker']);
	console.log("dwdw");
	app.config([function() {
		
	}])
	//return app;
	return angularAMD.bootstrap(app);
		
})