/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewRegisteredUserDetails', []);
app.controller("viewRegisteredUserDetailsController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {

			$http({
				method : 'get',
				url : $scope.$storage.baseURI + 'registeredcustomer/details/'+$stateParams.id			
			}).then(function successCallback(response) {
				
				 $rootScope.verifiedCustomerDetails = response.data;

			});

	});
	
	



