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

        api.location = $resource(api.baseUrl+'home/location.json');//, {
            // query:'@query'
        // }, {
               // query: {
               //      method: 'GET', 
               //      headers: {
               //          'authorization': 'Bearer '+ 'token' 
               //  }
            // }
         // });
        return api;
    }

})();