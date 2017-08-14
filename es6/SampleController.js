define(['app','jquery'],function(app,$){
	console.log("SampleController");
	app.controller('SampleController', ['$scope', function($scope){
		$('h1').text("Iam SampleController");
	}])
})