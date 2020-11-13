'use strict';
(function () {
  const PRICE_10000 = 10000;
  const PRICE_50000 = 50000;
  const ANY_VALUE = `any`;
  const LOW_PRICE = `low`;
  const MIDDLE_PRICE = `middle`;
  const HIGH_PRICE = `high`;
  const ROOM_1 = 1;
  const ROOMS_2 = 2;
  const ROOM_1_STRING = `1`;
  const ROOM_2_STRING = `2`;
  const ROOM_3_STRING = `3`;
  const GUEST_1 = 1;
  const GUEST_1_STRING = `1`;
  const GUEST_2_STRING = `2`;
  const GUEST_0_STRING = `0`;
  const GUESTS_2 = 2;
  const MAX_PINS = 5;
  const mapFilters = document.querySelector(`.map__filters`);
  const typeHouseFilter = mapFilters.querySelector(`#housing-type`);
  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesFilter = mapFilters.querySelector(`#housing-features`);
  const elementsFilterForm = mapFilters.children;

  const checkMapPinsUndefined = () => {
    if (window.form.getPinsData() === `undefined`) {
      mapFilters.children.disabled = true;
    }
  };

  checkMapPinsUndefined();

  const getCheckedCheckboxes = () => {
    const checkboxes = housingFeaturesFilter.querySelectorAll(`input`);
    let checkboxesChecked = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
    return checkboxesChecked;
  };

  const filterPinsByHousingFeatures = (pin) => {
    const featuresArray = getCheckedCheckboxes();
    return featuresArray.every((feature) => {
      return pin.offer.features.includes(feature);
    }) ? pin : null;
  };

  const filterPinsByHousingType = (pin) => {
    const housingType = typeHouseFilter.value;
    if (housingType === ANY_VALUE) {
      return pin;
    }
    return pin.offer.type === housingType ? pin : null;
  };

  const getPriceCategoryFromNumber = (priceNumber) => {
    if (priceNumber < PRICE_10000) {
      return LOW_PRICE;
    }
    if (priceNumber > PRICE_50000) {
      return HIGH_PRICE;
    }
    return MIDDLE_PRICE;
  };

  const filterPinsByHousingPrice = (pin) => {
    const priceCategory = housingPriceFilter.value;
    if (priceCategory === ANY_VALUE) {
      return pin;
    }
    return getPriceCategoryFromNumber(pin.offer.price) === priceCategory ? pin : null;
  };

  const getRoomСategory = (roomNumber) => {
    if (roomNumber === ROOM_1) {
      return ROOM_1_STRING;
    }
    if (roomNumber === ROOMS_2) {
      return ROOM_2_STRING;
    }
    return ROOM_3_STRING;
  };

  const filterPinsByHousingRooms = (pin) => {
    const roomCategory = housingRoomsFilter.value;
    if (roomCategory === ANY_VALUE) {
      return pin;
    }
    return getRoomСategory(pin.offer.rooms) === roomCategory ? pin : null;
  };

  const getGuestCategory = (guestNumber) => {
    if (guestNumber === GUEST_1) {
      return GUEST_1_STRING;
    }
    if (guestNumber === GUESTS_2) {
      return GUEST_2_STRING;
    }
    return GUEST_0_STRING;
  };

  const filterPinsByHousingGuests = (pin) => {
    const guestCategory = housingGuestsFilter.value;
    if (guestCategory === `any`) {
      return pin;
    }
    return getGuestCategory(pin.offer.guests) === guestCategory ? pin : null;
  };

  for (let i = 0; i < elementsFilterForm.length; i++) {
    let filterElement = elementsFilterForm[i];
    filterElement.addEventListener(`change`, () => {
      const allPins = window.form.getPinsData();
      const filters = [filterPinsByHousingType, filterPinsByHousingPrice, filterPinsByHousingRooms, filterPinsByHousingGuests, filterPinsByHousingFeatures];
      const filteredPins = [];
      for (let pinIndex = 0; pinIndex < allPins.length && filteredPins.length < MAX_PINS; pinIndex++) {
        let pin = allPins[pinIndex];
        for (let filterIndex = 0; filterIndex < filters.length && pin; filterIndex++) {
          pin = filters[filterIndex](pin);
        }
        if (pin) {
          filteredPins.push(pin);
        }
      }
      // Не получается DEbounce
      window.debounce(window.pin.renderPins(filteredPins));
      // window.setTimeout(function () {
      //   window.pin.renderPins(filteredPins);
      // }, 500);
      // window.pin.renderPins(filteredPins);
      window.card.closeAllPopups();
    });
  }
})();
