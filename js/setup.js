'use strict';
var adFormElements = document.querySelectorAll('.ad-form__element');
var adForm = document.querySelector('.ad-form');
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
        var currentMapCard = document.querySelector('.map__card[data-ad-count="' + currentButtonCount + '"]');
        var newMapCardItem = createCardMap(adverts[currentButtonCount]);

        if (currentMapCard) {
          return
        } else {
          for (var j = 0; j < allMapCards.length; j++) {
            allMapCards[j].remove();
          }
          if (document.querySelector('.map__pin--active')) {
            document.querySelector('.map__pin--active').classList.remove('map__pin--active');
          }

          currentTarget.classList.add('map__pin--active');
          mapBlock.insertBefore(newMapCardItem, document.querySelector('.map__filters-container'));
        }
      });
    }
  }, 0);
};


