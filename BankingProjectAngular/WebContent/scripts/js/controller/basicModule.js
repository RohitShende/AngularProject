/***	Common Elements - Header / Footer	***/
/** * Directives ** */

(function() {
	var app = angular.module('basicModule', []);

	app.controller("logoutController", function($scope, $rootScope,
			$localStorage, $location,toaster , $http) {

		/*
		 * if ($localStorage.role == 'admin') { } else
		 * if($localStoarge.role=='branchManager'){ }
		 */
		$scope.$storage = $localStorage;
		$http({
			method : 'put',
			url : $scope.$storage.baseURI+$scope.$storage.role+"/logout",
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				role : $scope.$storage.role,
				id : $scope.$storage.id
			}
		}).then(
				function successCallback(response) {
					toaster.pop('success',"Logout","Successfully Logout");
					delete $localStorage.role;
					$location.path("\home");
					
				}, function errorCallback(response) {
					toaster.pop('success',"Logout","Successfully not Logout");
//					/delete $localStorage.role;
					$location.path("\home");
				});


	});
})();
