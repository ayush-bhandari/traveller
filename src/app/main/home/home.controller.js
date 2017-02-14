(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(api,$location,$timeout,$q)
    {
        var vm = this;

        vm.travelInfo = {};
        vm.travelButton = {};
        vm.minDate = {};
        vm.adults = {};
        vm.children = {};
        // vm.locationError = {};
        vm.checkInError = {};
        vm.checkOutError = {};
        vm.allLocation = {};

        vm.init = function(){
            vm.travelInfo = {};
            vm.travelButton = true;
            vm.minDate = moment()._d;
            vm.adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            vm.children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            vm.checkInError = {low:false};
            vm.checkOutError = {low:false};
            api.location.get({},
                function (response){
                    // console.log(response.data);
                    vm.allLocation = response.data;
                },
                function(response){

                });
        }
        vm.init();

        vm.checkOut = function(){
            if (vm.travelInfo.checkout < vm.travelInfo.checkin){
                // vm.errorMessage = "Please enter a valid Check Out date. You cannot Check Out from a place before you Check In there.";
                vm.travelInfo.checkout = null;
                vm.checkOutError = {low:true};
                // vm.showError = true;
                // vm.searchButton=true;   
            }else{
                vm.checkOutError = {low:false};
                // vm.searchButton=false;
                // vm.showError = false;
            }
        }
        vm.checkIn = function(){
            if (vm.travelInfo.checkout < vm.travelInfo.checkin){
                // vm.errorMessage = "Please enter a valid Check In date. You cannot Check In to a place after you've already Checked Out from there.";
                vm.checkInError = {low:true};
                vm.travelInfo.checkin = null;
                // vm.showError = true;
                // vm.searchButton=true;   
            }else{
                vm.checkInError = {low:false};
                // vm.searchButton=false;
                // vm.showError = false;
            }
        }
        vm.travelFormSubmit = function(){

            // vm.search.location=vm.selectedItem.loc;
            // console.log(vm.travelInfo.location);
            // console.log(vm.travelInfo.checkin);
            // console.log(vm.travelInfo.checkout);
            // console.log(vm.travelInfo.adult);
            // console.log(vm.travelInfo.child);
            // console.log(vm.travelInfo);
            // localStorage.location = vm.search.location;
            // localStorage.checkin = vm.search.checkin;
            // localStorage.checkout = vm.search.checkout;
            // localStorage.adult = vm.search.adult;
            // localStorage.child = vm.search.child;
            localStorage.setItem("location", vm.travelInfo.location.name);
            localStorage.setItem("checkin", vm.travelInfo.checkin);
            localStorage.setItem("checkout", vm.travelInfo.checkout);
            localStorage.setItem("adult", vm.travelInfo.adult);
            localStorage.setItem("child", vm.travelInfo.child);

            // localStorage.info = {
            //     location: vm.travelInfo.location,
            //     checkin: vm.travelInfo.checkin,
            //     checkout: vm.travelInfo.checkout,
            //     adult: vm.travelInfo.adult,
            //     child: vm.travelInfo.child
            // };

            // localStorage.travelInfo = vm.travelInfo;
            //             console.log(vm.travelInfo);

            // console.log(localStorage.travelInfo);
            $location.path('/cart');
        }
        vm.searchLocation = function(query){
            return vm.allLocation;
        }

    }
})();
