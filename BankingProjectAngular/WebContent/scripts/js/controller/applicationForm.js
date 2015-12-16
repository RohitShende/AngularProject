/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('applicationForm', []);

app
		.controller(
				"applicationFormController",
				function($scope, $log, $stateParams, $localStorage, $location,
						$state, $rootScope, $http) {
					var today = new Date();
					$scope.today = today.toISOString();
					delete $scope.submitted;
					$scope.$storage = $localStorage;
					$scope.alreadyExists = false;
					$scope.uploadClick = function(id) {
						$localStorage.enquiryId = $scope.enquiryId;
						$localStorage.enquiryemail = $scope.email;
						$location.path("/uploadDocument");
					};

					$scope.checkEmail = function() {

						delete $scope.errorMessage;
						$http(
								{
									method : 'get',
									url : $scope.$storage.baseURI
											+ 'unregistereduser?email='
											+ $scope.email,
								})
								.then(
										function successCallback(response) {

											if (response.data.alreadyExists == false) {
												$scope.alreadyExists = "false";
											} else {
												if (response.data.id != null) {
													$scope.alreadyExists = "true";
												} else {
													$scope.alreadyExists = "false";
												}
											}

										},
										function errorCallback(response) {

											$scope.errorMessage = "Server Error. Try After Some time";
										});

					};

					$scope.apply = function() {

						$http(
								{
									method : 'post',
									url : $scope.$storage.baseURI
											+ '/unregistereduser/',
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

												$scope.successMessage = "Aplication Submitted. Please upload the address proof and age proof . Your point of contact is your email :"
														+ data.email;
												$scope.enquiryId = data.id;
												$scope.enquiryemail = data.email;
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

					};
				});

app
		.controller(
				"uploadDocuments",
				function($scope, $log, $stateParams, $localStorage, $location,
						$state, $rootScope, $http) {
					delete $scope.submitted;
					$localStorage.currentPage = "document";
					$scope.checkEmail = function() {

						delete $scope.errorMessage;
						$http(
								{
									method : 'get',
									url : $scope.$storage.baseURI
											+ 'unregistereduser?email='
											+ $scope.email,
								})
								.then(
										function successCallback(response) {

											if (response.data.alreadyExists == false) {
												$scope.alreadyExists = "false";
											} else {
												if (response.data.id != null) {
													$scope.alreadyExists = "true";
												} else {
													$scope.alreadyExists = "false";
												}
											}

										},
										function errorCallback(response) {

											$scope.errorMessage = "Server Error. Try After Some time";
										});

					};

					$scope.$storage = $localStorage;
					if ($localStorage.enquiryId == null) {
						$scope.request = "new";
					} else {
						$scope.enquiryId = $localStorage.enquiryId;
						$scope.enquiryemail = $localStorage.enquiryemail;
						$scope.request = "continue";
					}
					var url = $scope.$storage.baseURI + 'document';
					$scope.upload = function() {
						var fd = new FormData();
						fd.append('addressProof', document
								.getElementById("addressProof").files[0]);
						fd.append('ageProof', document
								.getElementById("ageProof").files[0]);
						fd.append('email', $scope.enquiryemail);
						$http
								.post(url, fd, {
									transformRequest : angular.identity,
									headers : {
										'Content-Type' : undefined
									},
								})
								.success(
										function() {
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
	localStorage.removeItem("ngStorage-enquiryemail");
	localStorage.removeItem("ngStorage-clientId");
}