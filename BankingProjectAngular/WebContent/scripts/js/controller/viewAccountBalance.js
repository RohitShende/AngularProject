/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewAccountBalance', []);
app.controller("viewAccountBalanceController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window, $localStorage) {

	$scope.$storage = $localStorage;
	
	console.log($localStorage.clientId);
	
	var url = $scope.$storage.baseURI + 'registeredcustomer/account/'+$scope.$storage.clientId;
	console.log(url)
	
	$scope.accountDetails=[];
	

	$http.get(url).success(function(data, status) {
	    $scope.accountDetails = data;
	    console.log("detailsssss");
	    console.log($scope.accountDetails.length);
	    
	    if($scope.accountDetails.length===1)
	    {
	    	$scope.countAccounts=1;
	    }
	});

	
	
	
	

	
});


