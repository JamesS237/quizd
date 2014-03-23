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
		controller: 'UserController'

	}).otherwise({

		redirectTo: '/'
	});

}]).controller('StaticController', ['$scope', function($scope){
	
}]).controller('QuizController', ['$scope', function($scope){
	
}]).controller('QuizListController', ['$scope', function($scope){
	
}]).controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.submit = function () {
	    $http.post('/authenticate', $scope.user).success(function (data, status, headers, config) {
	        $window.sessionStorage.token = data.token;
	        $scope.message = 'Welcome';
	      })
	      .error(function (data, status, headers, config) {
	        // Erase the token if the user fails to log in
	        delete $window.sessionStorage.token;

	        // Handle login errors here
	        $scope.message = 'Error: Invalid user or password';
	      });
	 };
}]);
