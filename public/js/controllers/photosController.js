;(function () {
	'use strict';

	angular.module('photobank')
		.controller('photosController', ['$scope', 'flickrAPI', '$stateParams', 'userProvider', 'User',
		function ($scope, flickrAPI, $stateParams, userProvider, User) {
				$scope.albumID = $stateParams.id;
				$scope.term = "one";
				$scope.result = [];

				var user = User.data;
				var options = {
					photoset_id: $scope.albumID,
					user_id: user.profile.id
				};
				flickrAPI.makeRequest(user, 'flickr.photosets.getPhotos', options)
				.then(function (data) {
					//save photos
					$scope.result = data;
				});
				

		}]);
})();