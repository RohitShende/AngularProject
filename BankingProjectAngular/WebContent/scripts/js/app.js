/**
 * ngSurveys - main application script file
 */

(function() {
	'use strict';
	angular.module(
			'inbApp',
			[ 'ui.router', 'ui.bootstrap', 'common-elements', 'admin',
					'ngStorage', 'loginBranchManager', 'createBranchManager',
					'applicationForm','createBranch' ])

	// UI Routing
	.config(function($urlRouterProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider.state('home', {
			url : '/home',
			templateUrl : 'htmlpages/home.html',
		}).state('adminLogin', {
			url : '/adminLogin',
			templateUrl : 'htmlpages/adminLogin.html',
			controller : 'adminLoginController'
		}).state('branchManagerLogin', {
			url : '/branchManagerLogin',
			templateUrl : 'htmlpages/branchManagerLogin.html',
			controller : 'branchManagerController'
		}).state('adminHome', {
			url : '/adminHome',
			templateUrl : 'htmlpages/adminHome.html',
			controller : 'adminHome'
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
		});// .state('error', {
		// url : '/error',
		// templateUrl : 'htmlpages/adminHome.html',
		// controller : 'adminHome'
		// }).state('openNewAccount', {
		// url : '/openNewAccount',
		// templateUrl : 'htmlpages/openNewAccount.html',
		// controller : 'registerUser'
		// }).state('logout', {
		// url : '/logout',
		// templateUrl : 'home.html',
		// controller : 'logout'
		// });

	})
})();
