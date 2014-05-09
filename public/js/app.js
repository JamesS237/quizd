'use strict';

var quizd = angular.module('quizd', ['ngRoute', 'ngResource']);

quizd.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {

		templateUrl: 'views/home.html',
		controller: 'StaticController'

	}).when('/about', {

		templateUrl: 'views/about.html',
		controller: 'StaticController'

	}).when('/quizzes', {

		templateUrl: 'views/quizlist.html',
		controller: 'QuizListController'

	}).when('/quiz/:quizId', {

		templateUrl: 'views/quiz.html',
		controller: 'QuizController'

	}).when('/signin', {

		templateUrl: 'views/signin.html',
		controller: 'SigninController'

	}).when('/signup', {

		templateUrl: 'views/signup.html',
		controller: 'SignupController'

	}).otherwise({

		redirectTo: '/'
	});

}]).controller('StaticController', ['$scope', function($scope) {
	
}]).controller('QuizController', ['$scope', function($scope) {
	
}]).controller('QuizListController', ['$scope', function($scope) {
	
}]).controller('SigninController', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
	$scope.submit = function () {
		$http.post('/authenticate', $scope.user).success(function (data) {
			$window.sessionStorage.token = data.token;
			$rootScope.username = 'Hi, ' + data.email.split('@')[0];
		}).error(function () {
			delete $window.sessionStorage.token;
		});
	};
}]).controller('SignupController', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
	$scope.submit = function () {
		$http.post('/signup', $scope.user).success(function (data) {
			$window.sessionStorage.token = data.token;
			$rootScope.username = 'Hi, ' + data.email.split('@')[0];
			}).error(function () {
			delete $window.sessionStorage.token;
		});
	};
}]);
