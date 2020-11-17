'use strict';
const PIN_OFFSET_Y = 35;
const PIN_OFFSET_X = 25;
const MAX_PIN_COUNT = 5;
const KEY_ENTER = 13;
const announcementPins = document.querySelector(`.map__pins`);
const advertTask = document.querySelector(`#pin`).content;
const advertTemplate = advertTask.querySelector(`.map__pin`);
const map = document.querySelector(`.map`);

const renderPin = (pin) => {
  const coordinateLeft = pin.location.x + PIN_OFFSET_X;
  const coordinateTop = pin.location.y + PIN_OFFSET_Y;
  const pinElement = advertTemplate.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);
  pinElement.id = pin.id;
  pinElement.style = `left: ${coordinateLeft}px; top: ${coordinateTop}px;`;
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  return pinElement;
};

const getPinDomIdandActive = (evt) => {
  const pinElement = evt.target.closest(`.map__pin`);
  const pinData = window.form.getPinsData().find((pin) => {
    return pin.id === pinElement.id;
  });
  const mapPinActive = document.querySelector(`.map__pin--active`);
  if (mapPinActive) {
    mapPinActive.classList.remove(`map__pin--active`);
  }
  if (!pinElement.classList.contains(`map__pin--active`)) {
    pinElement.classList.add(`map__pin--active`);
  }
  window.card.renderPopupFragment(pinData);
};

const onPinDomClickOrKeydown = (evt) => {
  window.card.closeAllPopups();
  getPinDomIdandActive(evt);
};

const renderPins = (pinsData) => {
  const fragment = document.createElement(`div`);
  fragment.classList.add(`pins`);
  const iterations = pinsData.length < MAX_PIN_COUNT ? pinsData.length : MAX_PIN_COUNT;
  for (let i = 0; i < iterations; i++) {
    let pinDom = renderPin(pinsData[i]);
    pinDom.addEventListener(`click`, (evt) => {
      onPinDomClickOrKeydown(evt);
    });
    pinDom.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === KEY_ENTER) {
        onPinDomClickOrKeydown(evt);
      }
    });
    fragment.appendChild(pinDom);
  }
  const announcementOldFragment = announcementPins.querySelector(`.pins`);
  if (announcementOldFragment) {
    announcementOldFragment.remove();
  }
  announcementPins.appendChild(fragment);
};

const errorPinHandler = (errorMessage) => {
  let errorServerMessage = document.createElement(`div`);
  errorServerMessage.classList.add(`map__error-server`);
  errorServerMessage.textContent = errorMessage;
  map.insertAdjacentElement(`afterbegin`, errorServerMessage);
};

window.pin = {renderPins, errorPinHandler};
