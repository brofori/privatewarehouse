privateWarehouse.controller('productDetailCtrl', function($scope, $state) {

  $scope.currentProduct = {
    "id": 477,
    "name": "Barra Pan",
    "barcode": "2416070000501",
    "image_url": "http://www.codecheck.info/img/288104/1",
    "product_link": "http://www.codecheck.info/essen/backwaren/baguette/ean_2416070000501/id_828746/Barra_Pan.pro",
    "category": 1,
    "manufacturer": 1
  };

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