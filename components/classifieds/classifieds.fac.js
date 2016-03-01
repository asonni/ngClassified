(function(){
  "use strict";
  var app = angular.module('ngClassifieds');
  app.factory('classifiedsFactory', ['$http', '$firebaseArray', function($http, $firebaseArray){
    var ref = new Firebase('https://aladdin-ngclassifieds.firebaseio.com');
    return {
      ref: $firebaseArray(ref)
    }
  }]);
})();