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
      // eslint-disable-next-line eqeqeq
      el.selected = VALID_NUMBER_OF_GUESTS[selectedNumberOfRooms][VALID_NUMBER_OF_GUESTS[selectedNumberOfRooms].length - 1] == el.value;
    });
  };
  formNumberOfRooms.addEventListener('change', onChangeNumberOfRooms);

  var dropZoneAvatar = document.querySelector('.ad-form-header__drop-zone');
  var inputAvatar = document.querySelector('#avatar');
  var dropZonePhoto = document.querySelector('.ad-form__drop-zone');
  var inputPhoto = document.querySelector('#images');
  function dragDropFileInit() {

    window.setDragDropFile(dropZoneAvatar, inputAvatar, function (files) {
      var avatarField = document.querySelector('.ad-form-header__preview');
      var img = avatarField.querySelector('img');
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.src = reader.result;
        img.removeAttribute('height');
      });
      reader.readAsDataURL(files[0]);
    });
    var countAdFormPhoto = -1;
    window.setDragDropFile(dropZonePhoto, inputPhoto, function (files) {
      var MAX_QUANTITY = 10;
      var uploadContainer = document.querySelector('.ad-form__photo-container');
      var adFormPhoto = document.querySelector('.ad-form__photo');
      if (countAdFormPhoto < 0) {
        adFormPhoto.remove();
        countAdFormPhoto++;
      }
      files.forEach(function (image) {
        if (countAdFormPhoto >= MAX_QUANTITY) {
          return;
        }
        var imgField = document.createElement('div');
        var img = new Image(70);
        imgField.classList.add('ad-form__photo');
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          img.src = reader.result;
          imgField.appendChild(img);
          uploadContainer.insertAdjacentElement('beforeend', imgField);
          countAdFormPhoto++;
        });
        files.splice();
        reader.readAsDataURL(image);
      });
    });
  }

  function adFormReset() {
    adForm.reset();
    adFormElements.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });

    window.resetDragDropFile(function () {
      var adFormAvatar = document.querySelector('.ad-form-header__preview img');
      adFormAvatar.src = 'img/muffin-grey.svg';
      adFormAvatar.setAttribute('height', '44');
    });
    window.resetDragDropFile(function () {
      var uploadContainer = document.querySelector('.ad-form__photo-container');
      var adFormPhoto = document.querySelector('.ad-form__photo');
      while (adFormPhoto) {
        adFormPhoto.remove();
        adFormPhoto = document.querySelector('.ad-form__photo');
      }
      var imgField = document.createElement('div');
      imgField.classList.add('ad-form__photo');
      uploadContainer.insertAdjacentElement('beforeend', imgField);
    });
  }

  window.form = {};
  window.form.adFormReset = adFormReset;
  window.form.dragDropFileInit = dragDropFileInit;
})();
