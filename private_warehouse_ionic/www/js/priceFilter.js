privateWarehouse.filter('priceFilter', function() {

  return function(input) {
    var tens = parseInt(input);
    var cents = parseInt(input * 100 - tens * 100);
    if (cents.toString().length < 2) {
      cents = cents + '0';
    }
    return '<span class="tens">' + tens + '</span><span class="cents">' + cents + '</span>';
  };
})

privateWarehouse.filter('intFilter', function() {

  return function(input) {

    return parseInt(input);
  };
})