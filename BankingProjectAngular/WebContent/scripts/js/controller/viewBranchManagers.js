/***	Common Elements - Header / Footer	***/
/** * Directives ** */

angular.module('inbApp').controller('PaginationDemoCtrl', function ($scope, $log) {
});

var app = angular.module('viewBranchManagers', []);
app.controller("viewBranchManagersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
	
	 $scope.currentPage = 0;
	 $scope.pageSize = 5;
	 $scope.numberOfPages=50;
	 $http.get('http://localhost:8080/branchmanager/').then(function(data){
		$scope.numberOfPages=$scope.branchManagers.length/$scope.pageSize;
	 });
	$scope.setPage = function (pageNo) {
		  console.log("set page called")
		  $scope.currentPage = pageNo;
	  };
	  
	  $scope.pageChanged = function() {
		  console.log("page changed"+$scope.currentPage);
		  $http.get(url+($scope.currentPage-1)*parseInt($scope.pageSize)+'/'+$scope.pageSize).success(function(data, status) {
			    //$scope.data = data;
			    $scope.branchManagers = data;
			    $rootScope.size=$scope.branchManagers.length;
			    console.log("rootscope "+$rootScope.size);
			    $log.log($scope.data); 
		});  
	    $log.log('Page changed to: ' + $scope.currentPage);
	  };
	  
	
	console.log($scope.$storage);
	var url = $scope.$storage.baseURI + 'branchmanager/'
	console.log(url)
	$scope.branchManagers = [];
	
	$http.get(url+$scope.currentPage*parseInt($scope.pageSize)+'/'+$scope.pageSize).success(function(data, status) {
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