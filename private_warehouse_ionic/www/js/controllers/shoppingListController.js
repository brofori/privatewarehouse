privateWarehouse.controller('shoppingListCtrl', function($scope, $state) {
  $scope.swipeLeftDistance = 0;
  $scope.swipeLeftPosition = undefined;
  $scope.activeItemIndex = undefined;
  $scope.estimatedPrice = 0;

  $scope.checkProduct = function(product) {
    product.checked = true;
    $scope.calculateSum();
  }
  $scope.calculateSum = function() {
    var fullPrice = 0;
    for (var i = 0; i < $scope.shoppingList.length; i++) {
      if ($scope.shoppingList[i].checked) {
        fullPrice += $scope.shoppingList[i].price;
      }
    }
    $scope.estimatedPrice = fullPrice;
  }
  $scope.removeProduct = function(index) {

    $scope.shoppingList.splice(index, 1);
    $scope.swipeLeftDistance = 0;
  }
  $scope.onItemDrag = function(event, index) {
    var tempIndex = $scope.activeItemIndex;
    $scope.activeItemIndex = index;
    if (!$scope.swipeLeftPosition) {
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }
    else if (tempIndex == index) {
      $scope.swipeLeftDistance = Math.max((event.gesture.center.pageX - $scope.swipeLeftPosition), -80);
    } else {
      $scope.swipeLeftDistance = 0;
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }

    $scope.swipeLeftDistance = Math.min($scope.swipeLeftDistance, 0)
  }
  $scope.availableList = [
    {
      name: "Red Bull",
      amount: "lots",
      categoryId: 3,
      price: 3.20
    },
        {
          name: "Cookies",
          amount: "some",
          categoryId: 3,
          price: 4.60
        },
            {
              name: "Beer",
              amount: "1 pkg.",
              categoryId: 3,
              price: 10.67
            },
                {
                  name: "Bread",
                  amount: "2 pkg.",
                  categoryId: 3,
                  price: 4.7
                },
  ]
  $scope.notAvailableList = [{
    name: "Red Bull",
    amount: "lots",
    categoryId: 3,
    price: 3.20
  },
        {
          name: "Cookies",
          amount: "some",
          categoryId: 3,
          price: 4.60
        },
            {
              name: "Beer",
              amount: "1 pkg.",
              categoryId: 3,
              price: 10.67
            },
                {
                  name: "Bread",
                  amount: "2 pkg.",
                  categoryId: 3,
                  price: 4.7
                }, ]

})