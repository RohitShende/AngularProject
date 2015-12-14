/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http) {
	
	var url = $scope.$storage.baseURI + 'verifyUnregisteredUsers'
	console.log(url)
	$scope.documents = [];
	$http.get(url).success(function(data, status) {
	    //$scope.data = data;
	    $scope.documents = data;
	    $rootScope.size=$scope.documents.length;
	    console.log("rootscope "+$rootScope.size);
	    $log.log($scope.data); 
	});

	 $scope.sendEmail=function(id)
	   {
		   console.log(id);
		   $http({
				method : 'post',
				url : $scope.$storage.baseURI + 'sendRegistrationEmail',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : {
					id:id
				}
			}).then(function successCallback(response) {
				var data = response.data;
				console.log("id returned "+data.id)
			})
	   }
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