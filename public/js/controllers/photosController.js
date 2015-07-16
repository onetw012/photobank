;(function () {
	'use strict';

	angular.module('photobank')
		.controller('photosController', ['$scope', 'flickrAPI', '$stateParams', 'userProvider', 'User',
		function ($scope, flickrAPI, $stateParams, userProvider, User) {
				var user = User.data;

				$scope.albumID = $stateParams.id;
				$scope.term = "one";
				$scope.result = [];	
				$scope.userID = user.profile.id;

				var options = {
					photoset_id: $scope.albumID,
					user_id: $scope.userID
				};
				flickrAPI.makeRequest(user, 'flickr.photosets.getPhotos', options)
				.then(function (data) {
					//save photos
					$scope.result = data;
				});				

		}]);
})();