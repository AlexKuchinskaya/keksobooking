'use strict';
(function () {
  const PIN_OFFSET_Y = 84;
  const PIN_OFFSET_X = 31;
  const MAX_PIN_COUNT = 8;
  const announcementPins = document.querySelector(`.map__pins`);
  const advertTask = document.querySelector(`#pin`).content;
  const advertTemplate = advertTask.querySelector(`.map__pin`);
  const map = document.querySelector(`.map`);
  const renderPin = (pins) => {
    const coordinateLeft = pins.location.x + PIN_OFFSET_X;
    const coordinateTop = pins.location.y + PIN_OFFSET_Y;
    let pinElement = advertTemplate.cloneNode(true);
    pinElement.style = `left: ${coordinateLeft}px; top: ${coordinateTop}px;`;
    pinElement.querySelector(`img`).src = `${pins.author.avatar}`;
    pinElement.querySelector(`img`).alt = `${pins.offer.title}`;

    return pinElement;
  };

  const renderPins = (pins) => {
    const fragment = document.createElement(`div`);
    fragment.classList.add(`pins`);
    if (pins.length < MAX_PIN_COUNT) {
      for (let i = 0; i < pins.length; i++) {
        fragment.appendChild(renderPin(pins[i]));
      }
    } else {
      for (let i = 0; i < MAX_PIN_COUNT; i++) {
        fragment.appendChild(renderPin(pins[i]));
      }
    }
    announcementPins.appendChild(fragment);
  };
  window.renderPins = renderPins;

  const errorPinHandler = function (errorMessage) {
    let errorServerMessage = document.createElement(`div`);
    errorServerMessage.classList.add(`map__error-server`);
    errorServerMessage.textContent = errorMessage;
    map.insertAdjacentElement(`afterbegin`, errorServerMessage);
  };
  window.errorPinHandler = errorPinHandler;
})();
