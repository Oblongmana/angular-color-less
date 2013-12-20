'use strict';

describe('Controller: ColorcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('colorLessApp'));

  var ColorcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ColorcontrollerCtrl = $controller('ColorcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
