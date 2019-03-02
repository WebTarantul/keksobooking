'use strict';
(function () {
  var PIN_MIN_X = 30;
  var PIN_MAX_X = 1160;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var BUILDING_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Дом'
  };
  var template = document.querySelector('template');
  // var templateAd = template.content.querySelector('.map__card');

  var adverts;

  window.backend.load(function (data) {
    adverts = data;
    addDataCountOfArray(adverts);
  }, function (message) {
    window.errors.show(message);
  });
function addDataCountOfArray (array) {
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    el.data_Ad_count = i.toString();
  }
}

  // create advert cards
  var createCardMap = function (arrayAdverts) {
    var templateCard = template.content;
    var cardItem = templateCard.cloneNode(true);
    cardItem.removeChild(cardItem.querySelector('.map__pin'));
    var cardItemElement = cardItem.querySelector('.map__card');
    var cardItemCloseButton = cardItemElement.querySelector('.popup__close');

    cardItem.querySelector('.map__card').setAttribute('data-ad-count', arrayAdverts.data_Ad_count);
    cardItem.querySelector('.popup__title').textContent = arrayAdverts.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = arrayAdverts.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = arrayAdverts.offer.price;
    cardItem.querySelector('.popup__type').textContent = BUILDING_TYPES[arrayAdverts.offer.type];
    cardItem.querySelector('.popup__text--capacity').textContent = arrayAdverts.offer.rooms + ' комнаты для ' + arrayAdverts.offer.guests + ' гостей';
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayAdverts.offer.checkin + ', выезд до ' + arrayAdverts.offer.checkout;

    var closePopup = function () {
      cardItemElement.remove();
      if (document.querySelectorAll('.map__pin--active').length > 0) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }

    };

    var closePopupEsc = function (e) {
      if (e.keyCode === 27) {
        closePopup();
      }
    };

    cardItemCloseButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopupEsc);
    while (cardItem.querySelector('.popup__features').firstChild) {
      cardItem.querySelector('.popup__features').removeChild(cardItem.querySelector('.popup__features').firstChild);
    }
    cardItem.querySelector('.popup__features').appendChild(window.generateFeatures(arrayAdverts.offer.features));
    cardItem.querySelector('.popup__description').textContent = arrayAdverts.offer.description;
    while (cardItem.querySelector('.popup__photos').firstChild) {
      cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photos').firstChild);
    }
    cardItem.querySelector('.popup__photos').appendChild(window.generetePhotos(arrayAdverts.offer.photos));
    cardItem.querySelector('.popup__avatar').src = arrayAdverts.author.avatar;
    return cardItem;
  };


  // insert adress to input
  var insertAdress = function () {
    inputAdress.value = window.getAdress();
  };

  // drag and drop functionality
  var mainPin = document.querySelector('.map__pin--main');
  var onMouseDown = function (e) {
    e.preventDefault();

    var startDragCoocrdinates = {};
    startDragCoocrdinates.y = e.clientY;
    startDragCoocrdinates.x = e.clientX;
    document.addEventListener('mousemove', onMouseMove);

    function onMouseMove(evtMove) {
      evtMove.preventDefault();
      var shift = {};
      shift.y = startDragCoocrdinates.y - evtMove.clientY;
      shift.x = startDragCoocrdinates.x - evtMove.clientX;
      startDragCoocrdinates = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      var finishCoordinateX = (mainPin.offsetLeft - shift.x);
      var finishCoordinateY = (mainPin.offsetTop - shift.y);

      var isValidCoordinatesX = finishCoordinateX + (PIN_WIDTH / 2) <= PIN_MAX_X && finishCoordinateX + (PIN_WIDTH / 2) >= PIN_MIN_X;
      var isValidCoordinatesY = finishCoordinateY + (PIN_HEIGHT / 2) <= PIN_MAX_Y && finishCoordinateY + (PIN_HEIGHT / 2) >= PIN_MIN_Y;

      if (isValidCoordinatesX) {
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      }
      if (isValidCoordinatesY) {
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      }

    }
    document.addEventListener('mouseup', onMouseUp);
    var activePage = false;

    function onMouseUp(eUp) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // activision makeActivePage
      if (!activePage) {
        mapBlock.querySelector('.map__pins').appendChild(window.generatePins(adverts));
        makeActivePage();
        activePage = true;
      }

    }

  };

  mainPin.addEventListener('mousedown', onMouseDown);

  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adForm = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var inputAdress = document.querySelector('#address');

  for (let i = 0; i < adFormElements.length; i++) {
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
      for (let i = 0; i < pinsAll.length; i++) {

        pinsAll[i].addEventListener('click', function (evt) {
          var currentTarget = evt.currentTarget;
          var currentButtonCount = currentTarget.getAttribute('data-ad-count');
          var allMapCards = document.querySelectorAll('.map__card');
          var currentMapCard = document.querySelector('.map__card[data-ad-count="' + currentButtonCount + '"]');
          var newMapCardItem = createCardMap(adverts[currentButtonCount]);

          if (currentMapCard) {
            return;
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
})();
