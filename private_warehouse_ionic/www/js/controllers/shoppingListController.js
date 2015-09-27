privateWarehouse.controller('shoppingListCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, dataService) {
  $scope.showFilterOverlay = false;
  $scope.availableCategories = [1, 72, 5];

  var splitList = function() {
    $scope.availableList = []
    $scope.notAvailableList = []
    for (var i = 0; i < $scope.shoppingList.length; i++) {
      $scope.shoppingList[i].price = Math.random() * 20;
      if ($scope.availableCategories.indexOf($scope.shoppingList[i].category) != -1) {
        $scope.availableList.push($scope.shoppingList[i])
      } else {
        $scope.notAvailableList.push($scope.shoppingList[i])
      }
    }
    sortLists();
  }


  dataService.getShoppingList().then(function(response) {
    $scope.shoppingList = response.slice(0, 100);
    splitList();
  })
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

  $scope.swipeLeftDistance = 0;
  $scope.swipeLeftPosition = undefined;
  $scope.activeItemIndex = undefined;
  $scope.estimatedPrice = 0;
  $scope.filterPopupBool = false;
  $scope.currentStore = {};
  $scope.listTitle = "Shopping at REWE";
  $scope.saveToStock = function() {
    for (var i = 0; i < $scope.shoppingList.length; i++) {
      if ($scope.shoppingList[i].checked) {
        dataService.addToStock($scope.shoppingList[i].id);
      }
    }

  }

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
        return a.category - b.category;
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
  setTimeout(function() {
    angular.element(document.getElementById('fab-filter')).on('click', function() {
      console.log('got here')
      $scope.showFilterOverlay = !$scope.showFilterOverlay;
      $scope.$apply();
    })
  })
  $scope.storeSelection = $scope.storeTypes[0].name;


})