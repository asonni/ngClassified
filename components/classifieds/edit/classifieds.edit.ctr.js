(function(){
  "use strict";
  var app = angular.module('ngClassifieds');
  app.controller('editClassifiedsCtrl',['$scope', '$http', '$state', '$timeout', 'classifiedsFactory', '$mdSidenav', '$mdDialog', function($scope, $http, $state, $timeout, classifiedsFactory, $mdSidenav, $mdDialog){
    var vm = this;
    vm.classifieds = classifiedsFactory.ref;
    vm.classified = vm.classifieds.$getRecord($state.params.id);
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
    vm.saveEdit = function(){
      vm.classifieds.$save(vm.classified).then(function(){
        $scope.$emit('editSaved', 'Edit saved!');
        vm.closeSidebar();
      });
    }
  }]);
})();