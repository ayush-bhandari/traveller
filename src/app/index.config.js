(function ()
{
    'use strict';

    angular
        .module('traveller')
        .config(config);

    /** @ngInject */
    function config($translateProvider)
    {
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
    }

})();