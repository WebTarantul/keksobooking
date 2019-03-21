'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = setTimeout(function () {
        callback.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    }
  }
})();
