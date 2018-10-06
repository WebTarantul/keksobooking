'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PIN_MIN_X = 80;
var PIN_MAX_X = 1100;
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


// случайное число от и до
function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// премешивание масива
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

// случайная длина масива
var getRandomLengthArray = function (array) {
  return array.slice(getRandomNumber(0, array.length));
};

// генерирует обьявления
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
      }
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

// Создание списка фотографий в объявлении
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

// Создает список преимуществ
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

// создает метки на карте
var createPin = function (arrayAdverts) {
  var elementPin = templatePin.cloneNode(true);
  var avatarPin = elementPin.querySelector('img');
  elementPin.style.top = arrayAdverts.location.y - PIN_HEIGHT + 'px';
  elementPin.style.left = arrayAdverts.location.x - (PIN_WIDTH / 2) + 'px';

  avatarPin.src = arrayAdverts.author.avatar;
  avatarPin.alt = arrayAdverts.title;

  return elementPin;
};


// создает карточку обьявления
var createCardMap = function (arrayAd) {
  var templateCard = template.content;
  var cardItem = templateCard.cloneNode(true);
  cardItem.querySelector('.popup__title').textContent = arrayAd.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = arrayAd.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = arrayAd.offer.price;
  cardItem.querySelector('.popup__type').textContent = BUILDING_TYPES[arrayAd.offer.type];
  cardItem.querySelector('.popup__text--capacity').textContent = arrayAd.offer.rooms + ' комнаты для ' + arrayAd.offer.guests + ' гостей';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayAd.offer.checkin + ', выезд до ' + arrayAd.offer.checkout;
  while (cardItem.querySelector('.popup__features').firstChild) {
    cardItem.querySelector('.popup__features').removeChild(cardItem.querySelector('.popup__features').firstChild);
  }
  cardItem.querySelector('.popup__features').appendChild(generateFeatures(arrayAd.offer.features));
  cardItem.querySelector('.popup__description').textContent = arrayAd.offer.description;
  while (cardItem.querySelector('.popup__photos').firstChild) {
    cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photos').firstChild);
  }
  cardItem.querySelector('.popup__photos').appendChild(generetePhotos(arrayAd.offer.photos));
  cardItem.querySelector('.popup__avatar').src = arrayAd.author.avatar;
  return cardItem;
};


var generatePins = function (arrayAdverts) {
  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < arrayAdverts.length; i++) {
    var element = arrayAdverts[i];
    fragmentPins.appendChild(createPin(element));
  }
  return fragmentPins;
};
// отрисовка в документе
// mapBlock.insertBefore(createCardMap(adverts[0]), document.querySelector('.map__filters-container'));
// mapBlock.querySelector('.map__pins').appendChild(generatePins(adverts));

