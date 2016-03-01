(function(){
  "use strict";
  var app = angular.module('ngClassifieds');
  app.controller('newClassifiedsCtrl',['$scope', '$http', '$state', '$timeout', 'classifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', function($scope, $http, $state, $timeout, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
    var vm = this;
    $timeout(function(){
      $mdSidenav('left').open();
    });
    $scope.$watch('vm.sidenavOpen', function(sidenav){
      if (sidenav === false){
        $mdSidenav('left')
          .close()
          .then(function(){
            $state.go('classifieds');
          });
      }
    });
    vm.closeSidebar = function closeSidebar(){
      vm.sidenavOpen = false;
    }
    vm.saveClassified = function(classified){
      if(classified){
        classified.contact = {
          "name": "Aladdin Sonni",
          "phone": "(555) 555-5555",
          "email": "alaaden3000@gmail.com"
        }
        $scope.$emit('newClassified', classified);
        vm.closeSidebar();
      }
    }
  }]);
})();