privateWarehouse.controller('shoppingListCtrl', function($scope, $state) {
  $scope.swipeLeftDistance = 0;
  $scope.swipeLeftPosition = undefined;
  $scope.activeItemIndex = undefined;
  $scope.estimatedPrice = 0;
  $scope.filterPopupBool = false;
  $scope.currentStore = {};
  $scope.listTitle = "Shopping at REWE"

  $scope.onStoreChange = function() {
    $scope.storeSelection = $scope.storeTypes[$scope.currentStore.id].name;
    console.log($scope.currentStore.id);
  }

  $scope.checkProduct = function(product) {
    product.checked = true;
    sortLists();
    $scope.calculateSum();
    $scope.swipeLeftDistance = 0;
  }
  $scope.calculateSum = function() {
    var fullPrice = 0;
    for (var i = 0; i < $scope.availableList.length; i++) {
      if ($scope.availableList[i].checked) {
        fullPrice += $scope.availableList[i].price;
      }
    }
    for (var i = 0; i < $scope.notAvailableList.length; i++) {
      if ($scope.notAvailableList[i].checked) {
        fullPrice += $scope.notAvailableList[i].price;
      }
    }
    $scope.estimatedPrice = fullPrice;
  }
  $scope.removeProduct = function(index, available) {
    if (available) {
      $scope.availableList.splice(index, 1);
    } else {
      $scope.notAvailableList.splice(index, 1);
    }
    $scope.swipeLeftDistance = 0;
    sortLists();
  }
  $scope.onItemDrag = function(event, index) {
    var tempIndex = $scope.activeItemIndex;
    $scope.activeItemIndex = index;
    if (!$scope.swipeLeftPosition) {
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }
    else if (tempIndex == index) {
      $scope.swipeLeftDistance = Math.max((event.gesture.center.pageX - $scope.swipeLeftPosition), -90);
    } else {
      $scope.swipeLeftDistance = 0;
      $scope.swipeLeftPosition = event.gesture.center.pageX;
    }

    $scope.swipeLeftDistance = Math.min($scope.swipeLeftDistance, 0)
  }

  var sortLists = function() {
    var sortFunction = function(a, b) {
      if ((a.checked && b.checked) || (!a.checked && !b.checked)) {
        return a.categroyId - b.categoryId;
      } else {
        if (a.checked) {
          return 1;
        } else {
          return -1;
        }
      }
    }
    $scope.availableList.sort(sortFunction)
    $scope.notAvailableList.sort(sortFunction)
  }

  $scope.storeTypes = [
    {
      name: "convenience store"
    },
    {
      name: "farmers market"
    },
    {
      name: "drugstore"
    },
    {
      name: "gas station"
    },
    {
      name: "bakery"
    },
  ]

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

  sortLists();

})