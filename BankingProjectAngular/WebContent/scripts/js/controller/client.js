/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('client', []);

app.controller("clientController", function($scope, $log, $stateParams,
		$localStorage, $state, $state, $rootScope, $http) {
	$localStorage.clientId = "123456789";
	$state.go("clientHome");
});
//
// window.onbeforeunload = function() {
// localStorage.removeItem("ngStorage-role");
// localStorage.removeItem("ngStorage-id");
// }
