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
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'authorisation/' + $scope.clientId,

	}).then(function successCallback(response) {
		var data = response.data;
		if (response.data.id != null) {
			if (response.data.firstTimeLogin == "true") {
				$localStorage.clientId = response.data.id;
				$location.path("/setAuthoriseData");
			} else {
				$scope.image = response.data.image;
				$scope.text = response.data.text;
			}

		} else {
			$scope.errorMessage = response.data.Exception;
			$location.path("/home");
		}
	}, function errorCallback(response) {
		$scope.errorMessage = "Server Error. Try After Some time";
		$location.path("/home");
	});

	$scope.authorise = function() {
		$http({
			method : 'put',
			url : $scope.$storage.baseURI + 'registeredcustomer/',
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
				$localStorage.firstName = response.data.firstName;
				$localStorage.role = "customer";
				$location.path("/clientHome");
			} else {
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
		$stateParams, $location, $localStorage, $state, $state, $rootScope,toaster,
		$http) {
	$scope.clientId = $localStorage.clientId;
	$scope.getActiveClass = function(id) {

		if (id === $scope.image) {
			return "active-img";
		} else {
			return "border";
		}
	}

	$scope.setauthorise = function() {

		$http({
			method : 'put',
			url : $scope.$storage.baseURI + 'registeredcustomer/',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				userName : $scope.clientId,
				password : $scope.otppassword
			}

		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.id != null) {

				// Updating password and setting authorisation imagae and
				// authorisation text
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
						toaster.pop("error","Login failed","Invalid Credentials");
						$location.path("/clientLogin");
					}
				}, function errorCallback(response) {
					toaster.pop('error',"Login failed","Invalid Credentials");
					$location.path("/clientLogin");
				});
			} else {
				console.log("Client nai hai..");
				toaster.pop('error',"Login failed","Invalid Credentials");
				$location.path("/clientLogin");
			}
		}, function errorCallback(response) {
			toaster.pop("error","Login failed","Invalid Credentials");
			$location.path("/clientLogin");
		});

	}
});

app.controller("transferMoneyController", function($scope, $log, $stateParams, $location,
		$localStorage, $state, $rootScope, $http, toaster) {

	$scope.id = $localStorage.clientId
	console.log("--->" + $scope.id + "--<>.." + $localStorage.clientId);
	$scope.accounts = null;
	$http(
			{
				method : 'get',
				url : $scope.$storage.baseURI + 'registeredcustomer/account/'
						+ $scope.id
			}).then(function successCallback(response) {
		$scope.accounts = response.data;
	}, function errorCallback(response) {
	});

	$scope.getBalance = function() {

		if ($scope.sender == "") {
			delete $scope.accBalance;
		} else {
			angular.forEach($scope.accounts, function(value, key) {

				if (value.accountNumber == $scope.sender) {
					console.log(value.balance);
					$scope.accBalance = value.balance;
					console.log($scope.accBalance);
				}
			});
		}
	}

	
	$scope.transferMoney = function() {
		$http({
			method : 'put',
			url : $scope.$storage.baseURI + 'registeredcustomer/transfer',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				clientAccount : $scope.sender,
				recevierAccount : $scope.reciever,
				amount : $scope.amount
			}
		}).then(function successCallback(response) {
			var data = response.data;
			console.log(data);
			if (response.data.Status === 'Success') {
				delete $scope.errorMessage;
				toaster.pop('success', "Money Transfer", response.data.Message);
				document.getElementById("transferMoneyForm").reset();
				$state.go("clientHome.viewAccountBalance");
			} else {
				$scope.errorMessage = response.data.Message;
				toaster.pop('error', "Money Transfer", response.data.Message);
				document.getElementById("transferMoneyForm").reset();
			}
		}, function errorCallback(response) {
			$scope.errorMessage = "Server Error. Try After Some time";
			toaster.pop('error', "Money Transfer", "Not done.Try after some time");
			document.getElementById("transferMoneyForm").reset();
		});
	}
});

