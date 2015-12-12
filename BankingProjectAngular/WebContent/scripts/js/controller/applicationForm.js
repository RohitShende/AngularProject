/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('applicationForm', []);

app.controller("applicationFormController", function($scope, $log,
		$stateParams, $localStorage, $location, $state, $rootScope, $http) {

	$localStorage.currentPage = "LoginAdmin";
	$scope.$storage = $localStorage;
	$scope.apply = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + '/registerUser',
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
				branchPOJO : {
					branchName : $scope.branhName
				},
				account :
				{accountType : $scope.accountType}
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.id != null) {
				$scope.successMessage="Aplication Submitted";
				$location.path("/applicationFormUnregistered");
			} else {
				$scope.errorMessage = data.Exception;
				$location.path("/applicationFormUnregistered");
			}
		}, function errorCallback(response) {
			console.log(response)
			$scope.errorMessage = "Server Error. Try After Some time";
			$location.path("/applicationFormUnregistered");
		});
	}

});
