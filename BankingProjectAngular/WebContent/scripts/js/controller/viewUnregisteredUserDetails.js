/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
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
		
 
		    $state.go("branchManagerHome.viewUnregisteredUserDetails");	
	    
	});


});


