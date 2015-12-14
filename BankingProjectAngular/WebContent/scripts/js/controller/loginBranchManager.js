/***	Common Elements - Header / Footer	***/
/** * Directives ** */




var app = angular.module('loginBranchManager', []);

app.controller("branchManagerController", function($scope, $log, $stateParams,
		$localStorage, $location, $state, $rootScope, $http) {
	$localStorage.currentPage = "LoginBM";
	$scope.loginBranchManager = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'loginBranchManager',
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
							
				$localStorage.id = response.data.id;
				$localStorage.role = "branchManager";
				$location.path("/branchManagerHome");
			} else {
				$scope.errorMessage = "Server Error. Try After Some time";
				$location.path("/branchManagerLogin");
			}
		}, function errorCallback(response) {
			console.log("error : ");
			console.log("error : " + response.data.error);

		});
	}

});
app.controller("branchManagerHome", function($scope, $rootScope) {
	$scope.id = $rootScope.id;

});
