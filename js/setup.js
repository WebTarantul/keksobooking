'use strict';
var adFormElements = document.querySelectorAll('.ad-form__element');
var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var mapBlock = document.querySelector('.map');
var inputAdress = document.querySelector('#address');

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
  insertAdress();
  setTimeout(function () {
    // отрисовка в документе
    var pinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsAll.length; i++) {

      pinsAll[i].addEventListener('click', function (evt) {
        var currentTarget = evt.currentTarget;
        var currentButtonCount = currentTarget.getAttribute('data-ad-count');
        var allMapCards = document.querySelectorAll('.map__card');
        for (var j = 0; j < allMapCards.length; j++) {
          allMapCards[j].classList.add('hidden');
        }
        var newMapCardItem = createCardMap(adverts[currentButtonCount]);
        mapBlock.insertBefore(newMapCardItem, document.querySelector('.map__filters-container'));
        var currentMapCard = document.querySelector('.map__card[data-ad-count="' + currentButtonCount + '"]');
        var openPopup = function () {
          currentMapCard.classList.remove('hidden');
        };
        var openPopupEnter = function (evt) {
          if (evt.keyCode === 13) {
            openPopup();
          }
        };

        currentTarget.addEventListener('click', openPopup);
        currentTarget.addEventListener('keydown', openPopupEnter);

      },
      {once: true});
    }
  }, 0);
};

mainPin.addEventListener('mouseup', makeActivePage);
var pinsAdded = false;
mainPin.addEventListener('mouseup', function () {
  mapBlock.querySelector('.map__pins').appendChild(generatePins(adverts));
  pinsAdded = true;
});

// NOTE get adress from pin
var getAdress = function () {
  var x = mainPin.style.left;
  var y = mainPin.style.top;
  var resX = +(x.replace('px', '')) + (PIN_WIDTH / 2);
  var resY = +(y.replace('px', '')) + (PIN_HEIGHT);
  return resX + ', ' + resY;
};
// NOTE insert adress to input
var insertAdress = function () {
  inputAdress.value = getAdress();
};


