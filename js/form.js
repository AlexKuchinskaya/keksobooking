'use strict';
// 4.1 задание
(function () {
  const MOUSE_LEFT_BUTTON = 0;
  const KEY_ENTER = 13;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const CAPACITY_0 = 0;
  const ROOM_NUMBER_100 = 100;
  const MAX_INPUT_PRICE = 1000000;
  const pinMainActiveCoordinateX = 570 + 33;
  const pinMainActiveCoordinateY = 375 + 33;
  const pinMaininActiveCoordinateX = 570;
  const pinMaininActiveCoordinateY = 375;
  const elementsFieldset = document.querySelectorAll(`.ad-form__element`);
  const form = document.querySelector(`.ad-form`);
  const addressInput = document.querySelector(`#address`);
  const mapDialog = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const titleInput = form.querySelector(`#title`);
  const roomNumberInput = form.querySelector(`#room_number`);
  const capacityInput = form.querySelector(`#capacity`);
  const priceInput = form.querySelector(`#price`);
  const typeField = form.querySelector(`#type`);
  const timeIn = form.querySelector(`#timein`);
  const timeOut = form.querySelector(`#timeout`);
  const resetButton = document.querySelector(`.ad-form__reset`);

  const houseTypes = {
    'palace': {
      min: 10000,
      placeholder: `10000`
    },
    'flat': {
      min: 1000,
      placeholder: `1000`
    },
    'house': {
      min: 5000,
      placeholder: `5000`
    },
    'bungalow': {
      min: 0,
      placeholder: `0`
    },
  };

  const onPinMainMousedown = () => {
    for (let elementFieldset of elementsFieldset) {
      elementFieldset.disabled = false;
    }
    mapDialog.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    mapFilters.classList.remove(`map__filters--disabled`);
    addressInput.value = `${pinMainActiveCoordinateX}, ${pinMainActiveCoordinateY}`;
    window.renderPins(window.hotels);
    window.renderPopupFragment();
  };

  const onroomNumberChange = () => {
    const INVALID_CAPACITY = `Недопустимое количество комнат`;
    const VALIDATION_SUCCESS = ``;
    const capacity = parseInt(capacityInput.value, 10);
    const roomNumber = parseInt(roomNumberInput.value, 10);
    const message = roomNumber < capacity || (capacity === CAPACITY_0 && roomNumber < ROOM_NUMBER_100) ? INVALID_CAPACITY : VALIDATION_SUCCESS;
    roomNumberInput.setCustomValidity(message);
    roomNumberInput.reportValidity();
  };

  const onTypeFieldChange = () => {
    priceInput.placeholder = houseTypes[typeField.value].placeholder;
    priceInput.min = houseTypes[typeField.value].min;
    const minCost = priceInput.value.length < priceInput.min ? `Минимальная стоимость должна составлять ${priceInput.min}` : ``;
    priceInput.setCustomValidity(minCost);
    priceInput.reportValidity();
  };

  const onPriceInputChange = () => {
    const maxCost = parseInt(priceInput.value, 10) > MAX_INPUT_PRICE ? `Максимальная стоимость должна составлять ${MAX_INPUT_PRICE}` : ``;
    priceInput.setCustomValidity(maxCost);
    priceInput.reportValidity();
  };

  const onTimeInChange = () => {
    timeOut.value = timeIn.value;
  };

  const pageInactivemake = () => {
    mapDialog.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    mapFilters.classList.add(`map__filters--disabled`);
    addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;
    document.querySelector(`.pins`).remove();
    document.querySelector(`.popup`).remove();
  };

  pinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      onPinMainMousedown();
    }
  });

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      onPinMainMousedown();
    }
  });

  titleInput.addEventListener(`input`, function () {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} символов`);
      titleInput.classList.add(`wrong-input`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  });

  roomNumberInput.addEventListener(`change`, function () {
    onroomNumberChange();
  });

  capacityInput.addEventListener(`change`, function () {
    onroomNumberChange();
  });

  typeField.addEventListener(`change`, function () {
    onTypeFieldChange();
  });

  priceInput.addEventListener(`input`, function () {
    onPriceInputChange();
  });

  timeIn.addEventListener(`change`, function () {
    onTimeInChange();
  });

  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    form.reset();
    pageInactivemake();
  });

  for (let elementFieldset of elementsFieldset) {
    elementFieldset.disabled = true;
  }

  addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;
})();
