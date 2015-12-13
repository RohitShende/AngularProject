/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewBranches', []);
app.controller("viewBranchesController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
	console.log($scope.$storage);
	var url = $scope.$storage.baseURI + 'viewBranches'
	console.log(url)
	$scope.branches = [];
	$http.get(url).success(function(data, status) {
	    //$scope.data = data;
	    $scope.branches = data;
	    $rootScope.size=$scope.branches.length;
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