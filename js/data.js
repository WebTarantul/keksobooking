'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 25;
  var CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var adCount = 8;
  var PIN_MIN_X = 30;
  var PIN_MAX_X = 1160;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  // random number min max
  function getRandomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  // array shuffle
  function shuffle(arr) {
    // eslint-disable-next-line one-var
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
  window.dataAdverts = generateAd(adCount);
})();
