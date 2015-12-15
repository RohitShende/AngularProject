/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('createBranch', []);
app.controller("createBranchController", function($scope, $log, $stateParams, $localStorage,
		$location, $state, $rootScope, $http, toaster) {
	$scope.$storage = $localStorage;
	$scope.createBranch = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI +'branch/',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				ifscCode : $scope.ifscCode,
				branchName : $scope.branchName,
				contact : $scope.contact,
				address : $scope.address
			}
		}).then(function successCallback(response) {
			var data = response.data;

			if (data.ifscCode == null) {
				console.log("error : " + response.data.error);
				$scope.errorMessage = "Branch Already Exists";
			} else {
				console.log("New Branch Created" + response.data);
				$location.path("/adminHome");
				toaster.pop('success', "Message", "Branch has been created succesfully!");
			
			}
		}, function errorCallback(response) {
			console.log("hello..");
			$scope.errorMessage = "Server Error. Try After Some time";
		});
	}
	
});

