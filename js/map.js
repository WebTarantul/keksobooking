var TITLES = [ "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде" ];
var PIN_MIN_X = 80;
var PIN_MAX_X = 1100;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var TYPES = ['palace','flat','house','bungalo'];
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 25;
var CHECK = ['12:00', '13:00','14:00' ];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

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
test
