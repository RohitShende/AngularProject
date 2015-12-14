/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('createBranchManager', []);
app.controller("createBranchManagerController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
	$scope.addmanager = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'addBranchManager',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				firstName : $scope.firstName,
				lastName : $scope.lastName,
				email : $scope.email,
				phone : $scope.phone,
				address : $scope.address,
				dateOfBirth : $scope.dateOfBirth,
				userName : $scope.userName,
				password : $scope.password
			}
		}).then(function successCallback(response) {
			var data = response.data;

			if (data.Exception != null) {
				
				if(data.Exception==="InvalidInputException")
				{
					$scope.errorMessage = "Invalid Input";
				}
				else{
					$scope.errorMessage = "Already Exists";
				}
				delete $scope.errorMessage;
				
			} else {
				
				$location.path("/adminHome");
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
		});
	}

});
