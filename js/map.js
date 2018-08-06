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




function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
var u = randomInteger(3,12);

console.log(u);
