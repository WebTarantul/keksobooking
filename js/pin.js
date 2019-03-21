'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var mainPin = document.querySelector('.map__pin--main');

  // create pins on the map
  var createPin = function (arrayAdverts) {
    var template = document.querySelector('template');
    var templatePin = template.content.querySelector('.map__pin');
    var elementPin = templatePin.cloneNode(true);
    var avatarPin = elementPin.querySelector('img');
    elementPin.style.top = arrayAdverts.location.y - PIN_HEIGHT + 'px';
    elementPin.style.left = arrayAdverts.location.x - (PIN_WIDTH / 2) + 'px';
    elementPin.setAttribute('data-ad-count', arrayAdverts.data_Ad_count);

    avatarPin.src = arrayAdverts.author.avatar;
    avatarPin.alt = arrayAdverts.offer.title;

    return elementPin;
  };

  // get adress from pin
  var getAdress = function () {
    var x = mainPin.style.left;
    var y = mainPin.style.top;
    var resX = +(x.replace('px', '')) + (PIN_WIDTH / 2);
    var resY = +(y.replace('px', '')) + (PIN_HEIGHT);
    return resX + ', ' + resY;
  };

  // genaration pins of adverts
  var generatePins = function (arrayAdverts) {
    var fragmentPins = document.createDocumentFragment();

    for (var i = 0; i < arrayAdverts.length; i++) {
      var element = arrayAdverts[i];
      fragmentPins.appendChild(createPin(element));
    }
    return fragmentPins;
  };

  // remove pins
  function removePins() {
    var allPins = document.querySelectorAll('.map__pin');
    allPins.forEach(function (el) {
      if (el.classList.contains('map__pin--main')) {
        return;
      }
      el.remove();
    });
  }

  // reset mainPin position
  function resetMainPinPosition() {
    mainPin.style.left = MAIN_PIN_START_X + 'px';
    mainPin.style.top = MAIN_PIN_START_Y + 'px';
  }
  window.pins = {};
  window.pins.generatePins = generatePins;
  window.pins.getAdress = getAdress;
  window.pins.removePins = removePins;
  window.pins.resetMainPinPosition = resetMainPinPosition;
})();
