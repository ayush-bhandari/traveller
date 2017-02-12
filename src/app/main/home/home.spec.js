describe('HomeController', function() {
  beforeEach(module('traveller'));
  beforeEach(module('app.home'));

  var $controller;
  var controller;
  var $httpBackend;

  beforeEach(inject(function(_$controller_,_$httpBackend_){
    $controller = _$controller_; 
    $httpBackend = _$httpBackend_;
    controller = $controller('IndexController',{});
  }));
    
    it('should check if controller is defined',function(){
      expect(controller).toBeDefined();
    }); 
    
 });
