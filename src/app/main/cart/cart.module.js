(function ()
{
    'use strict';

    angular
        .module('app.cart', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.cart', {
                url    : '/cart',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/cart/cart.html',
                        controller : 'CartController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/cart');

    }
})();