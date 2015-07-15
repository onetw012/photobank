;(function () {
	'use strict';

	angular.module('photobank')
	.factory('userProvider', ['$http', function ($http) {

		var result = null;
		//get user from the back-end
		var promise = $http.get('/api/get-user')
		.success(function (data) {
		  result = data;
		});

		return {
		  promise: promise,
		  getUser: function () {
		      return result;
		  }
		};


	}]);
})();