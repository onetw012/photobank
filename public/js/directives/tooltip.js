;(function () {
	'use strict';

	angular.module('photobank')
	.directive('tooltip', function(){
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs){
	        	$(element).tooltip();
	        }
	    };
	});
})();