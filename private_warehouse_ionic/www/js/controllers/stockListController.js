privateWarehouse.controller('stockListCtrl', function($scope, $state) {
  $scope.swipeLeftDistance = 0;
  $scope.swipeLeftPosition = undefined;
  $scope.activeItemIndex = undefined;
  $scope.getAmountById = function(id) {
    return 5;
  }
  $scope.goToShoppingList = function() {
    $state.go('shoppingList')
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
  $scope.reduceProductAmount = function() {

  }
  $scope.goToAddProduct = function() {
    $state.go('addProduct');
  }
  $scope.stockList = [
    {
      name: "Milk",
      category: 0,
      manufacturerId: 3,
      price: 23.30,
      supplierId: 4,
      id: 8,
      imgUrl: 'undefined',
      expirationDate: '23.3.2015',


    },
        {
          name: "Apples",
          category: 0,
          manufacturerId: 3,
          price: 23.30,
          supplierId: 4,
          id: 82,
          imgUrl: 'undefined',
          expirationDate: '23.3.2015',


        },
            {
              name: "Butter",
              category: 0,
              manufacturerId: 3,
              price: 23.30,
              supplierId: 4,
              id: 18,
              imgUrl: 'undefined',
              expirationDate: '23.3.2015',


            }
  ]

})