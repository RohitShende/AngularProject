/***	Common Elements - Header / Footer	***/
/** * Directives ** */


var app = angular.module('admin', []);

app.controller("adminLoginController", function($scope, $log, $stateParams,
		$localStorage, $location, $state, $rootScope, $http) {
	
	
	$localStorage.currentPage = "LoginAdmin";
	$scope.$storage = $localStorage;
	$scope.login = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'loginAdmin',
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
				$rootScope.role = "Admin";
				$localStorage.id = response.data.id;
				$localStorage.role = "Admin";
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
app.controller("adminHome", function($scope, $localStorage, $rootScope) {
	$scope.$storage = $localStorage;
	$scope.id =$scope.$storage.id;
});
