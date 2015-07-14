;(function () {
	'use strict';

	angular.module('photobank')
		.controller('albumController', ['$scope', '$http',
		function ($scope, $http) {
				$scope.model = "hi, Flickr";
				$scope.term = "";
				$scope.result = [];
				$scope.search = function (term) {
					$http({
						method: 'GET',
						url: 'https://api.flickr.com/services/rest',
						params: {
							method: 'flickr.photos.search',
							api_key: '8066d9b1ddc440796c8c35c642410bb0',
							text: $scope.term,
							format: 'json',
							nojsoncallback: 1
						}
					})
					.success(function (data) {
						$scope.result = data;
					})
					.error(function (error) {
						console.log(error);
					});
				};
		}]);
})();