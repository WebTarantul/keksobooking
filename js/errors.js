'use strict';

(function () {
  function createErrorDiv(errorMessage) {
    var div = document.createElement('DIV');
    div.style.position = 'fixed';
    div.style.left = '0';
    div.style.top = '0';
    div.style.zIndex = '9999';
    div.style.background = 'red';
    div.style.width = '100%';
    div.style.fontSize = '22px';
    div.style.color = 'white';
    div.style.textAlign = 'center';
    div.textContent = errorMessage;
    div.classList.add('error-message');
    return div;
  }

  /**
   * @param  {string} errorMessage Message of error
   */
  function onError(errorMessage) {
    var messageDiv = createErrorDiv(errorMessage);
    document.body.appendChild(messageDiv);
    setTimeout(function () {
      var div = document.querySelector('.error-message');
      div.remove();
    }, 8000);
  }
  window.errors = {
    show: onError
  };
})();

