'use strict';

angular.module('colorLessApp')
  .service('LessColorFunctionParser', function LessColorFunctionParser() {

  var push = function(myArr,myStr) {
    if(myStr.length !== 0) {
      myArr.push(myStr);
    }
  };
  
  var parse = function(myStr) {
    var parentObject=null;
    var currWord = '';
    
    for (var i = 0; i < myStr.length; i++) {
      var currChar = myStr.charAt(i);
      switch(currChar) {
        case '(':
          if(parentObject===null){
            parentObject = {'f': currWord, 'p':[], 'parent':null};
          }
          else {
            var newObject = {'f': currWord, 'p':[], 'parent':parentObject};
            push(parentObject.p,newObject);
            parentObject = newObject;
          }
          currWord='';
          break;
        case ')':
          push(parentObject.p,currWord);
          if(parentObject.parent !== null) {
            parentObject = parentObject.parent;
          }
          currWord='';
          break;
        case ',':
          push(parentObject.p,currWord);
          currWord='';
          break;
        default:
          currWord+=currChar;
      }
    }
    
    //Recursive calling functions/helpers - note we only allow the demoFuncs namespace,
    //  and auto-preface our calls with it
    var isCallObj = function(candidate) {
      return (      _.isObject(candidate) &&
                   !_.isArray(candidate) &&
                   !_.isUndefined(candidate.f) &&
                   !_.isUndefined(candidate.p) &&
                   !_.isUndefined(candidate.parent) );
    };
    
    var recursiveCallFunc = function(callObj) {
      //Yep, you can break this probably by having an object with f and p and parent defined
      var args = [];
      for(var index = 0; index < callObj.p.length; index++) {
        if(isCallObj(callObj.p[index])) {
          args.push(recursiveCallFunc(callObj.p[index]));
        }
        else {
          args.push(callObj.p[index]);
        }
      }
      var fn = less.tree.functions[callObj.f];
      var callResult;
      if (typeof fn === 'function') {
        var argNames = fn.argNames();
        if(argNames.length < args.length) {
          throw ('Too many args for ' + fn.functionName());
        }
        var min = argNames.length > args.length ? args.length : argNames.length;
        for(var argIndex = 0; argIndex < min; argIndex++){
          if(argNames[argIndex].substring(0,5) === 'color') {
            //Strip "#" first
            args[argIndex] = args[argIndex].charAt(0) === '#' ? args[argIndex].substring(1) : args[argIndex];
            args[argIndex] = new less.tree.Color(args[argIndex],'1');
          }
          else if(argNames[argIndex].substring(0,6) === 'amount') {
            //Strip '#' first, and quotes
            args[argIndex] = Number(_.str.unquote(args[argIndex].charAt(0) === '#' ? args[argIndex].substring(1) : args[argIndex]));
            args[argIndex] = new less.tree.Value(args[argIndex]);
          }
        }
        //MUST give apply(...) [less.tree.functions] as 'this', so it has context for
        //  other method calls that are often made inside the method we're calling
        //  (that was a pain to work out)
        callResult = fn.apply(less.tree.functions, args);
        if(callResult instanceof less.tree.Color) {
          callResult = callResult.toRGB().substring(1);
        }
      }
      else {
        throw (callObj.f + ' does not exist');
      }
      return callResult;
    };
    
    
    
    var outcome = recursiveCallFunc(parentObject);
    return outcome;
  };
  
  return {
    parseLessCalls: function(lessCalls) {
      //Strip leading # before any calls, if any
      lessCalls = lessCalls.charAt(0) === '#' ? lessCalls.substring(1) : lessCalls;
      //Add # back in to result
      return '#' + ((lessCalls.indexOf('(') !== -1) ? parse(lessCalls) : lessCalls);
    }
  };
});

