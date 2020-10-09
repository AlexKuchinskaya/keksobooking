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
mapDialog.classList.remove(`map--faded`);

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
      adress: `${locationX}, ${locationY}`,
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

for (let i = 0; i < announcementArray.length; i++) {
  fragment.appendChild(renderPin(announcementArray[i]));
}
announcementPins.appendChild(fragment);
