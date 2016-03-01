var app = angular.module('ngClassifieds', ['ngMaterial','ui.router','firebase']);
// app.config(['$mdThemingProvider', '$stateProvider', function($mdThemingProvider, $stateProvider){
//   $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
//   $stateProvider.state('one', {
//     url: '/stateone',
//     template: '<h1>State One</h1>'
//   }).state('two', {
//     url: '/statetwo',
//     template: '<h1>State Two</h1><md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
//   }).state('two.more', {
//     url: '/more',
//     template: '<p>This is the deeper state</p>'
//   });
// }]);
app.config(['$mdThemingProvider', '$stateProvider', function($mdThemingProvider, $stateProvider){
  $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
  $stateProvider.state('classifieds', {
    url: '/classifieds',
    templateUrl: 'components/classifieds/classifieds.tpl.html',
    controller: 'classifiedsCtrl as vm'
  }).state('classifieds.new', {
    url: '/new',
    templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
    controller: 'newClassifiedsCtrl as vm'
  }).state('classifieds.edit', {
    url: '/edit/:id',
    templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
    controller: 'editClassifiedsCtrl as vm',
    params: {
      classified: null
    }
  });
}]);