/***	Common Elements - Header / Footer	***/
/** * Directives ** */




var app = angular.module('loginBranchManager', []);

app.controller("branchManagerController", function($scope, $log, $stateParams,
		$localStorage, $location, $state, $rootScope, $http) {
	$localStorage.currentPage = "LoginBM";
	$scope.$storage = $localStorage;
	$scope.loginBranchManager = function() {
		$http({
			method : 'put',
			url : $scope.$storage.baseURI + 'branchmanager/login',
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
				/*console.log("success : ");
				$rootScope.role = "BranchManager";
				console.log("root : " + $rootScope.role);
				$rootScope.id = response.data.id;
				$rootScope.$apply();
				$location.path("/branchManagerHome");*/
				
				
				$rootScope.role = "branchManager";		//changed branchmanager into branchManager -> Palakh
				$localStorage.id = response.data.id;
				$localStorage.role = "branchManager";	//changed branchmanager into branchManager -> Palakh
				$location.path("/branchManagerHome.verifyUnregisteredUsers.html");
			} else {
				$scope.errorMessage = "Invalid Credentials";
				$location.path("/branchManagerLogin");
			}
		}, function errorCallback(response) {
			console.log("error : ");
			console.log("error : " + response.data.error);

		});
	}

});
app.controller("branchManagerHome", function($scope, $rootScope,$localStorage) {
	$scope.$storage = $localStorage;
	$scope.id = $rootScope.id;

});
