'use strict';
(function () {
  const PRICE_10000 = 10000;
  const PRICE_50000 = 50000;
  const GUEST_1 = 1;
  const GUESTS_2 = 2;
  const mapFilters = document.querySelector(`.map__filters`);
  const typeHouseFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesFilter = mapFilters.querySelector(`#housing-features`);

  if (window.form.getPinsData() === `undefined`) {
    mapFilters.children.disabled = true;
  }
  // Фильтр чекбоксы features, массив с value создается корректно, но не происходит сравнения с данными с сервера
  housingFeaturesFilter.addEventListener(`change`, () => {
    const getCheckedCheckboxes = () => {
      const checkboxes = housingFeaturesFilter.querySelectorAll(`input`);
      let checkboxesChecked = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
        }
      }
      // return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      return checkboxesChecked;
    };
    const checkedBoxes = getCheckedCheckboxes();
    console.log(checkedBoxes);
    const sameTypeFeatures = window.form.getPinsData().filter((pin) => {
      console.log(pin.offer.features === checkedBoxes); // не происходи сравнения
    });
    window.pin.renderPins(sameTypeFeatures);
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  })

  // Фильтр гости
  let housingGuests = `any`;
  housingGuestsFilter.addEventListener(`change`, () => {
    housingGuests = housingGuestsFilter.value;
    if (housingGuests === `any`) {
      return window.pin.renderPins(window.form.getPinsData());
    }
    const checkGuestsNumber = (pin) => {
      let pinElement = parseInt(pin.offer.guests, 10);
      if (pinElement === GUEST_1) {
        pinElement = `1`;

      }
      if (pinElement === GUESTS_2) {
        pinElement = `2`;

      }
      if (pinElement > GUESTS_2) {
        pinElement = `0`;

      }
      return pinElement === housingGuests;
    };
    const sameTypeGuests = window.form.getPinsData().filter(checkGuestsNumber);
    window.pin.renderPins(sameTypeGuests);
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  });

  // Фильтр с кол-ом комнат
  let housingRooms = `any`;
  housingRoomsFilter.addEventListener(`change`, () => {
    housingRooms = housingRoomsFilter.value;
    if (housingRooms === `any`) {
      return window.pin.renderPins(window.form.getPinsData());
    }
    const checcRoomsNumber = (pin) => {
      let pinElement = parseInt(pin.offer.rooms, 10);
      if (pinElement === 1) {
        pinElement = `1`;

      }
      if (pinElement === 2) {
        pinElement = `2`;

      }
      if (pinElement >= 3) {
        pinElement = `3`;

      }
      return pinElement === housingRooms;
    };
    const sameTypeRooms = window.form.getPinsData().filter(checcRoomsNumber);
    window.pin.renderPins(sameTypeRooms);
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  });

  // ранжирование для Фильтра тип жилья и Фильтра цены, ОЧЕНЬ СТРАННО И НЕПРАВИЛЬНО РАНЖИРУЕТСЯ
  let typeHousing = `any`;
  let housingPrice = `any`;
  const getRank = function (pin) {
    let rank = 0;
    if (pin.offer.type === typeHousing) {
      // console.log(pin.offer.type)
      rank += 2;
    }
    const checkPriceNumber = () => {
      let pinElement = parseInt(pin.offer.price, 10);
      if (pinElement < PRICE_10000) {
        pinElement = `low`;

      }
      if (pinElement >= PRICE_10000 && pinElement <= PRICE_50000) {
        pinElement = `middle`;

      }
      if (pinElement > PRICE_50000) {
        pinElement = `high`;

      }
      return pinElement === housingPrice;
    };
    let pinOfferPrice = checkPriceNumber(pin);
    console.log(pinOfferPrice)
    if (pinOfferPrice) {
      rank += 1;
    }
    console.log(rank)
    return rank;
  }


  const updatePins = () => {
    if (typeHousing === `any`) {
      return window.pin.renderPins(window.form.getPinsData());
    }
    // const sameTypeHousing = window.form.getPinsData().filter((pin) => {
    //   return pin.offer.type === typeHousing;
    // });
    if (housingPrice === `any`) {
      return window.pin.renderPins(window.form.getPinsData());
    }
    // const checkPriceNumber = (pin) => {
    //   let pinElement = parseInt(pin.offer.price, 10);
    //   if (pinElement < PRICE_10000) {
    //     pinElement = `low`;

    //   }
    //   if (pinElement >= PRICE_10000 && pinElement <= PRICE_50000) {
    //     pinElement = `middle`;

    //   }
    //   if (pinElement > PRICE_50000) {
    //     pinElement = `high`;

    //   }
    //   return pinElement === housingPrice;
    // };
    // const sameTypePrice = window.form.getPinsData().filter(checkPriceNumber);
    // window.pin.renderPins(sameTypeHousing.concat(sameTypePrice));


    window.pin.renderPins(window.form.getPinsData().sort((left, right) => {
      console.log(getRank(right) - getRank(left))
      return getRank(right) - getRank(left);
    }));
  };

  typeHouseFilter.addEventListener(`change`, () => {
    typeHousing = typeHouseFilter.value;
    updatePins();
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  });
  // Фильтр с ценой
  housingPriceFilter.addEventListener(`change`, () => {
    housingPrice = housingPriceFilter.value;
    // window.pin.renderPins(sameTypePrice);
    updatePins();
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  });
})();
