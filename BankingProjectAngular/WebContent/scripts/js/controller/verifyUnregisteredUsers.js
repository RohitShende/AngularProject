/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$scope.userd = $rootScope.userDetails;
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

	$scope.viewUnregisteredUserDetails=function(id)
	{

		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'viewUnregisteredUsers',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				id:id
			}
		}).then(function successCallback(response) {
		
			 $rootScope.userDetails = response.data;
			
			   
		});
		
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'retrieveAddressProofDocuments',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				id:id
			}
		}).then(function successCallback(response) {
	
			 $rootScope.userAddressDocuments = response.data;
			

		});
		
		$http({
			method : 'post',
			url : $scope.$storage.baseURI + 'retrieveAgeProofDocuments',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : {
				id:id
			}
		}).then(function successCallback(response) {
	
			 $rootScope.userAgeDocuments = response.data;
			
	 
			    $state.go("branchManagerHome.viewUnregisteredUserDetails");	//used to go from one state to another $window.location and $location.path don't seem to work in this situation 
		})
		
	}
	
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
				console.log("id returned "+data.id);
			})
	   }
});


