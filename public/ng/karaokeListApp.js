var app = angular.module("karaokeListApp", ['ngAnimate','ngRoute'])

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "../views/waitlist.htm",
		controller: "listDisplayCtrl"
	})
	.when("/request", {
		templateUrl: "../views/request.htm"
	})
});