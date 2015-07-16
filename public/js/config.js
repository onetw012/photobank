;(function () {
	'use strict';

	angular.module('photobank')
	.config(['$stateProvider','$urlRouterProvider',
  	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('albums', {
			url: '/',
			templateUrl: './templates/photosets.html',
			resolve: {
				//get user before instantiating controller
				'User': ['userProvider', function (userProvider) {
					return userProvider.promise;
				}]
			},
			controller: 'albumController'
		})
		.state('album', {
			url: '/:id',
			templateUrl: './templates/photos.html',
			resolve: {
				//get user before instantiating controller
				'User': ['userProvider', function (userProvider) {
					return userProvider.promise;
				}]
			},
			controller: 'photosController'
		});


	}])
	.run(['$state', function ($state) {
		
	}]);
})();