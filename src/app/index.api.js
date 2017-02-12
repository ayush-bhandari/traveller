(function ()
{
    'use strict';

    angular
        .module('traveller')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource)
    {
        var api = {};
        api.baseUrl = 'app/data/';
        return api;
    }

})();