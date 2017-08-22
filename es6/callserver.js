define(["app","urls"],function(app) {
	app.factory('callserver',function($http,urls) {
			return {
	        calldim: function() {
	          return $http.get(urls.dim);
	        },
	        callmeas: function() {
	        	return $http.get(urls.meas);
	        },
	        callquery: function(obj){
	        	return $http.post(urls.query,obj);
	        }

	    };
	})	
})