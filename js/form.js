'use strict';
(function adFormInit() {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');
  var formAdress = document.querySelector('#address');
  var formCheckIn = document.querySelector('#timein');
  var formCheckOut = document.querySelector('#timeout');
  var formNumberOfRooms = document.querySelector('#room_number');
  var formNumberOfGuests = document.querySelector('#capacity');
  var priceOfHouse = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var VALID_NUMBER_OF_GUESTS = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  // type of house and price
  var onChangeTypeField = function () {
    var typeFieldSelected = formType.value;
    formPrice.placeholder = priceOfHouse[typeFieldSelected];
    formPrice.min = priceOfHouse[typeFieldSelected];
  };

  formType.addEventListener('change', onChangeTypeField);

  // advert adress
  formAdress.readOnly = 'readonly';

  // time of checkin and checkout
  var onChangeCheckIn = function () {
    formCheckOut.value = formCheckIn.value;
  };
  formCheckIn.addEventListener('change', onChangeCheckIn);
  var onChangeCheckOut = function () {
    formCheckIn.value = formCheckOut.value;
  };
  formCheckOut.addEventListener('change', onChangeCheckOut);

  // number of rooms and guests
  var onChangeNumberOfRooms = function () {

    HTMLCollection.prototype.forEach = Array.prototype.forEach;
    formNumberOfGuests.options.forEach(function (el) {
      var selectedNumberOfRooms = formNumberOfRooms.value;
      el.disabled = VALID_NUMBER_OF_GUESTS[selectedNumberOfRooms].indexOf(el.value) === -1;
      el.selected = VALID_NUMBER_OF_GUESTS[selectedNumberOfRooms][VALID_NUMBER_OF_GUESTS[selectedNumberOfRooms].length - 1] == el.value;
    });
  };
  formNumberOfRooms.addEventListener('change', onChangeNumberOfRooms);
  window.form = {};
  window.form.adFormReset = function () {
    adForm.reset();
    adFormElements.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  };
})();
