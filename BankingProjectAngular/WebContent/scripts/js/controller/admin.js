/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('admin', []);

app.controller("adminLoginController", function($scope, $log, $stateParams,
		$localStorage, $location, $state, $rootScope, $http) {
	$localStorage.currentPage = "LoginAdmin";
	$scope.$storage = $localStorage;
	console.log("--->" + $scope.$storage.baseURI);
	$scope.login = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'admin/login',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				userName : $scope.userName,
				password : $scope.password
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.id != null) {
				delete $scope.errorMessage;
				$localStorage.id = response.data.id;
				$localStorage.role = "admin";
				$location.path("/adminHome");
			} else {
				$scope.errorMessage = "Invalid Creditnals";
				$location.path("/adminLogin");
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
			$location.path("/adminLogin");
		});
	}

});
app.controller("adminHome", function($scope, $localStorage, $location, $rootScope) {
	if ($localStorage.role != "admin") {
		$location.path("/home");
	}
	$scope.$storage = $localStorage;
	$scope.id = $scope.$storage.id;

});

window.onbeforeunload = function() {
	localStorage.removeItem("ngStorage-role");
	localStorage.removeItem("ngStorage-id");
}
