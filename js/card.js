"use strict";
(function () {
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
  window.generateFeatures = generateFeatures;
  window.generetePhotos = generetePhotos;
})();
