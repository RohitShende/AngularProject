/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewRegisteredUsers', []);
app.controller("viewRegisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$scope.userd = $rootScope.userDetails;

	$scope.verifiedCustomers=[];
	    $http({
			method : 'get',
			url : $scope.$storage.baseURI + 'registeredcustomer/'			
		}).then(function successCallback(response) {
			
			 $scope.verifiedCustomers = response.data;
			 if( $scope.verifiedCustomers.length==0)
			 {
				 $scope.errorMessageVerified="No customers to display!";
			 }
			 
			 $log.log($scope.data);  
			 
		});
	  
	    $scope.viewVerifiedUserDetails=function(id)
		{

			 $state.go("branchManagerHome.viewVerifiedUserDetails",{id:id}); 
		}
	    
	    
	});
	
	



