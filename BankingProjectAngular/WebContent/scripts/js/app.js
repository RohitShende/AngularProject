/**
 * ngSurveys - main application script file
 */

(function() {
	'use strict';
	angular.module(
			'inbApp',
			[ 'ui.router', 'ui.bootstrap', 'common-elements', 'admin',
					'ngStorage', 'loginBranchManager', 'createBranchManager',
					'applicationForm', 'createBranch', 'viewBranchManagers',
					'viewBranches', 'basicModule', 'client',
					'verifyUnregisteredUsers', 'contact' ])

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
			url : '/viewUnregisteredUserDetails',
			templateUrl : 'htmlpages/viewUnregisteredUserDetails.html',
			controller : 'verifyUnregisteredUsersController'
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
			templateUrl : 'htmlpages/applicationForm.html',
			controller : 'applicationFormController'
		}).state('contact', {
			url : '/contact',
			templateUrl : 'htmlpages/contact.html',
			controller : 'contactController'
		}).state('logout', {
			url : '/logout',
			controller : 'logoutController'
		});

	}).controller("appController",
			function($scope, $location, $rootScope, $localStorage) {
				$rootScope.clientLoginRequest = false;
				$localStorage.baseURI = "http://localhost:8080/";
				$scope.$storage = $localStorage;
				if ($localStorage.role == 'admin') {
					$location.path("adminHome");
				}
				
				$scope.loginClient = function() {
					$localStorage.clientId = $scope.clientID;
					$location.path("clientHome");
				}
			});
})();
