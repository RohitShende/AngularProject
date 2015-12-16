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

		if(response.data.Error==null)
		{
			$rootScope.userAddressDocuments = response.data;
		}
		else
		{
			$scope.addressProofErrorMessage="No address proof document has been submitted yet!"
		}
		 
		

	});
	
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'ageproofdocument/'+$stateParams.id,
	
	}).then(function successCallback(response) {
		if(response.data.Error==null)
		{
			$rootScope.userAgeDocuments = response.data;
		}
		else
		{
			$scope.ageProofErrorMessage="No age proof document has been submitted yet!"
		}
//	    if($scope.ageProofErrorMessage!=null || $scope.addressProofErrorMessage!=null)
//	    {
//	    	$scope.documentsMissing=true;
//	    }
	});

	$scope.sendEmail=function(id,applicationStatus)
	   {
		   console.log(id+" idddd"+applicationStatus+" status");
		   $http({
				method : 'put',  
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


