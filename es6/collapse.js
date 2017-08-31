define(['app','jquery'],function(app,$) {

	app.directive('collapse', ['$timeout',function($timeout){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				var selector ='.collapsed';
			   	var scope = $scope.$parent;
				var docWidth = $(document).width();
				var ul =iElm[0];
				var $ul=$(ul);
				var index=iAttrs["ul"];
				var clps=scope.cntr.clps[index];
				var offset=ul.offsetHeight;
				var scroll=ul.scrollHeight;
				var drop=false;

				$('.dropdown-toggle').on('click',function() {
					$(this).closest('.dropdown-menu').css('display', 'block');
				})
				if(scroll > offset){
					$scope.$apply(function() {
    					scope.cntr.over[index]=true;	
					})
			   		shrink();
			   	}
				$(window).resize(function(event) {
					refresh();
				});
				function shrink() {
		        	var rectUl=ul.getBoundingClientRect(),rectLi;
		          	var children = $ul.children(':not(:last-child)');
		          	var count = children.length;
		        	for(var i=(clps==0?count-1:clps-1);i>=0;i--){
		        		console.log(clps,i);
		        		rectLi=children[i].getBoundingClientRect();
		        		if(rectUl.bottom<rectLi.bottom || rectUl.right<rectLi.right){
		        			clps=i
		        		}
		        		else{
		        			$scope.$apply(function() {
		    					$scope.$parent.cntr.clps[index]=clps;	
							})
		        			break;
		        		}
		        	}
		        	children = $ul.children(':last-child');
		        	console.log(children);
		        	rectLi=children[0].getBoundingClientRect();
		        	if(rectUl.bottom<rectLi.bottom || rectUl.right<rectLi.right){
		        		clps+=1;
		        		$scope.$apply(function() {
	    					$scope.$parent.cntr.clps[index]=clps;	
						})
		        	}		
			    }
			    function grow() {
			    	var offsetW=ul.offsetWidth;
					var offsetH=ul.offsetHeight;
					var scrollW=ul.scrollWidth;
					var scrollH=ul.scrollHeight;
			        $scope.$apply(function() {
	    					scope.cntr.over[index]=false;	
			        		scope.cntr.clps[index]=0;
					})
			        if(scrollH > offsetH){
						$scope.$apply(function() {
	    					scope.cntr.over[index]=true;	
						})
				   		shrink();
				   	}
			    }
			    function refresh() {
			      	var newDocWidth = $(document).width();
			      	var diffWidth=docWidth - newDocWidth;  
			        var offsetW=ul.offsetWidth;
					var offsetH=ul.offsetHeight;
					var scrollW=ul.scrollWidth;
					var scrollH=ul.scrollHeight;
			        if (scrollH > offsetH && diffWidth>0) {
			        	$scope.$apply(function() {
	    					$scope.$parent.cntr.over[index]=true;	
						})
        				console.log("fk")	
			          	shrink();
			        }
			       	else if (diffWidth<0){
			          	grow();
			      	}
			       	docWidth = newDocWidth;
			   	}
			   	
				/*function shrink() {
					var list=iElm[0];
					var listRect = list.getBoundingClientRect();
					var listItems=list.children;
					for (var i = listItems.length; i >=0 ; i--) {
						var rectItem=listItems[i].getBoundingClientRect();
					}
				}*/
			}
		};
	}]);
	app.filter('collapseIn',function() {
		return function(input,clps) {
			if(!clps || clps==0){
				return [];
			}
			else{
				return input.filter(function(elem,index) {	
					if(index<clps){
						return false;
					}
					else{
						return true;	
					}
				});	
			}
		}
	});
	app.filter('collapseOut',function() {
		return function(input,clps) {
			if(!clps || clps==0){
				return input;
			}
			else{
				return input.filter(function(elem,index) {	
					if(index<clps){
						return true;
					}
					else{
						return false;	
					}
				});	
			}
		}
	});
})