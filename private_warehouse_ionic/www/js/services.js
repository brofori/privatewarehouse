angular.module('firstfox.services', [])

.factory('backendService', ['$q', '$http', function($q, $http) {

  var APP_VERSION = 42;
  var APP_LANGUAGE = 'eng';
  var APP_URL_PARAMS = "?app_version=" + APP_VERSION + "&app_language=" + APP_LANGUAGE;

  /* Standard ajax success function to be used when no callback is defined. */
  var standardSuccessFunction = function(data, status, headers, config) {
    // console.log("standard success")
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
  var ajaxPostRequest = function(url, data, successCallback, failCallback) {
    successCallback = successCallback ? successCallback : standardSuccessFunction;

    var errorFunction = function(data, status, headers, config) {
      if (failCallback) {
        failCallback(data, status, headers, config);
      }
      standardFailFunction(data, status, headers, config);
    };

    var deferred = $q.defer();

    $http.post(url + APP_URL_PARAMS, data, { withCredentials: true })
        .success(function(data) {
          successCallback(data);
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

    $http.get(url + APP_URL_PARAMS, { withCredentials: true })
        .success(function(data) {
          successCallback(data);
          deferred.resolve(data);
        })
        .error(function(data) {
          errorFunction(data);
          deferred.reject(data);
        });

    return deferred.promise;
  };

  return {
    ajaxPostRequest: ajaxPostRequest,
    ajaxGetRequest: ajaxGetRequest
  }

}])
.factory('dataService', ['backendService', function(backendService) {
  /*
   * Configure all path here
   */
  // var API = "http://priofox.vega.uberspace.de/index.php/api/v1.0/";
  var API = "http://firstfox.com/index.php/api/v1.0/";

  var urls = {
    registerUrl: API + "user/create",
    loginUrl: API + "login",
    getLocationsUrl: API + "locations",
    getEventsUrl: API + "events",
    postCreateUser: API + "user/create",
    isLoggedInUrl: API + "user/profile",
    getEventStatsUrl: API + "event/",
    getEventDetailsUrl: API + "event",
    getBookmarkedEventsUrl: API + "user/bookmarked-events",
    getRegisteredEventsUrl: API + "user/registered-events",
    registerForEventUrl: API + "event",
    enterPromoCodeUrl: API + "user/use-promotion",
    bookmarkUrl: API + "event",
    unbookmarkUrl: API + "event",
    getUserProfileUrl: API + "user/profile",
    getNextEventUrl: API + "user/next-registered-event",
    getYouUrl: API + "user/profile",
    saveYouUrl: API + "user/edit",
    getOccupationUrl: API + "user/occupations",
    sendFeedbackUrl: API + "feedback",
    getCountriesUrl: API + "rawresource/en/nationalities"
  }

  /* sends registration data to the server
   * returns a depricated variable
   * use with dataService.register({}).then(function(response){alert(response.data)})
   * this is a POST request (just to be safe)
   */
  var register = function(data, fun_success, fun_error) {
    return backendService.ajaxPostRequest(urls.registerUrl, data, fun_success, fun_error);
  }

  var login = function(email, password, fun_success, fun_error) {
    var data = {
      "user_name_or_email": email,
      "password": password
    }
    return backendService.ajaxPostRequest(urls.loginUrl, data, fun_success, fun_error);
  }

  var getLocations = function() {
    return backendService.ajaxGetRequest(urls.getLocationsUrl, {});
  }

  var getEvents = function(city, errorFunction) {
    return backendService.ajaxGetRequest(urls.getEventsUrl + "/" + city, {}, null, errorFunction);
  }

  var getEventDetailsById = function(id, promocode) {
    return backendService.ajaxGetRequest(urls.getEventDetailsUrl + "/" + id, promocode);
  }

  var getStatsByEventId = function(id) {
    return backendService.ajaxGetRequest(urls.getEventStatsUrl + id + "/userstats");
  }

  var isLoggedIn = function(fun_success, fun_error) {
    return backendService.ajaxGetRequest(urls.isLoggedInUrl, {}, fun_success, fun_error);
  }

  var getUserProfile = function(fun_success, fun_error) {
    return backendService.ajaxGetRequest(urls.getUserProfileUrl, {}, fun_success, fun_error);
  }

  var getBookmarkedEvents = function(city) {
    return backendService.ajaxGetRequest(urls.getBookmarkedEventsUrl + "/" + city);
  }

  var getRegisteredEvents = function() {
    return backendService.ajaxGetRequest(urls.getRegisteredEventsUrl);
  }

  var registerForEvent = function(eventId) {
    return backendService.ajaxPostRequest(urls.registerForEventUrl + "/" + eventId + "/attend");
  }
  var unregisterForEvent = function(eventId) {
    return backendService.ajaxPostRequest(urls.registerForEventUrl + "/" + eventId + "/unattend");
  }

  var enterPromoCode = function(promoCode, errorFunction) {
    return backendService.ajaxGetRequest(urls.enterPromoCodeUrl + "/" + promoCode, {}, null, errorFunction);
  }

  var bookmarkEvent = function(eventId, fun_success) {
    return backendService.ajaxPostRequest(urls.bookmarkUrl + "/" + eventId + "/bookmark", {}, fun_success);
  }

  var unbookmarkEvent = function(eventId, fun_success) {
    return backendService.ajaxPostRequest(urls.unbookmarkUrl + "/" + eventId + "/unbookmark", {}, fun_success);
  }

  var getNextEvent = function(fun_success, fun_error) {
    return backendService.ajaxGetRequest(urls.getNextEventUrl, {}, fun_success, fun_error);
  }

  var getYou = function() {
    return backendService.ajaxGetRequest(urls.getYouUrl)
  }

  var saveYou = function(youObject) {
    return backendService.ajaxPostRequest(urls.saveYouUrl, youObject);
  }

  var getOccupations = function() {
    return backendService.ajaxGetRequest(urls.getOccupationUrl);
  }
  var getEventIdByPromoCode = function(promocode) {
    return backendService.ajaxGetRequest(urls.getEventIdByPromoCodeUrl + "/" + promocode)
  }
  var sendFeedback = function(feedback) {
    return backendService.ajaxPostRequest(urls.sendFeedbackUrl, { feddback: feedback });
  }
  var getCountries = function() {
    return backendService.ajaxGetRequest(urls.getCountriesUrl);
  }

  return {
    register: register,
    login: login,
    getLocations: getLocations,
    getEvents: getEvents,
    getEventDetailsById: getEventDetailsById,
    getStatsByEventId: getStatsByEventId,
    isLoggedIn: isLoggedIn,
    getBookmarkedEvents: getBookmarkedEvents,
    getRegisteredEvents: getRegisteredEvents,
    registerForEvent: registerForEvent,
    enterPromoCode: enterPromoCode,
    bookmarkEvent: bookmarkEvent,
    unbookmarkEvent: unbookmarkEvent,
    getUserProfile: getUserProfile,
    getNextEvent: getNextEvent,
    unregisterForEvent: unregisterForEvent,
    saveYou: saveYou,
    getYou: getYou,
    getOccupations: getOccupations,
    sendFeedback: sendFeedback,
    getCountires: getCountries
  };
}])
