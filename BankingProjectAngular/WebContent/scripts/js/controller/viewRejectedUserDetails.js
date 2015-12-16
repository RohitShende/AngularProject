/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('viewRejectedUsers', []);
app.controller("viewRejectedUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$http({
		method : 'get',
		url : $scope.$storage.baseURI + 'unregistereduser/'+$stateParams.id			
	}).then(function successCallback(response) {
		
		 $scope.rejectedApplications = response.data;
		 $rootScope.rejectedUserList=[];
		 angular.forEach($scope.rejectedApplications, function(value, key) {
	    	  console.log(key + ': ' + value.applicationStatus);
	    	  if(value.applicationStatus==="Rejected")
	    	  {
	    		 $rootScope.rejectedUserList.push(value);
	    		 console.log($rootScope.rejectedUserList);
	    		 
	    	  }
	    	  
	    	});
		 
	});


});


