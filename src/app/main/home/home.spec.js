describe('HomeController', function() {
  beforeEach(module('traveller'));
  beforeEach(module('app.home'));

  var $controller;
  var controller;
  var $httpBackend;

  beforeEach(inject(function(_$controller_,_$httpBackend_){
    $controller = _$controller_; 
    $httpBackend = _$httpBackend_;
    controller = $controller('HomeController',{});
  }));
    
    it('should check if controller is defined',function(){
      expect(controller).toBeDefined();
    });
    it('should check if init functin is defined',function(){
      expect(controller.init).toBeDefined();
    }); 
    it('should check if searchLocation functin is defined',function(){
      expect(controller.searchLocation).toBeDefined();
    });
    
 });
