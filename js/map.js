'use strict';
(function () {
  var PIN_MIN_X = 30;
  var PIN_MAX_X = 1160;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var mapFiltersWrapper = document.querySelector('.map__filters');
  var adverts;

  window.backend.load(function (data) {
    adverts = data;
    addDataCountOfArray(adverts);
  }, function (message) {
    window.errors.show(message);
  });

  function addDataCountOfArray(array) {
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      // eslint-disable-next-line camelcase
      el.data_Ad_count = i.toString();
    }
  }

  // insert adress to input
  var insertAdress = function () {
    inputAdress.value = window.pins.getAdress();
  };

  // drag and drop functionality
  var activePage;
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


    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // activision makeActivePage
      if (!activePage) {

        var generetedPins = window.pins.generatePins(window.filter.getFilteredAdverts(adverts));
        mapBlock.querySelector('.map__pins').appendChild(generetedPins);
        activePage = true;
        makeActivePage();
      }

    }

  };

  mainPin.addEventListener('mousedown', onMouseDown);

  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adForm = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var inputAdress = document.querySelector('#address');

  adFormElements.forEach(function (adFormElement) {
    adFormElement.setAttribute('disabled', 'disabled');
  });

  var makeActivePage = function () {
    var resetButton = document.querySelector('.ad-form__reset');
    for (var i = 0; i < adFormElements.length; i++) {
      var adFormElement = adFormElements[i];
      adFormElement.removeAttribute('disabled');
    }
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    insertAdress();
    setTimeout(function () {
      // отрисовка карточек в документе
      var pinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinsAll.forEach(function (pinItem) {
        pinItem.addEventListener('click', onClickPin);
      });
    }, 0);
    window.form.dragDropFileInit();
    resetButton.addEventListener('click', function () {
      window.pageReset();
    });
  };

  function onClickPin(evt) {
    var currentTarget = evt.currentTarget;
    var currentButtonCount = currentTarget.getAttribute('data-ad-count');
    var allMapCards = document.querySelectorAll('.map__card');
    var currentMapCard = document.querySelector('.map__card[data-ad-count="' + currentButtonCount + '"]');
    var newMapCardItem = window.card.createCardMap(adverts[currentButtonCount]);

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
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var adFormData = new FormData(adForm);
    window.adFormData = adFormData;
    window.backend.upload(adFormData, onSuccess, onError);

    // successful send
    function onSuccess() {
      var successMessageBlock = document.querySelector('.success');
      successMessageBlock.classList.remove('hidden');
      setTimeout(function () {
        successMessageBlock.classList.add('hidden');
        window.pageReset();
      }, 3000);


    }
    // error send
    function onError(message) {
      window.errors.show(message);
    }
  });

  function pageReset() {
    activePage = false;
    adForm.classList.add('ad-form--disabled');
    mapBlock.classList.add('map--faded');
    window.form.adFormReset();
    window.pins.removePins();
    window.pins.resetMainPinPosition();
    scrollTo(0, 0);
  }
  mapFiltersWrapper.addEventListener('change', onChangeMapFilters);
  function onChangeMapFilters() {
    window.pins.removePins();
    var filteredAdverts = window.filter.getFilteredAdverts(adverts);
    mapBlock.querySelector('.map__pins').appendChild(window.pins.generatePins(filteredAdverts));
    var pinsAll = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsAll.forEach(function (pinItem) {
      pinItem.addEventListener('click', onClickPin);
    });
  }

  window.pageReset = pageReset;
})();
