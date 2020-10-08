'use strict';
function getRandomIntInclusive(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  return randomNumber;
}

// Работает location x брала размеры блока div.map__overlay
const MIN_X = 0;
const MAX_X = 704;
const MIN_Y = 130;
const MAX_Y = 630;
let locationX = getRandomIntInclusive(MIN_X, MAX_X);
let locationY = getRandomIntInclusive(MIN_Y, MAX_Y);

let randomPrice = getRandomIntInclusive(10000, 50000);
let randomRooms = getRandomIntInclusive(1, 15);
let randomGuests = getRandomIntInclusive(1, 20);

let getAvatar = function () {
  let avatarArr = [];
  for (let i = 1; i <= 8; i++) {
    let newAvatar = `img/avatars/user` + `0` + i + `.png`;
    avatarArr.push(newAvatar);
  }
  return avatarArr;
};

const advertAvatar = getAvatar();
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

// features
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let getRandomLength = function (arr) {
  let randomLength = Math.floor(Math.random() * arr.length);
  return randomLength;
};


const getRandomParameter = function (arr) {
  let randomParameter = arr[Math.floor(Math.random() * arr.length)];
  return randomParameter;
};


const getObjectArray = function (arr) {
  let someArr = [];
  for (let i = 0; i < getRandomLength(arr); i++) {
    someArr.push(getRandomParameter(arr));
  }
  return someArr;
};

let randomFeatureArray = getObjectArray(FEATURES);

// Photos
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

let randomPhotosArray = getObjectArray(PHOTOS);

let randomTitle = getRandomParameter(ADVERT_TITLE);
let randomCheckin = getRandomParameter(CHECKIN);
let randomCheckout = getRandomParameter(CHECKOUT);
let randomType = getRandomParameter(ADVERT_TYPE);
let randomDescription = getRandomParameter(ADVERT_DESCRIPTION);


let getArray = function () {
  const announcementArray = [];
  for (let i = 0; i < 8; i++) {
    let author = {};
    author.avatar = advertAvatar;
    announcementArray.push(author);

    let offer = {};
    offer.title = randomTitle;
    offer.adress = locationX + `, ` + locationY;
    offer.price = randomPrice;
    offer.type = randomType;
    offer.rooms = randomRooms;
    offer.guests = randomGuests;
    offer.checkin = randomCheckin;
    offer.checkout = randomCheckout;
    offer.features = randomFeatureArray;
    offer.description = randomDescription;
    offer.photos = randomPhotosArray;
    announcementArray.push(offer);

    let location = {};
    location.y = locationY;
    location.x = locationX;
    announcementArray.push(location);

  }
  return announcementArray;
};

let announcementArray = getArray();

const mapDialog = document.querySelector(`.map`);
mapDialog.classList.remove(`map--faded`);

const announcementPins = document.querySelector(`.map__pins`);
const advertTask = document.querySelector(`#pin`).content;
const advertTemplate = advertTask.querySelector(`.map__pin`);

const PIN_OFFSET_Y = 84;
const PIN_OFFSET_X = 31;
let renderPin = function (pins) {
  const coordinateLeft = pins.x + PIN_OFFSET_X;
  const coordinateTop = pins.y + PIN_OFFSET_Y;
  let pinElement = advertTemplate.cloneNode(true);
  pinElement.style = `left: ${coordinateLeft}px;` + ` ` + `top: ${coordinateTop}px;`;
  pinElement.querySelector(`img`).src = pins.avatar;
  pinElement.querySelector(`img`).src = pins.title;

  return pinElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < announcementArray.length; i++) {
  fragment.appendChild(renderPin(announcementArray[i]));
}
announcementPins.appendChild(fragment);
