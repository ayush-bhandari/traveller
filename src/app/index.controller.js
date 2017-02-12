(function ()
{
    'use strict';

    angular
        .module('traveller')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

    }
})();