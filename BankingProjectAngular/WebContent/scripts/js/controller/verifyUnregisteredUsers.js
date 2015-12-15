/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$scope.userd = $rootScope.userDetails;
	var url = $scope.$storage.baseURI + 'unregisteredusers'
	console.log(url)
	$scope.documents = [];
	$http.get(url).success(function(data, status) {
	    //$scope.data = data;
	    $scope.documents = data;
	    $rootScope.size=$scope.documents.length;
	    console.log("rootscope "+$rootScope.size);
	    $log.log($scope.data); 
	});

	$scope.viewUnregisteredUserDetails=function(id)
	{

		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'unregisteredusers/'+id			
		}).then(function successCallback(response) {
		
			 $rootScope.userDetails = response.data;
			
			   
		});
		
		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'addressproofdocument/'+id,
		
		}).then(function successCallback(response) {
	
			 $rootScope.userAddressDocuments = response.data;
			

		});
		
		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'ageproofdocument/'+id,
		
		}).then(function successCallback(response) {
	
			 $rootScope.userAgeDocuments = response.data;
			
	 
			    $state.go("branchManagerHome.viewUnregisteredUserDetails");	//used to go from one state to another $window.location and $location.path don't seem to work in this situation 
		})
		
	}
	
	$scope.sendEmail=function(id)
	   {
		   console.log(id);
		   $http({
				method : 'get',
				url : $scope.$storage.baseURI + 'unregisteredusers/email/'+id,
			}).then(function successCallback(response) {
				var data = response.data;
				console.log("id returned "+data.id);
			})
	   }
});


