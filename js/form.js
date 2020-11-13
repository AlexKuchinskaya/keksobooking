'use strict';
(function () {
  const MOUSE_LEFT_BUTTON = 0;
  const KEY_ENTER = 13;
  const ESCAPE_BUTTON = 27;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const CAPACITY_0 = 0;
  const ROOM_NUMBER_100 = 100;
  const MAX_INPUT_PRICE = 1000000;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X_RIGHT = 38;
  const MAX_X_LEFT = -28;
  const pinMaininActiveCoordinateX = 570;
  const pinMaininActiveCoordinateY = 375;
  const pinActiveHeight = 84;
  const pinActiveWidth = 33;
  const INVALID_CAPACITY = `Недопустимое количество комнат`;
  const VALIDATION_SUCCESS = ``;
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
  const pinMainParent = document.querySelector(`.map__overlay`);
  const successTask = document.querySelector(`#success`).content;
  const successTemplate = successTask.querySelector(`.success`);
  const errorTask = document.querySelector(`#error`).content;
  const errorTemplate = errorTask.querySelector(`.error`);
  const mainBlock = document.querySelector(`main`);
  const fieldsetsForm = form.querySelectorAll(`fieldset`);

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

  const activateFieldsets = () => {
    for (let elementFieldsetsForm of fieldsetsForm) {
      elementFieldsetsForm.disabled = false;
    }
  };

  const disableFieldSets = () => {
    for (let elementFieldsetsForm of fieldsetsForm) {
      elementFieldsetsForm.disabled = true;
    }
  };
  let pinsData = [];
  const getServerAnswer = (response) => {
    pinsData = response;
    pinsData = response.map((pin, index) => {
      pin.id = `${index}`;
      return pin;
    });
    window.pin.renderPins(pinsData);
    mapFilters.classList.remove(`map__filters--disabled`);
  };

  const getPinsData = () => {
    return pinsData;
  };

  const onPinMainMousedown = () => {
    activateFieldsets();
    mapDialog.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    window.server.load(getServerAnswer, window.pin.errorPinHandler);
  };

  const onRoomNumberChange = () => {
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

  const onTimeOutChange = () => {
    timeIn.value = timeOut.value;
  };

  const desactivate = () => {
    mapDialog.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    mapFilters.classList.add(`map__filters--disabled`);
    addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;
    document.querySelector(`.pins`).remove();
    document.querySelector(`.popup`).remove();
  };

  const renderSuccessPost = () => {
    const fragmentSuccess = document.createElement(`div`);
    const succesElement = successTemplate.cloneNode(true);
    fragmentSuccess.appendChild(succesElement);
    fragmentSuccess.classList.add(`succeded-form`);
    mainBlock.insertAdjacentElement(`afterbegin`, fragmentSuccess);
  };

  const onSubmitSuccessClick = () => {
    document.querySelector(`.succeded-form`).remove();
    document.removeEventListener(`click`, onSubmitSuccessClick);
  };

  const onSubmitSuccessKeydown = () => {
    document.querySelector(`.succeded-form`).remove();
    document.removeEventListener(`keydown`, onSubmitSuccessKeydown);
  };

  const onSuccessSubmit = () => {
    renderSuccessPost();
    document.addEventListener(`click`, onSubmitSuccessClick);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESCAPE_BUTTON) {
        onSubmitSuccessKeydown();
      }
    });
    form.reset();
    desactivate();
    disableFieldSets();
  };

  const renderErrorPost = () => {
    const fragmentError = document.createElement(`div`);
    const errorElement = errorTemplate.cloneNode(true);
    fragmentError.appendChild(errorElement);
    fragmentError.classList.add(`error-form`);
    mainBlock.insertAdjacentElement(`afterbegin`, fragmentError);
  };

  const onSubmitErrorClick = () => {
    document.querySelector(`.error-form`).remove();
    document.removeEventListener(`click`, onSubmitErrorClick);
  };

  const onSubmitErrorKeydown = () => {
    document.querySelector(`.error-form`).remove();
    document.removeEventListener(`keydown`, onSubmitErrorKeydown);
  };

  const onErrorSubmit = () => {
    renderErrorPost();
    document.addEventListener(`click`, onSubmitErrorClick);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESCAPE_BUTTON) {
        onSubmitErrorKeydown();
      }
    });
    const errorButtonMessage = document.querySelector(`.error__button`);
    errorButtonMessage.addEventListener(`click`, onSubmitErrorClick);
  };

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.button === MOUSE_LEFT_BUTTON) {
      if (pinsData.length === 0) {
        onPinMainMousedown();
      }

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const limitY = (topPosition) => {
          if (topPosition < MIN_Y) {
            return MIN_Y;
          }
          if (topPosition > MAX_Y) {
            return MAX_Y;
          }
          return topPosition;
        };

        const limitX = (leftPosition, parentElement) => {
          if (leftPosition > (parentElement.offsetWidth - MAX_X_RIGHT)) {
            return (parentElement.offsetWidth - MAX_X_RIGHT);
          }
          if (leftPosition < MIN_X) {
            return MAX_X_LEFT;
          }
          return leftPosition;
        };
        const top = limitY(pinMain.offsetTop - shift.y);
        const left = limitX((pinMain.offsetLeft - shift.x), pinMainParent);
        pinMain.style.top = `${top}px`;
        pinMain.style.left = `${left}px`;
        addressInput.value = `${top + pinActiveWidth}, ${left + pinActiveHeight}`;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        onMouseMove(upEvt);
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KEY_ENTER) {
      onPinMainMousedown();
    }
  });

  titleInput.addEventListener(`input`, () => {
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

  roomNumberInput.addEventListener(`change`, () => {
    onRoomNumberChange();
  });

  capacityInput.addEventListener(`change`, () => {
    onRoomNumberChange();
  });

  typeField.addEventListener(`change`, () => {
    onTypeFieldChange();
  });

  priceInput.addEventListener(`input`, () => {
    onPriceInputChange();
  });

  timeIn.addEventListener(`change`, () => {
    onTimeInChange();
  });

  timeOut.addEventListener(`change`, () => {
    onTimeOutChange();
  });

  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    form.reset();
    desactivate();
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    onRoomNumberChange();
    if (form.checkValidity()) {
      window.server.upload(
          new FormData(form),
          onSuccessSubmit,
          onErrorSubmit
      );
    }
  });

  disableFieldSets();

  addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;

  window.form = {
    getPinsData
  };
})();
