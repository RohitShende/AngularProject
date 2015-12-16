/***	Common Elements - Header / Footer	***/
/** * Directives ** */

angular.module('inbApp').controller('PaginationDemoCtrl', function ($scope, $log) {
});

var app = angular.module('viewBranches', []);
app.controller("viewBranchesController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {

	  $scope.setPage = function (pageNo) {
		  console.log("set page called")
		  $scope.bigCurrentPage = pageNo;
	  };

	  $scope.pageChanged = function() {
		  console.log("page changed"+$scope.bigCurrentPage);
		  $http.get(url+parseInt($scope.bigCurrentPage)*5+"/5").success(function(data, status) {
			    //$scope.data = data;
			    $scope.branches = data;
			    $rootScope.size=$scope.branches.length;
			    console.log("rootscope "+$rootScope.size);
			    $log.log($scope.data); 
		});  
	    $log.log('Page changed to: ' + $scope.currentPage);
	  };

	  $scope.maxSize = 5;
	  $scope.bigTotalItems = 175;
	  $scope.bigCurrentPage = 1;

	console.log($scope.$storage);
	var url = $scope.$storage.baseURI + 'branch/'
	console.log(url)
	$scope.branches = [];
	
	$http.get(url+"0/5").success(function(data, status) {
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