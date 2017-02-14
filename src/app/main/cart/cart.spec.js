describe('CartController', function() {
  beforeEach(module('traveller'));
  beforeEach(module('app.cart'));

  var $controller;
  var controller;
  var $httpBackend;

  beforeEach(inject(function(_$controller_,_$httpBackend_){
    $controller = _$controller_; 
    $httpBackend = _$httpBackend_;
    controller = $controller('CartController',{});
  }));
    
    it('should check if controller is defined',function(){
      expect(controller).toBeDefined();
    });
    it('should check if init functin is defined',function(){
      expect(controller.init).toBeDefined();
    });
    
 });
