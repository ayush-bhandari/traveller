(function(){
	'use strict';

	angular
		.module('app.cart')
		.directive('itemTable', itemTable);

	/** @ngInject */
	function itemTable() {
	    var directive = {
	        templateUrl: 'app/main/cart/table/table.html',
	        restrict: 'EA',
	        controller: 'CartsController',
	        controllerAs: 'vm',
	        bindToController: true
	    };
	    return directive;
	}
})();