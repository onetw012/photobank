;(function () {
	'use strict';

	angular.module('photobank')
	.service('flickrAPI', ['$http', function ($http) {

		/**
		 * function makes and returns object with parameters, which will
		 * be passed to the API call
		 * @param  {Object} user [provides oauth token]
		 * @param  {String} method [Flickr API method]
		 * @return {Object}
		 */
		function makeParams (user, method, options) {
			var nonce = Math.floor(Math.random() * 99999999); 
			var options = options || {};
			var params = {
				nojsoncallback: 1,
				oauth_nonce: nonce,
				format: 'json',
				oauth_consumer_key: '8066d9b1ddc440796c8c35c642410bb0',
				oauth_timestamp: new Date().getTime(),
				oauth_signature_method: 'HMAC-SHA1',
				oauth_version: 1.0,
				oauth_token: user.token,
				oauth_signature: '',
				method: method
			};
			angular.extend(params, options);
			return params;
		};

		/**
		 * function, which returns http-response from Flickr
		 * @param  {Object} user   
		 * @param  {String} method
		 * @return {Object} 
		 */
		this.makeRequest = function (user, method, options) {
			var params = makeParams(user, method, options);
			return $http({
						method: 'GET',
						url: 'https://api.flickr.com/services/rest',
						params: params
					}).then(function (response) {
						return response.data;
					});
		};

		
	}]);
})();