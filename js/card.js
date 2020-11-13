'use strict';
const ESCAPE_BUTTON = 27;
const photoHeight = `45`;
const photoWidth = `40`;
const cardTask = document.querySelector(`#card`).content;
const cardTemplate = cardTask.querySelector(`.popup`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const appartmentTypeTranslation = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const renderPopup = (information) => {
  const popupElement = cardTemplate.cloneNode(true);
  popupElement.querySelector(`.popup__title`).textContent = information.offer.title;
  popupElement.querySelector(`.popup__text--address`).textContent = information.offer.address;
  popupElement.querySelector(`.popup__text--price`).textContent = `${information.offer.price} ₽/ночь`;
  popupElement.querySelector(`.popup__type`).textContent = appartmentTypeTranslation[information.offer.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = `${information.offer.rooms} комнаты для ${information.offer.guests} гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${information.offer.checkin}, выезд до ${information.offer.checkout}`;

  popupElement.querySelector(`.popup__close`).addEventListener(`click`, () => {
    popupElement.remove();
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === ESCAPE_BUTTON) {
      popupElement.remove();
    }
  });

  const featureElements = popupElement.querySelectorAll(`.popup__feature`);
  for (let i = 0; i < featureElements.length; i++) {
    const featureElement = featureElements[i];
    const checkFeatures = (feature) => {
      return featureElement.classList.contains(`popup__feature--${feature}`);
    };
    const featureIsIncluded = information.offer.features.some(checkFeatures);
    if (!featureIsIncluded) {
      featureElement.classList.add(`visually-hidden`);
    }
  }

  popupElement.querySelector(`.popup__description`).textContent = information.offer.description;
  popupElement.querySelector(`.popup__avatar`).src = information.author.avatar;

  const popupPhotoContainer = popupElement.querySelector(`.popup__photos`);
  const photoPopup = popupElement.querySelector(`.popup__photo`);
  const fragmentPhoto = document.createDocumentFragment();

  information.offer.photos.forEach((element) => {
    const photoElement = photoPopup.cloneNode(true);
    photoElement.src = element;
    photoElement.style.width = photoHeight;
    photoElement.style.height = photoWidth;
    photoElement.alt = `Фотография жилья`;
    fragmentPhoto.appendChild(photoElement);
  });

  popupPhotoContainer.innerHTML = ``;
  popupPhotoContainer.appendChild(fragmentPhoto);

  return popupElement;
};

const renderPopupFragment = (card) => {
  mapFiltersContainer.before(renderPopup(card));
};

const closeAllPopups = () => {
  document.querySelectorAll(`.popup`).forEach((popupElement) => {
    popupElement.remove();
  });
};
window.card = {renderPopupFragment, closeAllPopups};
