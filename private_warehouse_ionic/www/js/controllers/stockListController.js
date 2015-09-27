privateWarehouse.controller('stockListCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, dataService) {
  dataService.getItems().then(function(response) {
    $scope.stockList = response;
    setTimeout(function() {
      // Set Header
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.$parent.setHeaderFab('left');

      // Delay expansion
      $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
      }, 300);

      // Set Motion
      ionicMaterialMotion.fadeSlideInRight();

      // Set Ink
      ionicMaterialInk.displayEffect();

    })
  })




  $scope.swipeLeftDistance = 0;
  $scope.swipeLeftPosition = undefined;
  $scope.activeItemIndex = undefined;
  $scope.getAmountById = function(id) {
    return 5;
  }
  $scope.goToShoppingList = function() {
    $state.go('app.shoppingList')
  }
  $scope.goToDetailProductView = function(id) {
    $state.go('app.productDetail', { productId: id })
  }
  $scope.onItemDrag = function(event, index) {
    if (!$scope.swipeLeftPosition) {
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }
    else if ($scope.activeItemIndex == index) {
      $scope.swipeLeftDistance = Math.max((event.gesture.center.pageX - $scope.swipeLeftPosition), -60);
    } else {
      $scope.swipeLeftDistance = 0;
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }
    $scope.activeItemIndex = index;
    $scope.swipeLeftDistance = Math.min($scope.swipeLeftDistance, 0)
  }
  $scope.reduceProductAmount = function(event, id) {
    event.stopPropagation();
    $scope.stockList = [];
    dataService.removeFromStock(id).then(function() {
      dataService.getItems().then(function(response) {
        $scope.stockList = response;
        setTimeout(function() {
          $scope.$parent.showHeader();
          $scope.$parent.clearFabs();
          $scope.$parent.setHeaderFab('left');

          // Delay expansion
          $timeout(function() {
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
          }, 300);

          // Set Motion
          ionicMaterialMotion.fadeSlideInRight();

          // Set Ink
          ionicMaterialInk.displayEffect();
        })

      })
    });

  }
  $scope.goToAddProduct = function() {
    $state.go('app.addProduct');
  }

})
