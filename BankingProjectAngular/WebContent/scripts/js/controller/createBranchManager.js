/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('createBranchManager', []);
app.controller("createBranchManagerController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http, toaster) {
	
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'branch/'
	})
			.then(
					function successCallback(response) {
						if(response.data.Error == null)
							{

							$scope.branches = response.data;
							console.log($scope.branches);
							}
					});
	
	
	var today = new Date();
	$scope.today = today.toISOString();
	delete $scope.submitted;
	$scope.addManager = function() {
		$scope.branches = null;
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'branchmanager/',
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
				password : $scope.password,
				branchPOJO : {
					branchName : $scope.branchName
				}
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
				$location.path("/newBranchManager");
			} else {
				console.log("New Branch Manager Created" + response.data);
				$location.path("/adminHome");
				toaster.pop('success', "Message", "Branch Manager has been created succesfully!");
				
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
		});
	}
	
});
