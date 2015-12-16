(function() {
	'use strict';
	angular.module(
			'inbApp',
			[ 'ui.router', 'ui.bootstrap', 'common-elements', 'admin',
					'ngStorage', 'loginBranchManager', 'createBranchManager',
					'applicationForm', 'createBranch', 'viewBranchManagers',
					'viewBranches', 'basicModule', 'client','applicationForm1',
					'verifyUnregisteredUsers', 'contact' ,'toaster', 'ngAnimate','viewRegisteredUsers',
					'viewUnregisteredUsers'])

	// UI Routing
	.config(function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/home');
		
		$stateProvider.state('home', {
			url : '/home',
			templateUrl : 'htmlpages/home.html',
			controller : 'appController'
		}).state('adminLogin', {
			url : '/adminLogin',
			templateUrl : 'htmlpages/adminLogin.html',
			controller : 'adminLoginController'
		}).state('about', {
			url : '/about',
			templateUrl : 'htmlpages/about.html',
		}).state('branchManagerLogin', {
			url : '/branchManagerLogin',
			templateUrl : 'htmlpages/branchManagerLogin.html',
			controller : 'branchManagerController'
		}).state('adminHome', {
			url : '/adminHome',
			templateUrl : 'htmlpages/adminHome.html',
			controller : 'adminHome'
		}).state('branchManagerHome', {
			url : '/branchManagerHome',
			templateUrl : 'htmlpages/branchManagerHome.html',
			controller : 'branchManagerHome'
		})
		// .state('branchManagerHome', {
		// url : '/branchManagerHome',
		// templateUrl : 'htmlpages/branchManagerHome.html',
		// controller : 'branchManagerHome'
		// })
		.state('adminHome.newBranchManager', {
			url : '/newBranchManager',
			templateUrl : 'htmlpages/createBranchManager.html',
			controller : 'createBranchManagerController'
		}).state('applicationFormUnregistered', {
			url : '/applicationFormUnregistered',
			templateUrl : 'htmlpages/applicationForm.html',
			controller : 'applicationFormController'
		}).state('adminHome.createBranch', {
			url : '/createBranch',
			templateUrl : 'htmlpages/createBranch.html',
			controller : 'createBranchController'
		}).state('adminHome.viewBranches', {
			url : '/adminHome/viewBranches',
			templateUrl : 'htmlpages/viewBranches.html',
			controller : 'viewBranchesController'
		}).state('adminHome.viewBranchManagers', {
			url : '/viewBranchManagers',
			templateUrl : 'htmlpages/viewBranchManagers.html',
			controller : 'viewBranchManagersController'
		}).state('uploadDocument', {
			url : '/uploadDocument',
			templateUrl : 'htmlpages/uploadDocuments.html',
			controller : 'uploadDocuments'
		}).state('clientHome', {
			url : '/clientHome',
			templateUrl : 'htmlpages/clientHome.html',
			controller : 'clientController'
		}).state('branchManagerHome.verifyUnregisteredUsers', {
			url : '/verifyUnregisteredUsers',
			templateUrl : 'htmlpages/verifyUnregisteredUsers.html',
			controller : 'verifyUnregisteredUsersController'
		}).state('branchManagerHome.viewUnregisteredUserDetails', {
			url : '/viewUnregisteredUserDetails/:id',
			templateUrl : 'htmlpages/viewUnregisteredUserDetails.html',
			controller : 'viewUnregisteredUsersController'
		}).state('branchManagerHome.viewVerifiedCustomers', {
			url : '/viewVerifiedCustomers',
			templateUrl : 'htmlpages/viewVerifiedCustomers.html',
			controller : 'viewRegisteredUsersController'
		}).state('branchManagerHome.viewRejectedApplications', {
			url : '/viewRejectedApplications',
			templateUrl : 'htmlpages/viewRejectedApplications.html',
			controller : 'verifyUnregisteredUsersController'
		}).state('branchManagerHome.viewRejectedUserDetails', {
			url : '/viewRejectedUserDetails/:id',
			templateUrl : 'htmlpages/viewRejectedUserDetails.html',
			controller : 'viewRejectedUsersController'
		}).state('branchManagerHome.viewVerifiedUserDetails', {
			url : '/viewVerifiedUserDetails/:id',
			templateUrl : 'htmlpages/viewVerifiedUserDetails.html',
			controller : 'viewRegisteredUserDetailsController'
		})// .state('error', {
		// url : '/error',
		// templateUrl : 'htmlpages/adminHome.html',
		// controller : 'adminHome'
		// }).state('openNewAccount', {
		// url : '/openNewAccount',
		// templateUrl : 'htmlpages/openNewAccount.html',
		// controller : 'registerUser'
		// })
		.state('clientHome.applyNewAccount', {
			url : '/clientHome/applyNewAccount',
			templateUrl : 'htmlpages/applicationFormForOnceRegisteredUser.html',
			controller : 'applicationFormForRegisteredController'
		}).state('contact', {
			url : '/contact',
			templateUrl : 'htmlpages/contact.html',
			controller : 'contactController'
		}).state('logout', {
			url : '/logout',
			controller : 'logoutController'
		}).state('clientLogin', {
			url : '/clientLogin',
			templateUrl : 'htmlpages/clientAuthorisation.html',
			controller : 'clientLoginControllers'
		})
		.state('setAuthoriseData', {
			url : '/setAuthoriseData',
			templateUrl : 'htmlpages/setAuthoriseData.html',
			controller : 'clientSetAuthoriseDataControllers'
		})
		.state('emailsubmission',{
			url : '/emailsubmission',
			templateUrl : 'htmlpages/takeEmailForApplication.html',
			controller : 'emailSubmission'
		});
		

	})
	
	
	.controller("appController",
			function($scope, $location, $rootScope, $localStorage,$http ) {
				$rootScope.clientLoginRequest = false;
				$localStorage.baseURI = "http://localhost:8080/";
				$scope.$storage = $localStorage;
				if ($localStorage.role == 'admin') {
					$location.path("adminHome");
				}
				
				$scope.loginClient = function(id){
					$localStorage.clientId = id;
					$http({
						method : 'get',
						url : $scope.$storage.baseURI + 'authorisation/' + id,
					}).then(function successCallback(response) {
						var data = response.data;
						if (response.data.id != null) {
							$location.path("/clientLogin");
						} else {
							console.log("Client nai hai..");
							$scope.errorMessage = response.data.Exception;
							$location.path("/home");
						}
					}, function errorCallback(response) {
						$scope.errorMessage = "Server Error. Try After Some time";
						$location.path("/home");
					});
					
				};
	})
			})();
