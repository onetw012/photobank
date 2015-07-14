;(function () {
	'use strict';

	angular.module('photobank')
		.controller('albumController', ['$scope', '$http',
		function ($scope, $http) {
				$scope.model = "hi!";
				$scope.term = "";
				$scope.result = [];

				var api_key = '8066d9b1ddc440796c8c35c642410bb0';

				function makeRequest (params) {
					$http({
						method: 'GET',
						url: 'https://api.flickr.com/services/rest',
						params: params
					})
					.success(function (data) {
						$scope.result = data;
						console.log($scope.result);
					})
					.error(function (error) {
						$scope.result = {};
					});
				}

				function makeSignature (params) {
					var str = 'https://api.flickr.com/services/rest?';
					for (var prop in params) {
						if(params.hasOwnProperty(prop)){
							str += prop + '=' + params[prop] + '&';
						}
					}
					str = str.substring(0, str.length - 1);
					/*console.log(str);*/
					return str;
				}

				$http.get('/api/get-user')
				.success(function (user) {
					$scope.greeting = "Hello, " + user.profile.fullName + "!";
					$scope.userID = user.id;

					var nonce = Math.floor(Math.random() * 99999999); 
					var params = {
						nojsoncallback: 1,
						oauth_nonce: nonce,
						format: 'json',
						oauth_consumer_key: api_key,
						oauth_timestamp: new Date().getTime(),
						oauth_signature_method: 'HMAC-SHA1',
						oauth_version: 1.0,
						oauth_token: user.token,
						oauth_signature: '',
						method: 'flickr.photosets.getList'
					};
					//makeSignature(params);
					makeRequest(params);

				})
				.error(function (error) {
					console.log(error);
				});


/*				$scope.search = function (term) {
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
				};*/
		}]);
})();