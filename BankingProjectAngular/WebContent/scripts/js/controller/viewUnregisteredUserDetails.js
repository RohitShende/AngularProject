/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewUnregisteredUsers', []);
app.controller("viewUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window,toaster) {
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'unregistereduser/'+$stateParams.id			
	}).then(function successCallback(response) {
	
		 $rootScope.userDetails = response.data;
			   
	});
	
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'addressproofdocument/'+$stateParams.id,
	
	}).then(function successCallback(response) {

		 $rootScope.userAddressDocuments = response.data;
		

	});
	
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'ageproofdocument/'+$stateParams.id,
	
	}).then(function successCallback(response) {

		 $rootScope.userAgeDocuments = response.data;
	    
	});

	$scope.sendEmail=function(id,applicationStatus)
	   {
		   console.log(id+" idddd"+applicationStatus+" status");
		   $http({
				method : 'get',  
				url : $scope.$storage.baseURI + 'unregistereduser/email/'+id+'/'+applicationStatus,
			}).then(function successCallback(response) {
				var data = response.data;
				console.log("id returned "+data.id);
			})
			
			if(applicationStatus=='verify')
			{
				toaster.pop('success', "Message", "User Verified!");
			}
			else
			{
				toaster.pop('error', "Message", "User has been rejected");
			}
			
			$state.go("branchManagerHome");
	   }

});


