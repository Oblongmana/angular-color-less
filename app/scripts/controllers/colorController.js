'use strict';

angular.module('colorLessApp')
  .controller('ColorcontrollerCtrl', function ($scope, LessColorFunctionParser) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.idCounter = 0;
    $scope.colors = [
        {value: 'spin(428bca,45)', id:$scope.idCounter++},
        {value: '0099D8', id:$scope.idCounter++},
        {value: 'darken(tint(spin(0099D8,180),50),10)', id:$scope.idCounter++}
      ];
    $scope.otherColors = [
        {value: '5cb85c', id:$scope.idCounter++},
        {value: 'f0ad4e', id:$scope.idCounter++},
        {value: 'd9534f', id:$scope.idCounter++},
        {value: '5bc0de', id:$scope.idCounter++}
      ];
      
    $scope.contrast = function(myColor) {
      //Note, less.tree.Value can be used when values are needed
      var retColor = myColor.charAt(0) === '#' ? myColor.substring(1) : myColor;
      return less.tree.functions.contrast(new less.tree.Color(retColor,new less.tree.Value(1))).toRGB();
    };
    
    $scope.remove = function(index) {
      $scope.colors.splice(index,1);
    };
    
    $scope.duplicate = function(index) {
      $scope.colors.splice(index,0,{value: $scope.colors[index].value, id:$scope.idCounter++});
    };
    
    $scope.applyLESSFuncs = LessColorFunctionParser.parseLessCalls;
      
    $scope.add = function() {
      $scope.colors.push({value: ''});
    };

  });
