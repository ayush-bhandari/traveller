(function ()
{
    'use strict';

    angular
        .module('app.cart')
        .controller('CartController', CartController);

    /** @ngInject */
    function CartController(api,$location,$timeout,$q,$mdDialog)
    {
        var vm = this;

        vm.travelInfo= {};
        vm.noChild = false;
        vm.checkInError = {};
        vm.checkOutError = {};
        vm.minDate = {};
        vm.allLocation = {};
        vm.serviceTypeList = {};
        vm.serviceType = {};
        vm.availableObject = {};
        
        vm.init = function(){
            vm.travelInfo.location = localStorage.getItem("location");
            vm.travelInfo.checkin = new Date(localStorage.getItem("checkin"));
            vm.travelInfo.checkout = new Date(localStorage.getItem("checkout"));
            vm.travelInfo.adult = localStorage.getItem("adult");
            vm.travelInfo.child = localStorage.getItem("child");
            vm.travelInfo.name = localStorage.getItem("name");
            vm.travelInfo.email = null;
            vm.travelInfo.nationality = null;
            vm.travelInfo.contact = null;
            if (vm.travelInfo.child > 0){
                vm.noChild = true;
            }else{
                vm.noChild = false;
            }
            vm.minDate = moment()._d;
            vm.checkInError = {low:false};
            vm.checkOutError = {low:false};
            api.location.get({},
                function (response){
                    // console.log(response.data);
                    vm.allLocation = response.data;
                    for (var i = 0; i < vm.allLocation.length; i++) {
                        console.log(vm.allLocation[i]);
                        if(vm.allLocation[i].name === vm.travelInfo.location ){
                            vm.travelInfo.location = vm.allLocation[i];
                        }
                    }
                },
                function(response){

                });
            vm.serviceTypeList = ['Hotels','Service','Transportation'];
            vm.serviceType = vm.serviceTypeList[0];
            api.hotels.get({},
                function (response){
                    console.log(response.data);
                    vm.availableObject = response.data;
                },
                function(response){

                });
        }
        vm.init();

        vm.openDetailForm = function(){
            $mdDialog.show({
                controller         : 'DetailController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/cart/detail/detail.html',
                // parent             : angular.element($document.body),
                // targetEvent        : ev,
                clickOutsideToClose: true
            });
        }
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
        vm.searchLocation = function(query){
            return vm.allLocation;
        }
        vm.getItems = function(){
            // console.log(vm.serviceType);
            
            console.log(vm.travelInfo);
            if (vm.serviceType == 'Hotels'){
                api.hotels.get({},
                function (response){
                    console.log(response.data);
                    vm.availableObject = response.data;
                },
                function(response){

                });
            }else if (vm.serviceType == 'Transportation') {
                api.transportation.get({},
                function (response){
                    console.log(response.data);
                    vm.availableObject = response.data;
                },
                function(response){

                });
            }else if (vm.serviceType == 'Service') {
                api.services.get({},
                function (response){
                    console.log(response.data);
                    vm.availableObject = response.data;
                },
                function(response){

                });
            }else{

            }
        }
        
    }
})();
