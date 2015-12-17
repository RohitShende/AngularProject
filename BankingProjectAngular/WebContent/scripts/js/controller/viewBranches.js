/***	Common Elements - Header / Footer	***/
/** * Directives ** */

/***	Common Elements - Header / Footer	***/
/** * Directives ** */

/*angular.module('inbApp').controller('PaginationDemoCtrl', function ($scope, $log) {
});*/

var app = angular.module('viewBranches', []);
app.controller("viewBranchesController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
		
	/*$scope.currentPage = 0;
	 $scope.pageSize = 5;
	
	 $http.get('http://localhost:8080/branch/').then(function(data){
		 console.log(data)
		$scope.numberOfPages=$scope.branches.length;
	 });
		 
	$scope.setPage = function (pageNo) {
		  console.log("set page called"+pageNo);
			  $scope.currentPage = pageNo;
	  };

	 $scope.pageChanged = function() {
		  console.log("page changed"+$scope.currentPage);
		  $http.get(url+($scope.currentPage-1)*parseInt($scope.pageSize)+'/'+$scope.pageSize).success(function(data, status) {
			    //$scope.data = data;
			    $scope.branches = data;
			    $rootScope.size=$scope.branches.length;
			    console.log("rootscope "+$rootScope.size);
			    $log.log($scope.data); 
		});  
	    $log.log('Page changed to: ' + $scope.currentPage);
	  };
*/

	console.log($scope.$storage);
	var url = $scope.$storage.baseURI + 'branch/'
	console.log(url)
	$scope.branches = [];
	
	$http.get(url/*+$scope.currentPage*parseInt($scope.pageSize)+'/'+$scope.pageSize*/).success(function(data, status) {
	    //$scope.data = data;
	    $scope.branches = data;
	    $rootScope.size=$scope.branches.length;
	    console.log("rootscope "+$rootScope.size);
	    $log.log($scope.data); 
	});

});

