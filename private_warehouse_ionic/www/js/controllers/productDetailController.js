privateWarehouse.controller('productDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, dataService) {
  // Set Header
  dataService.getItemDetails($stateParams.productId).then(function(response) {
    $scope.currentProduct = response;
    setTimeout(function() {
      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);

      // Set Motion
      $timeout(function() {
        ionicMaterialMotion.slideUp({
          selector: '.slide-up'
        });
      }, 300);

      $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
        });
      }, 700);

      // Set Ink
      ionicMaterialInk.displayEffect();
    })
  })

  $scope.eventList = [
    {
      "in": true,
      "amount": "2 pkg",
      "time": "2 days ago"
    }, {
      "in": false,
      "amount": "1 pkg",
      "time": "4 days ago"
    },
  ]

})