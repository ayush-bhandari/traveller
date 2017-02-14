(function ()
{
    'use strict';

    angular
        .module('app.cart')
        .controller('DetailController', DetailController);

    /** @ngInject */
    function DetailController($mdDialog,$location)
    {
        var vm = this;

        vm.info = {};

        vm.init = function(){
            vm.info = {};
        }
        vm.init();

        vm.closeDialog = function()
        {
            $mdDialog.hide();
        }
        vm.saveDetail = function(){
            localStorage.setItem("name",vm.info.name);

            $mdDialog.hide();
            // alert("you saved");
            $location.path('cart');
        }
    }
})();