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
// mapDialog.classList.remove(`map--faded`);

const announcementPins = document.querySelector(`.map__pins`);
const advertTask = document.querySelector(`#pin`).content;
const advertTemplate = advertTask.querySelector(`.map__pin`);

const fragment = document.createDocumentFragment();

function getRandomIntInclusive(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

let getAvatar = function () {
  let avatarArr = [];
  for (let i = 1; i <= 8; i++) {
    let newAvatar = `img/avatars/user` + `0` + i + `.png`;
    avatarArr.push(newAvatar);
  }
  return avatarArr;
};
const avatarArray = getAvatar();

let getRandomLength = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

const getRandomParameter = function (arr) {
  let randomParameter = arr[Math.floor(Math.random() * arr.length)];
  return randomParameter;
};

const getObjectArray = function (arr) {
  let someArray = [];
  for (let i = 0; i < getRandomLength(arr.length); i++) {
    someArray.push(getRandomParameter(arr));
  }
  return someArray;
};

let getArray = function () {
  const announcementArray = [];
  for (let i = 0; i < 8; i++) {

    const randomAvatar = getRandomParameter(avatarArray);
    const randomTitle = getRandomParameter(ADVERT_TITLE);
    const randomCheckin = getRandomParameter(CHECKIN);
    const randomCheckout = getRandomParameter(CHECKOUT);
    const randomType = getRandomParameter(ADVERT_TYPE);
    const randomDescription = getRandomParameter(ADVERT_DESCRIPTION);
    const locationX = getRandomIntInclusive(MIN_X, MAX_X);
    const locationY = getRandomIntInclusive(MIN_Y, MAX_Y);
    const randomPrice = getRandomIntInclusive(MIN_PRICE, MAX_PRICE);
    const randomRooms = getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS);
    const randomGuests = getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS);
    const randomFeatureArray = getObjectArray(FEATURES);
    const randomPhotosArray = getObjectArray(PHOTOS);

    announcementArray.push({
      avatar: randomAvatar,
      title: randomTitle,
      address: `${locationX}, ${locationY}`,
      price: randomPrice,
      type: randomType,
      rooms: randomRooms,
      guests: randomGuests,
      checkin: randomCheckin,
      checkout: randomCheckout,
      features: randomFeatureArray,
      description: randomDescription,
      photos: randomPhotosArray,
      location: {
        y: locationY,
        x: locationX,
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
  for (let i = 0; i < announcementArray.length; i++) {
    fragment.appendChild(renderPin(announcementArray[i]));
  }
  announcementPins.appendChild(fragment);
};

// 3.2 Личный проект: больше деталей (часть 2)
const cardTask = document.querySelector(`#card`).content;
const cardTemplate = cardTask.querySelector(`.popup`);
const appartmentTypeTranslation = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const mapFiltersContainer = document.querySelector(`.map__filters-container`);

let renderPopup = function (information) {
  let popupElement = cardTemplate.cloneNode(true);
  popupElement.querySelector(`.popup__title`).textContent = information.title;
  popupElement.querySelector(`.popup__text--address`).textContent = information.address;
  popupElement.querySelector(`.popup__text--price`).textContent = information.price + `₽/ночь`;
  popupElement.querySelector(`.popup__type`).textContent = appartmentTypeTranslation[information.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = `${information.rooms} комнаты для ${information.guests} гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${information.checkin}, выезд до ${information.checkout}`;
  // Не получается здесь. Если я делаю так,
  // то на странице отображается весь список удобств (как в разметке),
  // когда на самом деле из этого списка  в случайно сгенерированном только 2 удобства.
  // Думаю, что у меня не получается записать правильно каждое удобство в отлельный тег li  с соответствующим классом
  popupElement.querySelector(`.popup__feature`).length = information.features.length;
  popupElement.querySelector(`.popup__description`).textContent = information.description;
  popupElement.querySelector(`.popup__avatar`).src = information.avatar;
  // Здесь похожая проблема, у меня  не получается записать каждую строку массива фотографий в отдельный тег img.
  // Пробовала так, но тегов img больше не становится, а src = unknown.

  // popupElement.querySelector(`.popup__photos`).src = information.photos;

  const photoPopup = popupElement.querySelector(`.popup__photo`);
  // let length = Math.min(getObjectArray(PHOTOS).length, popupElement.length);

  for (let i = 0; i < getObjectArray(PHOTOS).length; i++) {
    // popupElement.querySelector(`.popup__photos`).appendChild(photoPopup[i]);
    photoPopup.length = information.photos.length;
    photoPopup[i].src = information.photos[i];
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
const elementsFieldset = document.querySelectorAll(`.ad-form__element`);
const form = document.querySelector(`.ad-form`);
const titleInput = form.querySelector(`#title`);
const mapFilters = document.querySelector(`.map__filters`);
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
for (let elementFieldset of elementsFieldset) {
  elementFieldset.setAttribute(`disabled`, `true`);
}

const pinMain = document.querySelector(`.map__pin--main`);
let addressInput = document.querySelector(`#address`);

const pinMainActiveCoordinateX = 570 + 33;
const pinMainActiveCoordinateY = 375 + 33;
const pinMaininActiveCoordinateX = 570;
const pinMaininActiveCoordinateY = 375;

addressInput.value = `${pinMaininActiveCoordinateX}, ${pinMaininActiveCoordinateY}`;

let onPinMainMousedown = function () {
  for (let elementFieldset of elementsFieldset) {
    elementFieldset.removeAttribute(`disabled`);
  }
  mapDialog.classList.remove(`map--faded`);
  form.classList.remove(`.ad-form--disabled`);
  mapFilters.classList.remove(`.map__filters--disabled`);
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
    titleInput.setCustomValidity(`Еще ` + (MIN_TITLE_LENGTH - valueLength) + ` символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    titleInput.setCustomValidity(``);
  }
  titleInput.reportValidity();
});


const roomNumberInput = form.querySelector(`#room_number`);
const capacityInput = form.querySelector(`#capacity`);

form.addEventListener(`change`, function () {
  if (capacityInput.value === `1` && roomNumberInput.value !== `1`) {
    roomNumberInput.setCustomValidity(`Для 1 гостя может быть доступна только ${roomNumberInput.value = `1`} комната`);
  } else if (capacityInput.value === `2` && roomNumberInput.value !== `2` && roomNumberInput.value !== `1`) {
    roomNumberInput.setCustomValidity(`Для 2 гостей может быть доступно от ${roomNumberInput.value = `1`} до ${roomNumberInput.value = `2`} комнат`);
  } else if (capacityInput.value === `3` && roomNumberInput.value !== `3` && roomNumberInput.value !== `2` && roomNumberInput.value !== `1`) {
    roomNumberInput.setCustomValidity(`Для 3 гостей может быть доступно от ${roomNumberInput.value = `1`} до ${roomNumberInput.value = `3`} комнат`);
  } else if (capacityInput.value === `0` && roomNumberInput.value !== `100`) {
    roomNumberInput.setCustomValidity(`При выборе опции "не для гостей" может быть доступно только ${roomNumberInput.value = `100`}  комнат`);
  } else {
    roomNumberInput.setCustomValidity(``);
  }
  roomNumberInput.reportValidity();
});


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
// Также хотела установить setCustomValidity параллельно не только для минимального значения,
// но и для максимального значения цены. В итоге пропадает как «первое сообщение», так и второе
// let onPriceInputChange = function () {
  // const maxCost = priceInput.value.length > MAX_INPUT_PRICE ? `Максимальная стоимость должна составлять ${MAX_PRICE}` : ``;
  // priceInput.setCustomValidity(maxCost);
  // priceInput.reportValidity();
// };

// form.addEventListener(`change`, function () {
  // onPriceInputChange();
// });

const timeIn = form.querySelector(`#timein`);
const timeOut = form.querySelector(`#timeout`);
let onTimeInChange = function () {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener(`change`, function () {
  onTimeInChange();
});


const submitButton = document.querySelector(`.ad-form__submit`);
submitButton.addEventListener(`submit`, function () {
});
