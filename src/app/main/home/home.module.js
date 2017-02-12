(function ()
{
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider
            .state('app.home', {
                url    : '/home',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/home/home.html',
                        controller : 'HomeController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/home');

    }
})();