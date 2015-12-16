/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('client', []);

app.controller("clientController", function($scope, $log, $stateParams,
		$location, $localStorage, $state, $state, $rootScope, $http) {
	// $scope.image = $localStorage.image;delete $localStorage.image;
	// $scope.text = $localStorage.text;delete $localStorage.text;
	// $scope.clientId = $localStorage.clientId;delete $localStorage.clientId;
	
});

app.controller("clientLoginControllers", function($scope, $log, $stateParams,
		$location, $localStorage, $state, $state, $rootScope, $http) {
	if ($localStorage.clientId == null) {
		$location.path("/home");
	}
	$scope.clientId = $localStorage.clientId;
	$localStorage.clientId;

	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'authorisation/' + $scope.clientId,

	}).then(function successCallback(response) {
		var data = response.data;
		if (response.data.id != null) {
			console.log("---first logi->"+response.data.firstTimeLogin);
			if (response.data.firstTimeLogin == "true") {
				$localStorage.clientId = response.data.id;
				$location.path("/setAuthoriseData");
			} else {
				$scope.image = response.data.image;
				$scope.text = response.data.text;
				console.log("Client hai..");
			}

		} else {
			console.log("Client nai hai..");
			$scope.errorMessage = response.data.Exception;
			$location.path("/home");
		}
	}, function errorCallback(response) {
		$scope.errorMessage = "Server Error. Try After Some time";
		$location.path("/home");
	});

	$scope.authorise = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'registeredcustomer/login',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {

				userName : $scope.clientId,
				password : $scope.password
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.id != null) {
				$scope.image = response.data.image;
				$scope.text = response.data.text;
				console.log("Client hai..");
				$location.path("/clientHome");
			} else {
				console.log("Client nai hai..");
				$scope.errorMessage = response.data.Exception;
				$location.path("/clientLogin");
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
			$location.path("/clientLogin");
		});

	};

});

app.controller("clientSetAuthoriseDataControllers", function($scope, $log,
		$stateParams, $location, $localStorage, $state, $state, $rootScope,
		$http) {
	$scope.clientId = $localStorage.clientId;
	$scope.setauthorise = function() {
		$http({
			method : 'put',
			url : $scope.$storage.baseURI + 'authorisation',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				authorizedImageName : $scope.image,
				authorizedImageText : $scope.text,
				customerId : $scope.clientId,
				password : $scope.password
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.id != null) {
				console.log("data Inserted hai..");
				$scope.successMessage = "Info Updated."
			} else {
				console.log("Client nai hai..");
				$scope.errorMessage = response.data.Exception;
				$location.path("/clientLogin");
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
			$location.path("/clientLogin");
		});
	}
});

//
// window.onbeforeunload = function() {
// localStorage.removeItem("ngStorage-role");
// localStorage.removeItem("ngStorage-id");
// }
