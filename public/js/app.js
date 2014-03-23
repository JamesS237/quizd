'use strict';

var quizd = angular.module('quizd', ['ngRoute', 'ngResource']);

quizd.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'StaticController'
	}).when('/quizzes/:quizId', {
		templateUrl: 'views/quiz.html',
		controller: 'QuizController'
	}).when('/', {
		templateUrl: 'views/home.html',
		controller: 'StaticController'
	}).otherwise({
		redirectTo: '/quizzes'
	});
}]);

quizd.controller('StaticController', ['$scope', function($scope){
	
}]);
