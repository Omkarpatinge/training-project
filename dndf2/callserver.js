define(["app","urls"],function(app) {
	app.factory('callserver',function($http,urls) {
		return {
	        calldim: function() {
	           /*$http.get(urls.dim).then(function(response) {
				return response.data.result;
			},function(response) {
				return response;
			});*/
	        }
	    };
	})	
})