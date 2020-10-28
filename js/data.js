'use strict';
(function () {
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

  let getAvatar = () => {
    const avatarArr = [];
    for (let i = 1; i <= 8; i++) {
      avatarArr.push(`img/avatars/user0${i}.png`);
    }
    return avatarArr;
  };
  const avatarArray = getAvatar();

  const createHotels = () => {
    let announcementArray = [];
    for (let i = 0; i < 8; i++) {

      announcementArray.push({
        avatar: window.main.getRandomParameter(avatarArray),
        title: window.main.getRandomParameter(ADVERT_TITLE),
        address: `${window.main.getRandomIntInclusive(MIN_X, MAX_X)}, ${window.main.getRandomIntInclusive(MIN_Y, MAX_Y)}`,
        price: window.main.getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
        type: window.main.getRandomParameter(ADVERT_TYPE.length),
        rooms: window.main.getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
        guests: window.main.getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS),
        checkin: window.main.getRandomParameter(CHECKIN),
        checkout: window.main.getRandomParameter(CHECKOUT),
        features: window.main.getObjectArray(FEATURES),
        description: window.main.getRandomParameter(ADVERT_DESCRIPTION),
        photos: window.main.getObjectArray(PHOTOS),
        location: {
          y: window.main.getRandomIntInclusive(MIN_Y, MAX_Y),
          x: window.main.getRandomIntInclusive(MIN_X, MAX_X),
        }
      });
    }
    return announcementArray;
  };

  window.createHotels = createHotels;
  const hotels = createHotels();
  window.hotels = hotels;
})();
