/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewBranchManagers', []);
app.controller("viewBranchManagersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
	console.log($scope.$storage);
	var url = $scope.$storage.baseURI + 'viewBranchManagers'
	console.log(url)
	$scope.branchManagers = [];
	$http.get(url).success(function(data, status) {
	    //$scope.data = data;
	    $scope.branchManagers = data;
	    $rootScope.size=$scope.branchManagers.length;
	    console.log("rootscope "+$rootScope.size);
	    $log.log($scope.data); 
	});

});






//scrap code
/*$scope.addmanager = function() {
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'verifyUnregisteredUsers',
		headers : {
			'Content-Type' : 'application/json'
		},
	}).then(function successCallback(response) {
		var data = response.data;
		$scope.firstName = data.firstName,
		$scope.lastName=data.lastName ,
		$scope.email=data.email,
		$scope.phone=data.phone,
		$scope.address=data.address,
		$scope.dateOfBirth=data.dateOfBirth,
		$scope.userName=data.userName
		
	}, function errorCallback(response) {
		$scope.errorMessage = "Server Error. Try After Some time";
	});
}*/