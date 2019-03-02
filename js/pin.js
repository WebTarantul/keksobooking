'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
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
  window.generatePins = generatePins;
  window.getAdress = getAdress;
})();
