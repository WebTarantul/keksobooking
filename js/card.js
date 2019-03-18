'use strict';
(function () {
  var BUILDING_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Дом'
  };
  // generation of photos list at advert
  var template = document.querySelector('template');
  var templateAd = template.content.querySelector('.map__card');
  var templatePhoto = templateAd.querySelector('.popup__photo');
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
    cardItem.querySelector('.popup__features').appendChild(window.card.generateFeatures(arrayAdverts.offer.features));
    cardItem.querySelector('.popup__description').textContent = arrayAdverts.offer.description;
    while (cardItem.querySelector('.popup__photos').firstChild) {
      cardItem.querySelector('.popup__photos').removeChild(cardItem.querySelector('.popup__photos').firstChild);
    }
    cardItem.querySelector('.popup__photos').appendChild(window.card.generetePhotos(arrayAdverts.offer.photos));
    cardItem.querySelector('.popup__avatar').src = arrayAdverts.author.avatar;
    return cardItem;
  };
  window.card = {};
  window.card.generateFeatures = generateFeatures;
  window.card.generetePhotos = generetePhotos;
  window.card.createCardMap = createCardMap;
})();
