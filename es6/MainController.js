define(['app','jquery'],function(app,$){
	console.log("MainController");
	app.controller('MainController', ['$scope','$state', function($scope,$state){
		$('h1').text("I am MainController");
		$scope.sampl=function(){
			$state.go("sample");
		}
	}])
})