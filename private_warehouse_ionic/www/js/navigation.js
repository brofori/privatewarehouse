// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//
//
privateWarehouse
  //.config(function($stateProvider, $urlRouterProvider) {

  //$stateProvider.state('app', {
  //  url: '/app',
  //  abstract: true,
  //  templateUrl: 'templates/menu.html',
  //  controller: 'AppCtrl'
  //})

  //$stateProvider.state('app.stockList', {
  //  url: '/stockList',
  //  templateUrl: 'templates/stockListView.html',
  //  controller: 'stockListCtrl'
  //});
  //$stateProvider.state('app.addProduct', {
  //  url: '/addProduct',
  //  templateUrl: 'templates/addProductView.html',
  //  controller: 'addProductCtrl'
  //});
  //$stateProvider.state('app.productDetail', {
  //  url: '/productDetail/{productId}',
  //  templateUrl: 'templates/productDetailView.html',
  //  controller: 'productDetailCtrl',

  //});
  //$stateProvider.state('app.shoppingList', {
  //  url: '/shoppingList',
  //  templateUrl: 'templates/shoppingListView.html',
  //  controller: 'shoppingListCtrl'
  //});





  //$urlRouterProvider.otherwise('/stockList');





  //})
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(0);

  /*
  // Turn off back button text
  $ionicConfigProvider.backButton.previousTitleText(false);
  */

  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.shoppingList', {
    url: '/shoppingList',
    views: {
      'menuContent': {
        templateUrl: 'templates/shoppingListView.html',
        controller: 'shoppingListCtrl'
      },
      'fabContent': {
        template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
        controller: function($timeout) {
          $timeout(function() {
            document.getElementById('fab-activity').classList.toggle('on');
          }, 200);
        }
      }
    }
  })

  .state('app.productDetail', {
    url: '/productDetail/{productId}',
    views: {
      'menuContent': {
        templateUrl: 'templates/productDetailView.html',
        controller: 'productDetailCtrl'
      },
      'fabContent': {
        template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
        controller: function($timeout) {
          $timeout(function() {
            document.getElementById('fab-friends').classList.toggle('on');
          }, 900);
        }
      }
    }
  })

  .state('app.addProduct', {
    url: '/addProduct',
    views: {
      'menuContent': {
        templateUrl: 'templates/addProductView.html',
        controller: 'addProductCtrl'
      },
      'fabContent': {
        template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
        controller: function($timeout) {
          $timeout(function() {
            document.getElementById('fab-gallery').classList.toggle('on');
          }, 600);
        }
      }
    }
  })

  .state('app.stockList', {
    url: '/stockList',
    views: {
      'menuContent': {
        templateUrl: 'templates/stockListView.html',
        controller: 'stockListCtrl'
      },
      'fabContent': {
        template: ''
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stockList');
});
