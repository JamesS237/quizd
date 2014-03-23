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
	
}]).controller('UserController', ['$scope', function($scope){
	
}]);
