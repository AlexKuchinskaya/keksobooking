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

const mapDialog = document.querySelector(`.map`);

const announcementPins = document.querySelector(`.map__pins`);
const advertTask = document.querySelector(`#pin`).content;
const advertTemplate = advertTask.querySelector(`.map__pin`);

const fragment = document.createDocumentFragment();

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
const VALUE_0 = `0`;
const VALUE_1 = `1`;
const VALUE_2 = `2`;
const VALUE_3 = `3`;
const VALUE_100 = `100`;

const timeIn = form.querySelector(`#timein`);
const timeOut = form.querySelector(`#timeout`);

function getRandomIntInclusive(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

let getAvatar = function () {
  let avatarArr = [];
  for (let i = 1; i <= 8; i++) {
    avatarArr.push(`img/avatars/user0${i}.png`);
  }
  return avatarArr;
};
const avatarArray = getAvatar();

let getRandomLength = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

const getRandomParameter = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getObjectArray = function (arr) {
  let someArray = [];
  for (let i = 0; i < getRandomLength(arr); i++) {
    someArray.push(getRandomParameter(arr));
  }
  return someArray;
};
// let getRandomLength = function (max) {
  // return Math.floor(Math.random() * max);
// };

// const getRandomParameter = function (max) {
//  return [Math.floor(Math.random() * max)];
// };

// const getObjectArray = function (max) {
//  let someArray = [];
//  for (let i = 0; i < getRandomLength(max); i++) {
//  someArray.push(getRandomParameter(max));
//  }
//  return someArray;
// };
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
    // announcementArray.push({
    //  avatar: getRandomParameter(avatarArray.length),
    //  title: getRandomParameter(ADVERT_TITLE.length),
    //  address: `${getRandomIntInclusive(MIN_X, MAX_X)}, ${getRandomIntInclusive(MIN_Y, MAX_Y)}`,
    //  price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
    //  type: getRandomParameter(ADVERT_TYPE.length),
    //  rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
    //  guests: getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS),
    //  checkin: getRandomParameter(CHECKIN.length),
    //  checkout: getRandomParameter(CHECKOUT.length),
    //  features: getObjectArray(FEATURES),
    //  description: getRandomParameter(ADVERT_DESCRIPTION.length),
    //  photos: getObjectArray(PHOTOS),
    //  location: {
    //    y: getRandomIntInclusive(MIN_Y, MAX_Y),
    //    x: getRandomIntInclusive(MIN_X, MAX_X),
    //  }
    // });

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

  if (information.title === undefined) {
    popupElement.querySelector(`.popup__title`).classList.add(`visually-hidden`);
  }
  if (information.address === undefined) {
    popupElement.querySelector(`.popup__text--address`).classList.add(`visually-hidden`);
  }
  if (information.price === undefined) {
    popupElement.querySelector(`.popup__text--price`).classList.add(`visually-hidden`);
  }
  if (information.type === undefined) {
    popupElement.querySelector(`.popup__type`).classList.add(`visually-hidden`);
  }
  if (information.rooms === undefined || information.guests === undefined) {
    popupElement.querySelector(`.popup__text--capacity`).classList.add(`visually-hidden`);
  }
  if (information.checkin === undefined || information.checkout === undefined) {
    popupElement.querySelector(`.popup__text--capacity`).classList.add(`visually-hidden`);
  }
  if (information.description === undefined) {
    popupElement.querySelector(`.popup__description`).classList.add(`visually-hidden`);
  }
  if (information.avatar === undefined) {
    popupElement.querySelector(`.popup__avatar`).classList.add(`visually-hidden`);
  }
  if (information.photos.length === undefined) {
    popupPhotoContainer.classList.add(`visually-hidden`);
  }
  return popupElement;
};

const renderPopupFragment = function () {
  for (let i = 0; i < announcementArray.length; i++) {
    fragment.appendChild(renderPopup(announcementArray[i]));
  }
  mapFiltersContainer.before(fragment);
};

// 4.1 задание
for (let elementFieldset of elementsFieldset) {
  elementFieldset.setAttribute(`disabled`, `true`);
}

addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;

let onPinMainMousedown = function () {
  for (let elementFieldset of elementsFieldset) {
    elementFieldset.removeAttribute(`disabled`);
  }
  mapDialog.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  mapFilters.classList.remove(`map__filters--disabled`);
  addressInput.value = `${pinMainActiveCoordinateX}, ${pinMainActiveCoordinateY}`;
  renderFragment();
  renderPopupFragment();
};

pinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    onPinMainMousedown();
  }
});

pinMain.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === 13) {
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
  if (capacityInput.value === VALUE_1 && roomNumberInput.value !== VALUE_1) {
    roomNumberInput.setCustomValidity(`Для 1 гостя может быть доступна только ${roomNumberInput.value = VALUE_1} комната`);
  } else if (capacityInput.value === VALUE_2 && roomNumberInput.value !== VALUE_2 && roomNumberInput.value !== VALUE_1) {
    roomNumberInput.setCustomValidity(`Для 2 гостей может быть доступно от ${roomNumberInput.value = VALUE_1} до ${roomNumberInput.value = VALUE_2} комнат`);
  } else if (capacityInput.value === VALUE_3 && roomNumberInput.value !== VALUE_3 && roomNumberInput.value !== VALUE_2 && roomNumberInput.value !== VALUE_1) {
    roomNumberInput.setCustomValidity(`Для 3 гостей может быть доступно от ${roomNumberInput.value = VALUE_1} до ${roomNumberInput.value = VALUE_3} комнат`);
  } else if (capacityInput.value === VALUE_0 && roomNumberInput.value !== VALUE_100) {
    roomNumberInput.setCustomValidity(`При выборе опции "не для гостей" может быть доступно только ${roomNumberInput.value = VALUE_100}  комнат`);
  } else {
    roomNumberInput.setCustomValidity(``);
  }
  roomNumberInput.reportValidity();
};

form.addEventListener(`change`, function () {
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


// const submitButton = document.querySelector(`.ad-form__submit`);
// const successTask = document.querySelector(`#success`).content;
// const successTemplate = successTask.querySelector(`.success`);
// const main = document.querySelector(`.main`);

// 2.8. Нажатие на кнопку .ad-form__reset сбрасывает страницу в исходное неактивное состояние без перезагрузки, а также:
// •	все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
// •	метки похожих объявлений и карточка активного объявления удаляются;
// •	метка адреса возвращается в исходное положение;
// •	значение поля адреса корректируется соответственно положению метки;

// ВОПРОС по 2.8 Не получается сделать так, чтобы все заполненные поля возвращались в изначальное состояние (обнулялись), кроме значение поля адреса, которое корректируется соответственно положению метки
// Для этого обнуляю все поля, кроме поля с id = 'address' и добавляю в слушатель событтий evt.preventDefault(), но поля не становятся пустыми

const allInputsForm = form.querySelectorAll(`input`);
let cleanInputs = function () {
  for (let i = 0; i < allInputsForm.length; i++) {
    const inputElement = allInputsForm[i];
    if (inputElement.id !== `address`) {
      inputElement.value = ``;
    }
  }
};

let pageInactivemake = function () {
  mapDialog.classList.add(`map--faded`);
  addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;
  announcementPins.innerHTML = ``;
};
const resetButton = document.querySelector(`.ad-form__reset`);

resetButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  cleanInputs();
  pageInactivemake();
});
