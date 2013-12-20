'use strict';

describe('Service: LessColorFunctionParser', function () {

  // load the service's module
  beforeEach(module('colorLessApp'));

  // instantiate service
  var LessColorFunctionParser;
  beforeEach(inject(function (_LessColorFunctionParser_) {
    LessColorFunctionParser = _LessColorFunctionParser_;
  }));

  it('should do something', function () {
    expect(!!LessColorFunctionParser).toBe(true);
  });

});
