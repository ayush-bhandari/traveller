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
         api.services = $resource(api.baseUrl+'cart/services.json');
         api.transportation = $resource(api.baseUrl+'cart/transportation.json');
         api.hotels = $resource(api.baseUrl+'cart/hotels.json');
        return api;
    }

})();