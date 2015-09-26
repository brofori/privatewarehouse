privateWarehouse.controller('addProductCtrl', function($scope, $state, $cordovaBarcodeScanner) {
  $scope.currentProductCode;

  $scope.openScanner = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.currentProductCode = imageData.text;

    }, function(error) {

    });
  }


})