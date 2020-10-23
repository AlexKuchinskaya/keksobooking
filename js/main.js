'use strict';

const MIN_X = 0;
const MAX_X = 704;
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 15;
const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

const ADVERT_TITLE = [
  `hotel Hilton`,
  `appartment FriendlyRental 2`,
  `hotel Paradise`,
  `hotel RIU`,
  `hotel IBIS`,
  `bungalow VILLA `,
  `palace DREAM`,
  `appartment SOL`,
];

const ADVERT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const ADVERT_DESCRIPTION = [
  `Этот дизайнерский апарт-отель расположен у подножья горы Монжуик, в 10 минутах ходьбы от станции метро Plaza Espanya и остановки автобуса, следующего до аэропорта.`,
  `Эти новые апартаменты расположены в фешенебельном районе Эшампле в центре Барселоны, в окружении магазинов, ресторанов и баров.`,
  `Этот отель с удобствами для прибывающих на мотоцикле гостей расположен в 3 остановках метро от площади Каталонии и в 15 минутах ходьбы от пляжей Барселоны.`,
  `К услугам гостей отеля бесплатный тренажерный зал и терраса на крыше с сезонным открытым бассейном и панорамным видом на Барселону.`,
  `Комплекс апартаментов расположен в 150 метрах от Храма Святого Семейства, построенного по проекту архитектора Антонио Гауди.`,
  `Этот 5-звездочный дизайн-отель с видом на порт Барселоны расположен в здании Международного торгово-выставочного центра, в 5 минутах ходьбы от бульвара Рамбла.`
];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const PIN_OFFSET_Y = 84;
const PIN_OFFSET_X = 31;
const MOUSE_LEFT_BUTTON = 0;
const KEY_ENTER = 13;

const mapDialog = document.querySelector(`.map`);

const announcementPins = document.querySelector(`.map__pins`);
const advertTask = document.querySelector(`#pin`).content;
const advertTemplate = advertTask.querySelector(`.map__pin`);

const cardTask = document.querySelector(`#card`).content;
const cardTemplate = cardTask.querySelector(`.popup`);
const appartmentTypeTranslation = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const mapFiltersContainer = document.querySelector(`.map__filters-container`);

const elementsFieldset = document.querySelectorAll(`.ad-form__element`);
const form = document.querySelector(`.ad-form`);
const titleInput = form.querySelector(`#title`);
const mapFilters = document.querySelector(`.map__filters`);
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const pinMain = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

const priceInput = form.querySelector(`#price`);
const typeField = form.querySelector(`#type`);
const MAX_INPUT_PRICE = 1000000;

let houseTypes = {
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

const pinMainActiveCoordinateX = 570 + 33;
const pinMainActiveCoordinateY = 375 + 33;
const pinMaininActiveCoordinateX = 570;
const pinMaininActiveCoordinateY = 375;

const roomNumberInput = form.querySelector(`#room_number`);
const capacityInput = form.querySelector(`#capacity`);
const CAPACITY_0 = 0;
const ROOM_NUMBER_100 = 100;

const timeIn = form.querySelector(`#timein`);
const timeOut = form.querySelector(`#timeout`);

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getAvatar = function () {
  let avatarArr = [];
  for (let i = 1; i <= 8; i++) {
    avatarArr.push(`img/avatars/user0${i}.png`);
  }
  return avatarArr;
};
const avatarArray = getAvatar();

let getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

const getRandomParameter = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

const getObjectArray = function (arr) {
  let someArray = [];
  for (let i = 0; i < getRandomNumber(arr.length); i++) {
    someArray.push(getRandomParameter(arr));
  }
  return someArray;
};

let getArray = function () {
  const announcementArray = [];
  for (let i = 0; i < 8; i++) {

    announcementArray.push({
      avatar: getRandomParameter(avatarArray),
      title: getRandomParameter(ADVERT_TITLE),
      address: `${getRandomIntInclusive(MIN_X, MAX_X)}, ${getRandomIntInclusive(MIN_Y, MAX_Y)}`,
      price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
      type: getRandomParameter(ADVERT_TYPE.length),
      rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomParameter(CHECKIN),
      checkout: getRandomParameter(CHECKOUT),
      features: getObjectArray(FEATURES),
      description: getRandomParameter(ADVERT_DESCRIPTION),
      photos: getObjectArray(PHOTOS),
      location: {
        y: getRandomIntInclusive(MIN_Y, MAX_Y),
        x: getRandomIntInclusive(MIN_X, MAX_X),
      }
    });
  }
  return announcementArray;
};

let announcementArray = getArray();

let renderPin = function (pins) {
  const coordinateLeft = pins.location.x + PIN_OFFSET_X;
  const coordinateTop = pins.location.y + PIN_OFFSET_Y;
  let pinElement = advertTemplate.cloneNode(true);
  pinElement.style = `left: ${coordinateLeft}px; top: ${coordinateTop}px;`;
  pinElement.querySelector(`img`).src = pins.avatar;
  pinElement.querySelector(`img`).alt = pins.title;

  return pinElement;
};

const renderFragment = function () {
  const fragment = document.createElement(`div`);
  fragment.classList.add(`pins`);
  for (let i = 0; i < announcementArray.length; i++) {
    fragment.appendChild(renderPin(announcementArray[i]));
  }
  announcementPins.appendChild(fragment);
};

// 3.2 Личный проект: больше деталей (часть 2)
let renderPopup = function (information) {
  let popupElement = cardTemplate.cloneNode(true);
  popupElement.querySelector(`.popup__title`).textContent = information.title;
  popupElement.querySelector(`.popup__text--address`).textContent = information.address;
  popupElement.querySelector(`.popup__text--price`).textContent = `${information.price} ₽/ночь`;
  popupElement.querySelector(`.popup__type`).textContent = appartmentTypeTranslation[information.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = `${information.rooms} комнаты для ${information.guests} гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${information.checkin}, выезд до ${information.checkout}`;

  const featureElements = popupElement.querySelectorAll(`.popup__feature`);
  for (let i = 0; i < featureElements.length; i++) {
    const featureElement = featureElements[i];
    const checkFeatures = function (feature) {
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
    let photoElement = photoPopup.cloneNode(true);
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

const renderPopupFragment = function () {
  mapFiltersContainer.before(renderPopup(announcementArray[0]));
};

// 4.1 задание
for (let elementFieldset of elementsFieldset) {
  elementFieldset.disabled = true;
}

addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;

let onPinMainMousedown = function () {
  for (let elementFieldset of elementsFieldset) {
    elementFieldset.disabled = false;
  }
  mapDialog.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`map__filters--disabled`);
  addressInput.value = `${pinMainActiveCoordinateX}, ${pinMainActiveCoordinateY}`;
  renderFragment();
  renderPopupFragment();
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

const onroomNumberChange = function () {
  const INVALID_CAPACITY = `Недопустимое количество комнат`;
  const VALIDATION_SUCCESS = ``;
  const capacity = parseInt(capacityInput.value, 10);
  const roomNumber = parseInt(roomNumberInput.value, 10);
  const message = roomNumber < capacity || (capacity === CAPACITY_0 && roomNumber < ROOM_NUMBER_100) ? INVALID_CAPACITY : VALIDATION_SUCCESS;
  roomNumberInput.setCustomValidity(message);
  roomNumberInput.reportValidity();
};

roomNumberInput.addEventListener(`change`, function () {
  onroomNumberChange();
});

capacityInput.addEventListener(`change`, function () {
  onroomNumberChange();
});

let onTypeFieldChange = function () {
  priceInput.placeholder = houseTypes[typeField.value].placeholder;
  priceInput.min = houseTypes[typeField.value].min;
  const minCost = priceInput.value.length < priceInput.min ? `Минимальная стоимость должна составлять ${priceInput.min}` : ``;
  priceInput.setCustomValidity(minCost);
  priceInput.reportValidity();
};

typeField.addEventListener(`change`, function () {
  onTypeFieldChange();
});

let onPriceInputChange = function () {
  const maxCost = parseInt(priceInput.value, 10) > MAX_INPUT_PRICE ? `Максимальная стоимость должна составлять ${MAX_INPUT_PRICE}` : ``;
  priceInput.setCustomValidity(maxCost);
  priceInput.reportValidity();
};

priceInput.addEventListener(`input`, function () {
  onPriceInputChange();
});

let onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener(`change`, function () {
  onTimeInChange();
});

let pageInactivemake = function () {
  mapDialog.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  mapFilters.classList.add(`map__filters--disabled`);
  addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;
  document.querySelector(`.pins`).remove();
  document.querySelector(`.popup`).remove();
};
const resetButton = document.querySelector(`.ad-form__reset`);

resetButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  form.reset();
  pageInactivemake();
});
