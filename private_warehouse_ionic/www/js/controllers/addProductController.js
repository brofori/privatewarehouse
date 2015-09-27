privateWarehouse.controller('addProductCtrl', function($scope, $stateParams, $state, $timeout, ionicMaterialInk, ionicMaterialMotion, $cordovaBarcodeScanner, dataService) {
  $scope.model = {};
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
  $scope.currentProductCode;

  $scope.addItem = function() {
    dataService.getItemByBarcode($scope.model.barcode).then(function(response) {
      if (response[0].id) {
        dataService.getProductByItemId(response[0].id).then(function(data) {
          dataService.addToStock(data[0].id, $scope.model.quantity | 0).then(function() {
            $state.go('app.stockList')
          });
        })

      }
    })
  }

  $scope.openScanner = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.currentProductCode = imageData.text;
      dataService.getItemByBarcode($scope.currentProductCode).then(function(response) {
        if (response[0].id) {
          dataService.getProductByItemId(response[0].id).then(function(data) {
            dataService.addToStock(data[0].id, $scope.model.quantity | 0).then(function() {
              $state.go('app.stockList')
            });
          })

        }
      })

    }, function(error) {

    });
  }


})