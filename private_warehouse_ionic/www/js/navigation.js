privateWarehouse.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

  .state('app.addProduct', {
    url: '/addProduct',
    views: {
      'menuContent': {
        templateUrl: 'templates/addProductView.html',
        controller: 'addProductCtrl'
      },
      'fabContent': {
        template: ''

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
        template: '<button id="fab-filter" class="button button-fab button-fab-top-right expanded button-energized-900 filter spin"><i class="icon"></i></button>',
        controller: function($timeout) {
          $timeout(function() {
            document.getElementById('fab-filter').classList.toggle('on');
          }, 900);
        }
      }
    }
  })

  .state('app.shoppingList', {
    url: '/shoppingList',
    views: {
      'menuContent': {
        templateUrl: 'templates/shoppinglistView.html',
        controller: 'shoppingListCtrl'
      },
      'fabContent': {
        template: '<button id="fab-filter" class="button button-fab button-fab-top-right expanded button-energized-900 filter spin"><i class="icon"></i></button>',
        controller: function($timeout) {
          $timeout(function() {
            document.getElementById('fab-filter').classList.toggle('on');
          }, 900);
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
        template: '',
        controller: function($timeout) {
          /*$timeout(function () {
              document.getElementById('fab-profile').classList.toggle('on');
          }, 800);*/
        }
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/stockList');
});
