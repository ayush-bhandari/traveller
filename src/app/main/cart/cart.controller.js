(function ()
{
    'use strict';

    angular
        .module('app.cart')
        .controller('CartsController', CartsController);

    /** @ngInject */
    function CartsController(api,$location,$timeout,$q,$mdDialog,ngCart,_,$rootScope,$mdToast)
    {
        var vm = this;

        ngCart.setTaxRate(7.5);
        ngCart.setShipping(0);
        
        vm.travelInfo= {};
        vm.noChild = false;
        vm.checkInError = {};
        vm.checkOutError = {};
        vm.minDate = {};
        vm.allLocation = {};
        vm.serviceTypeList = {};
        vm.serviceType = {};
        vm.availableObject = {};
        vm.allCartItems={};
        vm.serviceConflict = {};
        vm.transportationConflict={};
        vm.hotelConflict = {};

        vm.init = function(){
            vm.travelInfo.location = localStorage.getItem("location");
            vm.travelInfo.checkin = new Date(localStorage.getItem("checkin"));
            vm.travelInfo.checkout = new Date(localStorage.getItem("checkout"));
            vm.travelInfo.adult = localStorage.getItem("adult");
            vm.travelInfo.child = localStorage.getItem("child");
            vm.travelInfo.totalPeople = parseInt(vm.travelInfo.adult) + parseInt(vm.travelInfo.child)
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

            console.log(_.pluck(ngCart.getItems(),'_data'));
            vm.allCartItems.wholeItems = _.pluck(ngCart.getItems(),'_data');
            vm.allCartItems.hotel = _.where(vm.allCartItems.wholeItems, {type: "hotel"});
            vm.allCartItems.service = _.where(vm.allCartItems.wholeItems, {type: "service"});
            vm.allCartItems.transportation = _.where(vm.allCartItems.wholeItems, {type: "transportation"});
            console.log(vm.allCartItems.hotel);
            console.log(vm.allCartItems.service);
            console.log(vm.allCartItems.transportation);
            vm.conflict = {errorA:false};
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
        vm.getEachItems = function(){
            // console.log(vm.serviceType);
            
            console.log(vm.travelInfo);
            console.log(vm.serviceType);
            console.log(vm.travelInfo.location);
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
        vm.hotelDate = function(hotel){
            if (hotel.checkOutDate < hotel.checkInDate){
                hotel.hotelCheckInError = {low:true};
                hotel.hotelCheckOutError = {low:true};
                hotel.checkInDate = null; 
                 hotel.checkOutDate = null;
            }else if(moment(hotel.checkOutDate).isSame(hotel.checkInDate)){
                hotel.hotelCheckInError = {low:true};
                hotel.hotelCheckOutError = {low:true};
                hotel.checkInDate = null; 
                hotel.checkOutDate = null;
            }
            else{
                hotel.hotelCheckInError = {low:false};
                 hotel.hotelCheckOutError = {low:false};
            }
            vm.hotelConflictCalculator(hotel);
        }
        
        vm.serviceDate = function(service){
            console.log(service);
            vm.serviceConflictCalculator(service);
        }
        vm.transportationDate = function(transportation){
            console.log(transportation);
            vm.transportationConflictCalculator(transportation);
        }
        $rootScope.$on('ngCart:change', function(){
            vm.allCartItems.wholeItems = _.pluck(ngCart.getItems(),'_data');
            vm.allCartItems.hotel = _.where(vm.allCartItems.wholeItems, {type: "hotel"});
            vm.allCartItems.service = _.where(vm.allCartItems.wholeItems, {type: "service"});
            vm.allCartItems.transportation = _.where(vm.allCartItems.wholeItems, {type: "transportation"});
            console.log(vm.allCartItems.hotel);
            console.log(vm.allCartItems.service);
            console.log(vm.allCartItems.transportation);
            // vm.conflictCalculator();
        });
        vm.hotelConflictCalculator =function(hotel){
            vm.hotelConflict = {errorA:false};
            for(var i=0; i<vm.allCartItems.hotel.length;i++){
                if(hotel.id != vm.allCartItems.hotel[i].id){
                    if(moment(hotel.checkInDate).isSame(vm.allCartItems.hotel[i].checkInDate)){
                        hotel.checkInDate= null;
                        vm.allCartItems.hotel[i].checkInDate = null;
                        vm.hotelConflict = {errorA:true};
                    }
                    if(moment(hotel.checkOutDate).isSame(vm.allCartItems.hotel[i].checkOutDate)){
                        hotel.checkOutDate= null;
                        vm.allCartItems.hotel[i].checkOutDate = null;
                        vm.hotelConflict = {errorA:true};
                    }
                    if(moment(hotel.checkInDate).isBetween(vm.allCartItems.hotel[i].checkInDate,vm.allCartItems.hotel[i].checkOutDate)){
                        hotel.checkInDate= null;
                        vm.allCartItems.hotel[i].checkInDate = null;
                        vm.allCartItems.hotel[i].checkOutDate = null
                        vm.hotelConflict = {errorA:true};
                    }
                    if(moment(hotel.checkOutDate).isBetween(vm.allCartItems.hotel[i].checkInDate,vm.allCartItems.hotel[i].checkOutDate)){
                        hotel.checkOutDate= null;
                        vm.allCartItems.hotel[i].checkInDate = null;
                        vm.allCartItems.hotel[i].checkOutDate = null
                        vm.hotelConflict = {errorA:true};
                    }
                    if(moment(vm.allCartItems.hotel[i].checkInDate).isBetween(hotel.checkInDate,hotel.checkOutDate)){
                        vm.allCartItems.hotel[i].checkInDate = null;
                        hotel.checkInDate = null;
                        hotel.checkOutDate = null
                        vm.hotelConflict = {errorA:true};
                    }
                    if(moment(vm.allCartItems.hotel[i].checkOutDate).isBetween(hotel.checkInDate,hotel.checkOutDate)){
                        vm.allCartItems.hotel[i].checkOutDate = null;
                        hotel.checkInDate = null;
                        hotel.checkOutDate = null
                        vm.hotelConflict = {errorA:true};
                    }
                }
            }

        }

        vm.transportationConflictCalculator =function(transportation){
            vm.transportationConflict = {errorA:false};
            for (var i=0;i<vm.allCartItems.transportation.length;i++){
                if (transportation.id != vm.allCartItems.transportation[i].id){
                    if ((transportation.start_location === vm.allCartItems.transportation[i].start_location) && (moment(transportation.date).isSame(vm.allCartItems.transportation[i].date))){
                        transportation.date = null;
                        vm.allCartItems.transportation[i].date = null;
                        vm.transportationConflict = {errorA:true};
                    }
                    if ((transportation.end_location === vm.allCartItems.transportation[i].end_location) && (moment(transportation.date).isSame(vm.allCartItems.transportation[i].date))){
                        transportation.date = null;
                        vm.allCartItems.transportation[i].date = null;
                        vm.transportationConflict = {errorA:true};
                    }
                }
            }
        }
        vm.serviceConflictCalculator = function(service){
            vm.serviceConflict = {errorA : false};
            for (var i = 0; i< vm.allCartItems.service.length; i++){
                if (service.id != vm.allCartItems.service[i].id){
                    console.log(service.id);
                    if(moment(service.date).isSame(vm.allCartItems.service[i].date)){
                        service.date = null;
                        vm.allCartItems.service[i].date = null;
                        vm.serviceConflict = {errorA : true};
                    }else{
                        // vm.conflict = {errorA : false};
                    }
                }
            }
            // console.log(vm.allCartItems.hotel);
            // console.log(vm.allCartItems.service);
            // console.log(vm.allCartItems.transportation);
            // if ((vm.allCartItems.hotel.length !== 0) && (vm.allCartItems.transportation.length !== 0)){
            //     if (vm.allCartItems.hotel[0].location.name == vm.allCartItems.transportation[0].start_location){
            //         console.log("location matched");
            //         vm.conflict = {errorA : true};
            //     }else{
            //         console.log("location not matched");
            //         vm.conflict = {errorA: false};
            //     }
            // }else{
            //     vm.conflict = {errorA: false};
            // }
            // if (vm.allCartItems.service.length > 1){
                
            //     // if(_.each(vm.allCartItems.service,function(ser){ _.has(ser, 'date')})){

            //     var s = _.pluck(vm.allCartItems.service, 'date');
            //     console.log(s);
            //     var count = 0;
            //     for  (var i =0; i<s.length;i++){
            //         for (var  j =0; j<s.length; j++){
            //             // if (i !== j){
            //                 console.log(s);
            //                 if(moment(s[i]).isSame(s[j])){
            //                     count++;
            //                     // console.log("same");
            //                     // vm.conflict = {errorA : true};
            //                 }else{
            //                     // console.log("not same");
            //                     // vm.conflict = {errorA : false};
            //                 }
            //             // }
            //         }
            //     }
            //     console.log(count);
            //     if(count > s.length){
            //         vm.conflict = {errorA : true};
            //     }else{
            //         vm.conflict = {errorA : false};
            //     }
            // // }
            //  }else{
            //     vm.conflict = {errorA : false};
            //  }
        }
        $rootScope.$on('ngCart:itemAdded', function(){
            $mdToast.show(
                  $mdToast.simple()
                    .textContent('Item Has been added')
                    .position("top right")
                    .hideDelay(3000)
                );
        });
        $rootScope.$on('ngCart:itemRemoved', function(){
            $mdToast.show(
                  $mdToast.simple()
                    .textContent('Item Has been removed')
                    .position("top right")
                    .hideDelay(3000)
                );
        });

        
    }
})();
