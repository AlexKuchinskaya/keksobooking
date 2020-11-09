'use strict';
(function () {
  const PIN_OFFSET_Y = 84;
  const PIN_OFFSET_X = 31;
  const MAX_PIN_COUNT = 5;
  const ESCAPE_BUTTON = 27;
  const KEY_ENTER = 13;
  let pinsData = [];
  const announcementPins = document.querySelector(`.map__pins`);
  const advertTask = document.querySelector(`#pin`).content;
  const advertTemplate = advertTask.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const mapPinActive = document.querySelector(`.map__pin--active`);

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

  const renderPins = (pins) => {
    pinsData = pins;
    const fragment = document.createElement(`div`);
    fragment.classList.add(`pins`);
    const iterations = pinsData.length < MAX_PIN_COUNT ? pinsData.length : MAX_PIN_COUNT;
    for (let i = 0; i < iterations; i++) {
      let pinDom = renderPin(pinsData[i]);
      pinDom.addEventListener(`click`, (evt) => {
        const pinElement = evt.target.closest(`.map__pin`);
        const pinData = window.form.getPinsData().find((pin) => {
          return pin.id === pinElement.id;
        });
        if (mapPinActive) {
          mapPinActive.classList.remove(`map__pin--active`);
        }
        if (!pinElement.classList.contains(`map__pin--active`)) {
          pinElement.classList.add(`map__pin--active`);
        }
        window.card.renderPopupFragment(pinData);
        const popupClose = document.querySelector(`.popup__close`);
        popupClose.addEventListener(`click`, () => {
          window.card.closePopup();
        });
        document.addEventListener(`keydown`, (evt) => {
          if (evt.keyCode === ESCAPE_BUTTON) {
            window.card.closePopup();
          }
        });
      });
      pinDom.addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === KEY_ENTER) {
          const pinElement = evt.target.closest(`.map__pin`);
          const pinData = window.form.getPinsData().find((pin) => {
            return pin.id === pinElement.id;
          });
          if (mapPinActive) {
            mapPinActive.classList.remove(`map__pin--active`);
          }
          if (!pinElement.classList.contains(`map__pin--active`)) {
            pinElement.classList.add(`map__pin--active`);
          }
          window.card.renderPopupFragment(pinData);
          const popupClose = document.querySelector(`.popup__close`);
          popupClose.addEventListener(`click`, () => {
            window.card.closePopup();
          });
          document.addEventListener(`keydown`, (evt) => {
            if (evt.keyCode === ESCAPE_BUTTON) {
              window.card.closePopup();
            }
          });
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
})();
