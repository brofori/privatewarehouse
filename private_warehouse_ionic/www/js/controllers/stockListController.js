privateWarehouse.controller('stockListCtrl', function($scope, $state) {
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
  $scope.reduceProductAmount = function(event) {
    event.stopPropagation();
  }
  $scope.goToAddProduct = function() {
    $state.go('app.addProduct');
  }
  $scope.stockList = [
   {
     "id": 477,
     "name": "Barra Pan",
     "barcode": "2416070000501",
     "image_url": "http://www.codecheck.info/img/288104/1",
     "product_link": "http://www.codecheck.info/essen/backwaren/baguette/ean_2416070000501/id_828746/Barra_Pan.pro",
     "category": 1,
     "manufacturer": 1
   },
   {
     "id": 474,
     "name": "Barra Pan",
     "barcode": "2416070000501",
     "image_url": "http://www.codecheck.info/img/288104/1",
     "product_link": "http://www.codecheck.info/essen/backwaren/baguette/ean_2416070000501/id_828746/Barra_Pan.pro",
     "category": 1,
     "manufacturer": 1
   },
   {
     "id": 427,
     "name": "Barra Pan",
     "barcode": "2416070000501",
     "image_url": "http://www.codecheck.info/img/288104/1",
     "product_link": "http://www.codecheck.info/essen/backwaren/baguette/ean_2416070000501/id_828746/Barra_Pan.pro",
     "category": 1,
     "manufacturer": 1
   }
  ]

})