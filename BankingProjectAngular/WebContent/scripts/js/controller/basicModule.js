/***	Common Elements - Header / Footer	***/
/** * Directives ** */

(function() {
	var app = angular.module('basicModule', []);

	app.controller("logoutController", function($scope, $rootScope,
			$localStorage, $location) {

		/*if ($localStorage.role == 'admin') {
		} else  if($localStoarge.role=='branchManager'){
		}*/

		delete $localStorage.role;
		$scope.$storage = $localStorage;
		$location.path("\home");
	});
})();
