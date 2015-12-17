/***	Common Elements - Header / Footer	***/
/** * Directives ** */

var app = angular.module('verifyUnregisteredUsers', []);
app.controller("verifyUnregisteredUsersController", function($scope, $log,
		$stateParams, $location, $state, $rootScope, $http,$window) {
	$scope.userd = $rootScope.userDetails;
	var url = $scope.$storage.baseURI + 'unregistereduser/details';
	console.log(url)
	$scope.userList = [];
	$scope.userPendingList=[];
	$scope.userRejectedList = [];
	$scope.flag;
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
	     
	    
	    
//	    angular.forEach($scope.userList, function(value, key) {
//	    	  console.log(key + ': ' + value.applicationStatus);
//	    	  if(value.applicationStatus==="Pending")
//	    	  {
//	    		 console.log("*********"+value.id);
//	    		 	$http({
//	    				method : 'get',
//	    				url : $scope.$storage.baseURI + 'addressproofdocument/'+value.id
//	    			}).then(function(response){
//	    				var data=response.data;
//	    				$scope.userPendingList = [];
//	   	    		 	if(data.Error==="No address proof document uploaded")
//	   	    		 	{
//	   	    		 		$scope.flag=1;
//	   	    		 		console.log(data.Error+" iddd "+value.id);
//	   	    		 		
//	   	    		 	}
//	   	    		 	if($scope.flag===1)
//		    			{
//		    				$scope.userPendingList.push(value);
//		    			
//		    			}
//	    			})	
//	    		 $scope.userPendingList.push(value);
//	    	  }
//	    	  else
//	    	  {
//	    		  console.log("inside else");
//	    		 $scope.userRejectedList.push(value);
//	    		 console.log(value);
//	    	  }
//	    	  
//	    	});
	     
	    console.log($scope.userPendingList);
	    $rootScope.size=$scope.userList.length;
	    console.log("rootscope "+$rootScope.size);
	    if($scope.userPendingList.length==0)
	    {
	    	$scope.errorMessagePending="No requests to display at this point!"
	    }
	    if($scope.userRejectedList.length==0)
	    {
	    	$scope.errorMessageRejected="No results to display at this point!"
	    }
	    $log.log($scope.data); 
	       
	    
	});

	$scope.viewUnregisteredUserDetails=function(id)
	{
		$state.go("branchManagerHome.viewUnregisteredUserDetails",{id:id});	//used to go from one state to another $window.location and $location.path don't seem to work in this situation 
	}
	
	
	$scope.viewRejectedUserDetails=function(id)
	{
		$state.go("branchManagerHome.viewRejectedUserDetails",{id:id}); 
	}
	
	
	

	
});


