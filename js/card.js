'use strict';
// 3.2 Личный проект: больше деталей (часть 2)
(function () {
  const cardTask = document.querySelector(`#card`).content;
  const cardTemplate = cardTask.querySelector(`.popup`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const appartmentTypeTranslation = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };
  const renderPopup = function (information) {
    const popupElement = cardTemplate.cloneNode(true);
    popupElement.querySelector(`.popup__title`).textContent = information.title;
    popupElement.querySelector(`.popup__text--address`).textContent = information.address;
    popupElement.querySelector(`.popup__text--price`).textContent = `${information.price} ₽/ночь`;
    popupElement.querySelector(`.popup__type`).textContent = appartmentTypeTranslation[information.type];
    popupElement.querySelector(`.popup__text--capacity`).textContent = `${information.rooms} комнаты для ${information.guests} гостей`;
    popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${information.checkin}, выезд до ${information.checkout}`;

    const featureElements = popupElement.querySelectorAll(`.popup__feature`);
    for (let i = 0; i < featureElements.length; i++) {
      const featureElement = featureElements[i];
      const checkFeatures = (feature) => {
        return featureElement.classList.contains(`popup__feature--${feature}`);
      };
      const featureIsIncluded = information.features.some(checkFeatures);
      if (!featureIsIncluded) {
        featureElement.classList.add(`visually-hidden`);
      }
    }

    popupElement.querySelector(`.popup__description`).textContent = information.description;
    popupElement.querySelector(`.popup__avatar`).src = information.avatar;

    const popupPhotoContainer = popupElement.querySelector(`.popup__photos`);
    const photoPopup = popupElement.querySelector(`.popup__photo`);
    const fragmentPhoto = document.createDocumentFragment();

    information.photos.forEach((element) => {
      const photoElement = photoPopup.cloneNode(true);
      photoElement.src = element;
      photoElement.style.width = `45`;
      photoElement.style.height = `40`;
      photoElement.alt = `Фотография жилья`;
      fragmentPhoto.appendChild(photoElement);
    });

    popupPhotoContainer.innerHTML = ``;
    popupPhotoContainer.appendChild(fragmentPhoto);

    return popupElement;
  };

  const renderPopupFragment = () => {
    mapFiltersContainer.before(renderPopup(window.hotels[0]));
  };
  window.renderPopupFragment = renderPopupFragment;
})();
