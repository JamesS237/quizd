'use strict';

var quizd = angular.module('quizd', ['ngRoute', 'ngResource']);

quizd.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		templateUrl: 'views/about.html',
		controller: 'AboutController'
	}).when('/quizzes/:quizId', {
		templateUrl: 'views/quiz.html',
		controller: 'QuizController'
	}).otherwise({
		redirectTo: '/quizzes'
	});
}]);

quizd.controller('AboutController', ['$scope', function($scope){
	
}]);
