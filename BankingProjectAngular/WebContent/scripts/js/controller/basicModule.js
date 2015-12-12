/***	Common Elements - Header / Footer	***/
/** * Directives ** */

(function() {
	var app = angular.module('basicModule', []);

	app.controller("logout", function($scope, $rootScope, $localStorage) {
		$rootScope.id = "";
		$rootScope.role = "Common";
		$scope.$storage = $localStorage;
		delete $localStorage.role;
	});
})();
