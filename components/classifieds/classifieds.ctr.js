(function(){
  "use strict";
  var app = angular.module('ngClassifieds');
  app.controller('classifiedsCtrl',['$scope', '$http', 'classifiedsFactory', '$mdSidenav', '$mdToast', '$mdDialog', '$state', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state){
    var vm = this;
    // firebase concapt
    vm.classifieds = classifiedsFactory.ref;
    vm.classifieds.$loaded().then(function(classifieds){
      vm.categories = getCategories(classifieds);
    });
    // classifiedsFactory.getClassifieds().then(function (classifieds){
    //   vm.classifieds = classifieds.data;
    //   vm.categories = getCategories(vm.classifieds);
    // });
    $scope.$on('newClassified', function(event, classified){
      // classified.id = vm.classifieds.length + 1;
      // vm.classifieds.push(classified);
      vm.classifieds.$add(classified);
      showToast('Classified saved!');
    });
    $scope.$on('editSaved', function(event, message){
      showToast(message);
    });
    var contact = {
      "name": "Aladdin Sonni",
      "phone": "(555) 555-5555",
      "email": "alaaden3000@gmail.com"
    }
    vm.openSidebar = function(){
      $state.go('classifieds.new');
    }
    vm.closeSidebar = function(){
      $mdSidenav('left').close();
    }
    function showToast(message){
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('top, right')
          .hideDelay(3000)
      );
    }
    function getCategories(classifieds){
      var categories = [];
      angular.forEach(classifieds, function(item){
        angular.forEach(item.categories, function(category){
          categories.push(category);
        });
      });
      return _.uniq(categories);
    }
    vm.saveClassified = function(classified){
      if(classified){
        classified.contact = contact;
        vm.classifieds.push(classified);
        vm.classified = {};
        vm.closeSidebar();
        showToast("Classified saved!");
      }
    }
    vm.editClassified = function(classified){
      $state.go('classifieds.edit', {
        id: classified.$id
      });
    }
    vm.saveEdit = function(){
      vm.editing = false;
      vm.classified = {};
      vm.closeSidebar();
      showToast("Edit saved!");
    }
    vm.deleteClassified = function(event, classified){
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete ' + classified.title + ' ?')
        .ok('Yes')
        .cancel('No')
        .targetEvent(event);
      $mdDialog.show(confirm).then(function(){
        // var index = vm.classifieds.indexOf(classified);
        // vm.classifieds.splice(index, 1);
        vm.classifieds.$remove(classified);
        showToast('Classified deleted!');
      }, function(){

      });
    }
    // var data = [
    //   {
    //     "id":"1",
    //     "title":"20 Foot Equipment Trailer",
    //     "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb",
    //     "price":6000,
    //     "posted":"2015-10-24",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //       "Vehicled",
    //       "Parts and Accessoried"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":213
    //   },
    //   {
    //     "id":"2",
    //     "title":"Canada Goose Jacket",
    //     "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb",
    //     "price":500,
    //     "posted":"2015-10-28",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //       "Clothing"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":201
    //   },
    //   {
    //     "id":"3",
    //     "title":"Baby Crib and Matress",
    //     "description":"Good condition",
    //     "price":50,
    //     "posted":"2015-10-27",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //      "Furniture"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":23
    //   },
    //   {
    //     "id":"4",
    //     "title":"Leather Sofa",
    //     "description":"Brown leather sofa for sale. Good condition but small tear on one cush",
    //     "price":250,
    //     "posted":"2015-11-01",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //       "Furniture"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":77
    //   },
    //   {
    //     "id":"5",
    //     "title":"MacBook Air",
    //     "description":"2013 MacBook Air. Great condition, but a few scratches.",
    //     "price":1150,
    //     "posted":"2015-11-03",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //     "Electronics",
    //     "Computer Parts and Accessories"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":889
    //   },
    //   {
    //     "id":"6",
    //     "title":"2008 Dodge Caliber",
    //     "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb",
    //     "price":4800,
    //     "posted":"2015-12-03",
    //     "contact":{
    //       "name":"Jhon Doe",
    //       "phone":"(555) 555-5555",
    //       "email":"johndoe@gmail.com"
    //     },
    //     "categories":[
    //     "Vehicles",
    //     "Cars"
    //     ],
    //     "image":"img/p1358549934434943.jpg",
    //     "views":423
    //   }
    // ]
    // var firebase = classifiedsFactory.ref;
    // angular.forEach(data, function(item){
    //   firebase.$add(item);
    // });
  }]);
})();