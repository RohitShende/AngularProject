/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('applicationForm1', []);

app
		.controller(
				"applicationFormForRegisteredController",
				function($scope, $log, $stateParams, $localStorage, $location,
						 $state, $rootScope, $http) {
					
					$scope.clientId = $localStorage.clientId;
					console.log("--->"+$localStorage.clientId);
					console.log("--->"+$scope.clientId);
					$scope.uploadClick = function(id) {
						$localStorage.enquiryId = $scope.enquiryId;
						$localStorage.enquiryemail = $scope.email;
						$location.path("/uploadDocument");
					};
					
					$scope.branches = [];
					$http({
						method : 'get',
						url : $scope.$storage.baseURI + 'branch/'
					})
							.then(
									function successCallback(response) {
										$scope.branches = response.data;
										console.log($scope.branches);
									});
					$http({
						method : 'get',
						url : $scope.$storage.baseURI + 'registeredcustomer/' +$scope.clientId

					}).then(function successCallback(response) {
						var data = response.data;
						if (response.data.id != null) {
							$scope.client = response.data;
							console.log($scope.client);
							delete $scope.errorMessage;
						} else {
							console.log("---->nai aiaya");
							//$scope.errorMessage = "Invalid Creditnals";
							$location.path("/home");
						}
					}, function errorCallback(response) {
						console.log("--><-->"+error);
						//$scope.errorMessage = "Server Error. Try After Some time";
						$location.path("/home");
					});
					
					
	
					$scope.apply = function() {
						console.log("-->in funcytion");
						$scope.clientId = $localStorage.clientId
						$http({
							method : 'post',
							url : $scope.$storage.baseURI + 'registeredcustomer',
							headers : {
								'Content-Type' : 'application/json'
							},
							data : {
								firstName : $scope.client.firstName,
								lastName : $scope.client.lastName,
								email : $scope.client.email,
								phone : $scope.client.phone,
								address : $scope.client.address,
								dateOfBirth : $scope.client.dateOfBirth,
								branchPOJO : {
									branchName : $scope.branhName
								},
								account : [ {
									accountType : $scope.accountType
								} ],
								customerId : $scope.clientId
							}
						})
								.then(
										function successCallback(response) {
											var data = response.data;
											if (response.data.id != null) {

												$scope.submitted = "submitted";

												$scope.successMessage = "Aplication Submitted. Your Enquiry Id : "
														+ data.id;
												$scope.enquiryId = data.id;
												$scope.email = data.email;
												delete $scope.errorMessage;
												
											} else {

												$scope.errorMessage = data.Exception;
												if (data.EnquiryId != null) {
													$scope.enquiryId = data.enquiryId;
												}
											
											}
										},
										function errorCallback(response) {

											console.log(response)
											$scope.errorMessage = "Server Error. Try After Some time";
											
											// $location
											// .path("/clientHome/applyNewAccount");
										});

					};
				});
