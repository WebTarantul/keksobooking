/* eslint-disable eqeqeq */
'use strict';
(function () {
  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('.map__checkbox');
  var any = 'any';
  var maxQuantity = 5;

  function getFilteredAdverts(adverts) {
    return adverts.filter(function (ad) {
      return getType(ad) && getPrice(ad) && getRooms(ad) && getGuest(ad) && getFeatures(ad);
    }).slice(0, maxQuantity);
  }


  function getType(advert) {
    return type.value === any || type.value === advert.offer.type;
  }

  function getPrice(advert) {
    switch (price.value) {
      case 'low':
        return advert.offer.price < 10000;
        // eslint-disable-next-line no-unreachable
        break;
      case 'middle':
        return advert.offer.price >= 10000 && advert.offer.price <= 50000;
        // eslint-disable-next-line no-unreachable
        break;
      case 'high':
        return advert.offer.price > 50000;
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return true;
        // eslint-disable-next-line no-unreachable
        break;
    }
  }
  function getRooms(advert) {
    return rooms.value == any || rooms.value == advert.offer.rooms;
  }

  function getGuest(advert) {
    return guests.value == any || guests.value == advert.offer.rooms;
  }

  function getFeatures(advert) {
    var checkedFeatures = [].filter.call(features, function (feature) {
      return feature.checked;
    });
    return checkedFeatures.every(function (feature) {
      return advert.offer.features.indexOf(feature.value) !== -1;
    });
  }

  window.filter = {};
  window.filter.getFilteredAdverts = getFilteredAdverts;
})();
