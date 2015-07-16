;(function () {
	'use strict';

	angular.module('photobank')
		.controller('albumController', ['$scope', 'flickrAPI', 'userProvider', 'User',
		function ($scope, flickrAPI, userProvider, User) {

				var user = User.data;
				console.log(User.data);
				$scope.result = [];

				$scope.greeting = "Hello, " + user.profile.fullName + "!";
				$scope.userID = user.profile.id;
				
				//make authorized API call to Flickr
				flickrAPI.makeRequest(user, 'flickr.photosets.getList')
				.then(function (data) {
					//save photosets
					$scope.result = data;
				});

		}]);
})();