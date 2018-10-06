'use strict';
var adFormElements = document.querySelectorAll('.ad-form__element');
var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var mapBlock = document.querySelector('.map');

for (var i = 0; i < adFormElements.length; i++) {
  var adFormElement = adFormElements[i];
  adFormElement.setAttribute('disabled', 'disabled');
}

var makeActivePage = function () {
  for (var i = 0; i < adFormElements.length; i++) {
    var adFormElement = adFormElements[i];
    adFormElement.removeAttribute('disabled');
  }
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};
mainPin.addEventListener('mouseup', makeActivePage);
