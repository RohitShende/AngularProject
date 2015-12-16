/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('contact', []);
app.controller("contactController", function($scope, $log, $stateParams,$localStorage,
		$location, $state, $rootScope, $http,toaster) {
	$scope.$storage = $localStorage;
	$scope.contact = function() {
		$http({
			method : 'post',
			url : $scope.$storage.baseURI +'contact',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				firstName : $scope.firstName,
				lastName : $scope.lastName,
				email : $scope.email,
				phone : $scope.phone,
				message : $scope.message
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.email != null) {
				$scope.successMessage="Your Message Submitted";
				toaster.pop('success', "Message", "Your message sent successfully!");
				$state.go("home");
				/*$scope.contactToast=function(){
					
				}*/
			
			} else {
				$scope.errorMessage = data.Exception;
				//$location.path("/contact");
				toaster.pop('error', "Message", "Sorry! Your message not sent");
				$state.go("contact");
			}		
		}, function errorCallback(response) {
			console.log("hello..");
			$scope.errorMessage = "Server Error. Try After Some time";
		});
	}
	
	

});

