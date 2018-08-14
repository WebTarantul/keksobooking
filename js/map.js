var TITLES = [ "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде" ];
var PIN_MIN_X = 80;
var PIN_MAX_X = 1100;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo']

var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 25;
var CHECK = ['12:00', '13:00','14:00' ];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var BUILDING_TYPES = {  palace: 'Дворец',
                        flat: 'Квартира',
                        house: 'Дом',
                        bungalo: 'Дом'};
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var adCount = 8;


var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// случайное число от и до
function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// премешивание масива
function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// случайная длина масива
var getRandomLengthArray = function(array){
  return array.slice(getRandomNumber(0,array.length));
}

// генерирует обьявления
var generateAd = function(countAd){
  arrayAd = [];
  for(i = 0; i < countAd; i++){
    var ad = {
      'author': {
        'avatar': 'img/avatars/user'+ i +'.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': getRandomNumber(PIN_MIN_X,PIN_MAX_X)+ ',' + getRandomNumber(PIN_MIN_Y,PIN_MAX_Y),
        'price': getRandomNumber(PRICE_MIN,PRICE_MAX),
        'type': TYPES[getRandomNumber(0, TYPES.length-1)],
        'rooms': getRandomNumber(ROOMS_MIN,ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN,GUESTS_MAX),
        'checkin': CHECK[getRandomNumber(0,CHECK.length-1)],
        'checkout': CHECK[getRandomNumber(0,CHECK.length-1)],
        'features': getRandomLengthArray(FEATURES),
        'description': '',
        'photos': shuffle(PHOTOS)
      },
      'location': {
        'x': getRandomNumber(PIN_MIN_X,PIN_MAX_X),
        'y': getRandomNumber(PIN_MIN_Y,PIN_MAX_Y)
      }
    };
    arrayAd[i]=ad;
  }
return arrayAd;
};


var template =  document.querySelector('template');
var templateAd = document.querySelector('template').cloneNode(true);
var templatePhoto = templateAd.querySelector('.popup__photo');
var templatePin = templateAd.querySelector('.map__pin');
var adverts = generateAd(adCount);

// Создание списка фотографий в объявлении
var generetePhotos = function (arrayPhotos) {
  var fragmentPhotos = document.createDocumentFragment();

  for (var i = 0; i < arrayPhotos.length; i++) {
    var photoItem = arrayPhotos[i];
    var newPhoto = templatePhoto.cloneNode(true);
    newPhoto.src=photoItem;
    fragmentPhotos.appendChild(newPhoto);
  }
  return fragmentPhotos;
}

// Создает список преимуществ
var generateFeatures= function(arrayFeatures){
  var fragmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--'+arrayFeatures[i]);
      featureElement.textContent=arrayFeatures[i];
      fragmentFeatures.appendChild(featureElement);
  }
  return fragmentFeatures;
};

// создает метки на карте
var generatePins = function(arrayAdverts){
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < arrayAdverts.length; i++) {
    var elementPin = templatePin.cloneNode(true);
    var avatarPin = elementPin.querySelector('img');
    elementPin.style.top = (arrayAdverts.location.y - PIN_HEIGHT)+'px;';
    elementPin.style.left = (arrayAdverts.location.y) - (PIN_WIDTH/2) + 'px;';
    avatarPin.src = arrayAdverts.author.avatar;
    fragmentPin.appendChild(elementPin);
  }
  return fragmentPin;
}

// создает карточку обьявления
var createCardMap = function(arrayAd){
  var templateCard = template
}


var generateAdElements = function(array){
  var pinButton = templateAd.content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    pinButton.style.left(array.location.x);
    pinButton.style.right(array.location.y);
  }
}

