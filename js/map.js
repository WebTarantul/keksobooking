'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PIN_MIN_X = 30;
var PIN_MAX_X = 1160;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 25;
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BUILDING_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Дом'};
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adCount = 8;


// random number min max
function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// array shuffle
function shuffle(arr) {
  var j, temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// random array length
var getRandomLengthArray = function (array) {
  return array.slice(getRandomNumber(0, array.length));
};

// generation of advert
var generateAd = function (countAd) {
  var arrayAd = [];
  for (var i = 0; i < countAd; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': getRandomNumber(PIN_MIN_X, PIN_MAX_X) + ',' + getRandomNumber(PIN_MIN_Y, PIN_MAX_Y),
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': CHECK[getRandomNumber(0, CHECK.length - 1)],
        'checkout': CHECK[getRandomNumber(0, CHECK.length - 1)],
        'features': getRandomLengthArray(FEATURES),
        'description': '',
        'photos': shuffle(PHOTOS)
      },
      'location': {
        'x': getRandomNumber(PIN_MIN_X, PIN_MAX_X),
        'y': getRandomNumber(PIN_MIN_Y, PIN_MAX_Y)
      },
      'data_Ad_count': i
    };
    arrayAd[i] = ad;
  }
  return arrayAd;
};


var template = document.querySelector('template');
var templateAd = template.content.querySelector('.map__card');
var templatePhoto = templateAd.querySelector('.popup__photo');
var templatePin = template.content.querySelector('.map__pin');
var adverts = generateAd(adCount);

// generation of photos list at advert
var generetePhotos = function (arrayPhotos) {
  var fragmentPhotos = document.createDocumentFragment();

  for (var i = 0; i < arrayPhotos.length; i++) {
    var photoItem = arrayPhotos[i];
    var newPhoto = templatePhoto.cloneNode(true);
    newPhoto.src = photoItem;
    fragmentPhotos.appendChild(newPhoto);
  }
  return fragmentPhotos;
};

// create list of advanteges
var generateFeatures = function (arrayFeatures) {
  var fragmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + arrayFeatures[i]);
    featureElement.textContent = arrayFeatures[i];
    fragmentFeatures.appendChild(featureElement);
  }
  return fragmentFeatures;
};

// create pins on the map
var createPin = function (arrayAdverts) {
  var elementPin = templatePin.cloneNode(true);
  var avatarPin = elementPin.querySelector('img');
  elementPin.style.top = arrayAdverts.location.y - PIN_HEIGHT + 'px';
  elementPin.style.left = arrayAdverts.location.x - (PIN_WIDTH / 2) + 'px';
  elementPin.setAttribute('data-ad-count', arrayAdverts.data_Ad_count);

  avatarPin.src = arrayAdverts.author.avatar;
  avatarPin.alt = arrayAdverts.offer.title;

  return elementPin;
};


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
  cardItem.querySelector('.popup__features').appendChild(generateFeatures(arrayAdverts.offer.features));
  cardItem.querySelector('.popup__description').textContent = arrayAdverts.offer.description;
  while (cardItem.querySelector('.popup__photos').firstChild) {
    cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photos').firstChild);
  }
  cardItem.querySelector('.popup__photos').appendChild(generetePhotos(arrayAdverts.offer.photos));
  cardItem.querySelector('.popup__avatar').src = arrayAdverts.author.avatar;
  return cardItem;
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

// activision makeActivePage
var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mouseup', makeActivePage);
var pinsAdded = false;
mainPin.addEventListener('mouseup', function () {
  if (!pinsAdded) {
    mapBlock.querySelector('.map__pins').appendChild(generatePins(adverts));
    pinsAdded = true;
  }
});

// get adress from pin
var getAdress = function () {
  var x = mainPin.style.left;
  var y = mainPin.style.top;
  var resX = +(x.replace('px', '')) + (PIN_WIDTH / 2);
  var resY = +(y.replace('px', '')) + (PIN_HEIGHT);
  return resX + ', ' + resY;
};

// insert adress to input
var insertAdress = function () {
  inputAdress.value = getAdress();
};

// drag and drop functionality
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
  function onMouseUp(eUp) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', onMouseDown);


