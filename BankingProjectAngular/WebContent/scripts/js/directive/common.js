/***	Common Elements - Header / Footer	***/
/** * Directives ** */

(function() {
	var app = angular.module('common-elements', []);
	app
	// Header directive
	.directive('appHeader', function() {
		return {
			restrict : 'E',
			templateUrl : 'htmlpages/common/app-header.html'
		};
	})
	// Footer directive
	.directive('appFooter', function() {
		return {
			restrict : 'E',
			templateUrl : 'htmlpages/common/app-footer.html'
		};
	})
	.directive('fileModel', [ '$parse', function($parse) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	} ]);

})();
