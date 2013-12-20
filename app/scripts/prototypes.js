'use strict';

//https://gist.github.com/naholyr/1865010
Function.prototype.argNames = function () {
  // Extract function string representation: hopefully we can count on it ?
  var s = this.toString();
 
  // The cool thing is: this can only be a syntactically valid function declaration
  s = s                               // "function name (a, b, c) { body }"
    .substring(                       //                "a, b, c"
      s.indexOf('(')+1,               // ----------------^
      s.indexOf(')')                  //                 ------^
    );
 
  // Cleanup the string, ignore spaces and linefeeds, only identifiers matter
  s = s.replace(/[\r\n\s]*/g, '');    // "a,b,c"
 
  // Let's be ES6-ready: any argument can be followed by '= default value'
  s = s                               // a,b="\"toto\"",c='hello',d=3342,e,f
    .replace(/\\+['"]/g, '')          // a,b="toto",c='hello',d=3342,e,f
    .replace(/=\s*(["']).*?\1/g, '')  // a,b,c,d=3342,e,f
    .replace(/=.*?(,|$)/g, '');       // a,b,c,d,e,f
 
  return s.split(',');                // ["a", "b", "c"]
};
Function.prototype.functionName = function() {
  var ret = this.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
};