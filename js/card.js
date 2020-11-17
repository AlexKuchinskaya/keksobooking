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

const createFeatures = (element, data) => {
  const featureElements = element.querySelectorAll(`.popup__feature`);
  featureElements.forEach((featureElement) => {
    const checkFeatures = (feature) => {
      return featureElement.classList.contains(`popup__feature--${feature}`);
    };
    const featureIsIncluded = data.offer.features.some(checkFeatures);
    if (!featureIsIncluded) {
      featureElement.classList.add(`visually-hidden`);
    }
  });
};

const createPhotoPopup = (item, photoInstance) => {
  const photoElement = photoInstance.cloneNode(true);
  photoElement.src = item;
  photoElement.style.width = photoHeight;
  photoElement.style.height = photoWidth;
  photoElement.alt = `Фотография жилья`;
  return photoElement;
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

  const onKeydown = (evt) => {
    if (evt.keyCode === ESCAPE_BUTTON) {
      popupElement.remove();
      document.removeEventListener(`keydown`, onKeydown);
    }
  };

  document.addEventListener(`keydown`, onKeydown);

  createFeatures(popupElement, information);

  popupElement.querySelector(`.popup__description`).textContent = information.offer.description;
  popupElement.querySelector(`.popup__avatar`).src = information.author.avatar;

  const photoPopup = popupElement.querySelector(`.popup__photo`);
  const popupPhotoContainer = popupElement.querySelector(`.popup__photos`);

  popupPhotoContainer.innerHTML = ``;
  information.offer.photos.forEach((element) => {
    const result = createPhotoPopup(element, photoPopup);
    popupPhotoContainer.appendChild(result);
  });

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
