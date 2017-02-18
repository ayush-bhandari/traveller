(function ()
{
    'use strict';

    angular
        .module('app.cart')
        .controller('HotelController', HotelController);

    /** @ngInject */
    function HotelController()
    {
        var hc = this;

        hc.checkInDate;
        hc.checkOutDate;
        hc.hotelCheckInError = {};
        hc.hotelCheckOutError = {};

        hc.init = function(){
            hc.hotelCheckInError = {low:false};
            hc.hotelCheckOutError = {low:false};

        }
        hc.init();

        hc.checkOut = function(){
            if (hc.checkOutDate < hc.checkInDate){
                hc.checkOutDate = null;
                hc.hotelCheckOutError = {low:true};   
            }else{
                hc.hotelCheckOutError = {low:false};
            }
        }
        hc.checkIn = function(){
            if (hc.checkOutDate < hc.checkInDate){
                hc.hotelCheckInError = {low:true};
                hc.checkInDate = null; 
            }else{
                hc.hotelCheckInError = {low:false};
            }
        }

    }
})();