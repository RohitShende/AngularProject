/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$scope.userd = $rootScope.userDetails;
	var url = $scope.$storage.baseURI + 'unregistereduser/'+1+'/'+10;
	console.log(url)
	$scope.userList = [];
	$scope.userPendingList = [];
	$scope.userRejectedList = [];

	$http.get(url).success(function(data, status) {
	    //$scope.data = data;
	    $scope.userList = data;
	    
	    angular.forEach($scope.userList, function(value, key) {
	    	  console.log(key + ': ' + value.applicationStatus);
	    	  if(value.applicationStatus==="Pending")
	    	  {
	    		 $scope.userPendingList.push(value); 	
	    	  }
	    	  else
	    	  {
	    		  console.log("inside else");
	    		 $scope.userRejectedList.push(value);
	    		 console.log(value);
	    	  }
	    	  
	    	});
	     
	    console.log($scope.userPendingList);
	    $rootScope.size=$scope.userList.length;
	    console.log("rootscope "+$rootScope.size);
	    if($scope.userPendingList.length==0)
	    {
	    	$scope.errorMessagePending="No requests to display at this point!"
	    }
	    else if($scope.userRejectedList.length==0)
	    {
	    	$scope.errorMessageRejected="No results to display at this point!"
	    }
	    $log.log($scope.data); 
	       
	    
	});

	$scope.viewUnregisteredUserDetails=function(id)
	{

		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'unregistereduser/'+id			
		}).then(function successCallback(response) {
		
			 $rootScope.userDetails = response.data;
			
			   
		});
		
		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'addressproofdocument/'+id,
		
		}).then(function successCallback(response) {
	
			 $rootScope.userAddressDocuments = response.data;
			

		});
		
		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'ageproofdocument/'+id,
		
		}).then(function successCallback(response) {
	
			 $rootScope.userAgeDocuments = response.data;
			
	 
			    $state.go("branchManagerHome.viewUnregisteredUserDetails");	//used to go from one state to another $window.location and $location.path don't seem to work in this situation 
		})
		
	}
	
	$scope.sendEmail=function(id,applicationStatus)
	   {
		   console.log(id+" idddd"+applicationStatus+" status");
		   $http({
				method : 'get',  
				url : $scope.$storage.baseURI + 'unregistereduser/email/'+id+'/'+applicationStatus,
			}).then(function successCallback(response) {
				var data = response.data;
				console.log("id returned "+data.id);
			})
			$state.go("branchManagerHome.verifyUnregisteredUsers");
	   }
	$scope.viewRejectedUserDetails=function(id)
	{

		$http({
			method : 'get',
			url : $scope.$storage.baseURI + 'unregistereduser/'+id			
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
			 $state.go("branchManagerHome.viewRejectedUserDetails"); 
		});
	}
	

	

	
});


