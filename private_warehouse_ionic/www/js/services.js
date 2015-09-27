privateWarehouse.factory('backendService', ['$q', '$http', '$state', function($q, $http, $state) {

  /* Standard ajax success function to be used when no callback is defined. */
  var standardSuccessFunction = function(data, status, headers, config) {
    if (data.Data && data.Data.loginRequired) {

      $state.go('startpage.login');
    }
  };

  /* Standard ajax fail function always executed when an error occured. */
  var standardFailFunction = function(data, status, headers, config) {
    console.log('Error occured: ' + status + '.');
  };

  /* Standard ajaxRequest takes url to call, data to pass and callbacks to handle the response.
   * Returns a promise to the accessed data.
   * If you want to handle every result of the call use the deferred variable.
   * If you wont to differ actions from success and fail pass callbacks.
   */
  var ajaxRequest = function(url, data, successCallback, failCallback) {
    successCallback = successCallback ? successCallback : standardSuccessFunction;

    var errorFunction = function(data, status, headers, config) {
      standardFailFunction(data, status, headers, config);
      if (failCallback) {
        failCallback(data, status, headers, config);
      }
    };

    var deferred = $q.defer();

    $http.post(url, data)
        .success(function(data) {
          standardSuccessFunction(data);
          deferred.resolve(data);
        })
        .error(function(data) {
          errorFunction(data);
          deferred.reject(data);
        });

    return deferred.promise;
  };

  var ajaxGetRequest = function(url, data, successCallback, failCallback) {
    successCallback = successCallback ? successCallback : standardSuccessFunction;

    var errorFunction = function(data, status, headers, config) {
      if (failCallback) {
        failCallback(data, status, headers, config);
      }
      standardFailFunction(data, status, headers, config);
    };

    var deferred = $q.defer();

    $http.get(url)
        .success(function(data) {
          standardSuccessFunction(data);
          deferred.resolve(data);
        })
        .error(function(data) {
          errorFunction(data);
          deferred.reject(data);
        });

    return deferred.promise;
  };

  return {
    ajaxRequest: ajaxRequest,
    ajaxGetRequest: ajaxGetRequest
  }

}])
.factory('dataService', ['backendService', function(backendService) {
  /*
   * Configure all path here
   */
  // var API = "http://priofox.vega.uberspace.de/index.php/api/v1.0/";
  var API = "http://rewe.scriptkiddi.de/";

  var urls = {
    getItemsUrl: API + 'households/1/instock/',
    getShoppinglistUrl: API + 'households/1/shoppinglist/',
    addProductUrl: API + 'households/1/add_product/',
    removeProductUrl: API + 'households/1/remove_product/',
    getItemByBarcodeUrl: API + 'items/',
    getProductById: API + 'products/?item_id='
  }

  var getProductByItemId = function(id) {
    return backendService.ajaxGetRequest(urls.getProductById + id)
  }

  var getItemDetails = function(id) {
    return backendService.ajaxGetRequest(API + 'products/' + id);
  }
  var getItems = function() {
    return backendService.ajaxGetRequest(urls.getItemsUrl);
  }
  var getShoppingList = function() {
    return backendService.ajaxGetRequest(urls.getShoppinglistUrl);
  }
  var addToStock = function(id, quantity) {
    return backendService.ajaxRequest(urls.addProductUrl, { id: id, min_quantity: quantity | 0 });
  }
  var removeFromStock = function(id) {
    return backendService.ajaxRequest(urls.removeProductUrl, { id: id })
  }
  var getItemByBarcode = function(code) {
    return backendService.ajaxGetRequest(urls.getItemByBarcodeUrl + '?barcode=' + code)
  }

  return {
    getItems: getItems,
    getItemDetails: getItemDetails,
    getShoppingList: getShoppingList,
    addToStock: addToStock,
    getItemByBarcode: getItemByBarcode,
    removeFromStock: removeFromStock,
    getProductByItemId: getProductByItemId
  };
}])
