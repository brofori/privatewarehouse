// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//
//
privateWarehouse.config(function($stateProvider, $urlRouterProvider) {



  $stateProvider.state('stockList', {
    url: '/stockList',
    templateUrl: 'templates/stockListView.html',
    controller: 'stockListCtrl'
  });
  $stateProvider.state('addProduct', {
    url: '/addProduct',
    templateUrl: 'templates/addProductView.html',
    controller: 'addProductCtrl'
  });
  $stateProvider.state('productDetail', {
    url: '/productDetail/{productId}',
    templateUrl: 'templates/productDetailView.html',
    controller: 'productDetailCtrl',
    
  });
  $stateProvider.state('shoppingList', {
    url: '/shoppingList',
    templateUrl: 'templates/shoppingListView.html',
    controller: 'shoppingListCtrl'
  });





  $urlRouterProvider.otherwise('/stockList');
});
