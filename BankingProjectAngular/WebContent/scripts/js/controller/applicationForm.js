/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('applicationForm', []);

app
		.controller(
				"applicationFormController",
				function($scope, $log, $stateParams, $localStorage, $location,
						$state, $rootScope, $http) {
					delete $scope.submitted;
					$scope.$storage = $localStorage;
					$scope.alreadyExists = false;
					$scope.uploadClick = function(id) {
						$localStorage.enquiryId = $scope.enquiryId;
						$location.path("/uploadDocument");
					};

					$scope.checkEmail = function() {
						console.log("---------->In check");
						delete $scope.errorMessage;
						$http({
							method : 'post',
							url : $scope.$storage.baseURI + 'customer',
							data : {
								email : $scope.email
							}

						})
								.then(
										function successCallback(response) {
											
											if (response.data.alreadyExists == "true") {
												$scope.alreadyExists = "true";
												console.log("--if->"
														+ $scope.alreadyExists);
											} else {
												$scope.alreadyExists = "false";
												console.log("--else->"
														+ $scope.alreadyExists);

											}
											console.log("---------->In success"
													+ $scope.alreadyExists);
										},
										function errorCallback(response) {
											console
													.log("---------->In failure");
											$scope.errorMessage = "Server Error. Try After Some time";
										});

					}

					$scope.apply = function() {
						if ($localStorage.clientId == null) {

							$http(
									{
										method : 'post',
										url : $scope.$storage.baseURI
												+ '/registerUser',
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
											account : {
												accountType : $scope.accountType
											}
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
													delete $scope.errorMessage;
													$location
															.path("/applicationFormUnregistered");
												} else {
													$scope.errorMessage = data.Exception;
													if (data.EnquiryId != null) {
														$scope.enquiryId = data.enquiryId;
													}
													$location
															.path("/applicationFormUnregistered");
												}
											},
											function errorCallback(response) {
												console.log(response)
												$scope.errorMessage = "Server Error. Try After Some time";
												$location
														.path("/applicationFormUnregistered");
											});

						} else {
							$scope.clientId = $localStorage.clientId
							$http({
								method : 'post',
								url : $scope.$storage.baseURI + '/newaccount',
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
													console
															.log("---------->In success");
													$scope.submitted = "submitted";

													$scope.successMessage = "Aplication Submitted. Your Enquiry Id : "
															+ data.id;
													$scope.enquiryId = data.id;

													delete $scope.errorMessage;
													$state
															.go("clientHome.applyNewAccount");
												} else {
													console
															.log("---------->In exceptiion");
													$scope.errorMessage = data.Exception;
													if (data.EnquiryId != null) {
														$scope.enquiryId = data.enquiryId;
													}
													$state
															.go("clientHome.applyNewAccount");
												}
											},
											function errorCallback(response) {
												console
														.log("---------->In error");
												console.log(response)
												$scope.errorMessage = "Server Error. Try After Some time";
												$state
														.go("clientHome.applyNewAccount");
												// $location
												// .path("/clientHome/applyNewAccount");
											});

						}
					}

				});

app.controller("uploadDocuments", function($scope, $log, $stateParams,
		$localStorage, $location, $state, $rootScope, $http) {
	delete $scope.submitted;
	$localStorage.currentPage = "uploadDocument";
	$scope.$storage = $localStorage;
	if ($localStorage.enquiryId == null) {
		$scope.request = "new";
	} else {
		$scope.enquiryId = $localStorage.enquiryId;
		$scope.request = "continue";
	}
	console.log("--dfgsd->" + $scope.enquiryId);
	var url = $scope.$storage.baseURI + 'uploadDocuments';
	$scope.upload = function() {
		var fd = new FormData();
		fd.append('addressProof',
				document.getElementById("addressProof").files[0]);
		fd.append('ageProof', document.getElementById("ageProof").files[0]);
		fd.append('id', $scope.enquiryId);
		$http.post(url, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			},
		}).success(function() {
			delete $localStorage.enquiryId;
			$scope.submitted = "submitted";
			$scope.successMessage = "Your documents are successfully sent for verification. We will mail you once your provided documents are verified by us."
		}).error(function() {
			$scope.errorMessage = "Uploading failed"
		});

	}
});
window.onbeforeunload = function() {
	localStorage.removeItem("ngStorage-enquiryId");
	localStorage.removeItem("ngStorage-clientId");
}