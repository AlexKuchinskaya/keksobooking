'use strict';
(function () {
  const PIN_OFFSET_Y = 84;
  const PIN_OFFSET_X = 31;
  const MAX_PIN_COUNT = 5;
  let pinsData = [];
  const announcementPins = document.querySelector(`.map__pins`);
  const advertTask = document.querySelector(`#pin`).content;
  const advertTemplate = advertTask.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);

  const renderPin = (pins) => {
    const coordinateLeft = pins.location.x + PIN_OFFSET_X;
    const coordinateTop = pins.location.y + PIN_OFFSET_Y;
    const pinElement = advertTemplate.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);
    pinElement.style = `left: ${coordinateLeft}px; top: ${coordinateTop}px;`;
    pinImage.src = pins.author.avatar;
    pinImage.alt = pins.offer.title;

    return pinElement;
  };

  const renderPins = (pins) => {
    pinsData = pins;
    const fragment = document.createElement(`div`);
    fragment.classList.add(`pins`);
    const iterations = pinsData.length < MAX_PIN_COUNT ? pinsData.length : MAX_PIN_COUNT;
    for (let i = 0; i < iterations; i++) {
      fragment.appendChild(renderPin(pinsData[i]));
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
