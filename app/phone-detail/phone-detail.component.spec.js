describe('phoneDetail', function() {
  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('phoneDetail'));

  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  // Test the controller
  describe('PhoneDetailController', function() {
    var scope;
    var $httpBackend;
    var ctrl;
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function(_$rootScope_, $componentController, _$httpBackend_, $routeParams, _$compile_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData);

      $routeParams.phoneId = 'xyz';

      ctrl = $componentController('phoneDetail', null, {description: 'amazing phone'});

      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      var template = '<div><h1 class="js-greeting">{{phone.name}}</h1><p class="js-desc">{{$ctrl.description}}</p><h2 my-binding="{{outside}}">{{ $ctrl.description }}</h2></div>'
      scope.outside = '1.5';
      console.log('template', template);
      var angEl = angular.element(template);
      console.log('angEl', angEl);
      var compiler = $compile(angEl);

      element = compiler(scope);
      console.log('element', element);

      scope.phone = {}
      scope.phone.name = 'my phone';
      ctrl.description = 'best phone';

      console.log('------------ element.html()', element.html());
      scope.$digest();
      console.log('------------ element.html()', element.html());
    }));

    xit('should fetch the phone details', function() {
      jasmine.addCustomEqualityTester(angular.equals);
      expect(ctrl.phone).toEqual({});
      $httpBackend.flush();
      expect(ctrl.phone).toEqual(xyzPhoneData);
    });

    it('should display phone detail', function() {
      console.log('ctrl.phone', ctrl.phone);
      someAttrValue = findIn(element, '.js-greeting').text();
      console.log('atr-phone', someAttrValue);
      someAttrValue = findIn(element, '.js-desc').text();
      console.log('atr-desc', someAttrValue);

      console.log('++++++++++++++ element.html()', element.html());

      console.log('scope.$ctrl', scope.$ctrl);
      scope.$ctrl = ctrl;
      console.log('scope.$ctrl', scope.$ctrl);

      console.log('ctrl.description', ctrl.description);

      scope.$digest();
      console.log('++++++++++++++ element.html()', element.html());
      expect(1).toEqual(1);
    });
  });
});

xdescribe('Some Component', function () {
  function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
  }

  var parentScope;
  var element;

  // 1:
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    // 2:
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    console.log('rootScope', $rootScope);
    parentScope = $rootScope.$new();
    parentScope.someAttr = 'SOME_VALUE';
    // 3:
    element = angular.element('<div some-attr="someAttr"></div>');
    element = $compile(element)(parentScope);
    console.log('elm1', element);
    // 4:
    parentScope.$digest();
    console.log('elm1.5', element);

  }));

  it('displays initial value of some attr', function () {
    // 5:
    console.log('elm2', element);
    const someAttrValue = findIn(element, '.js-some-attr').text();
    expect(someAttrValue).toEqual('SOME_VALUE');
  });

  it('displays changed value of some attr', function () {
    // 6:
    parentScope.someAttr = 'CHANGED_VALUE';
    parentScope.$digest();

    const someAttrValue = findIn(element, '.js-some-attr').text();
    expect(someAttrValue).toEqual('CHANGED_VALUE');
  });
});
