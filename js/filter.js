'use strict';
(function () {
  const PRICE_10000 = 10000;
  const PRICE_50000 = 50000;
  const ANY_VALUE = `any`;
  const ROOM_1 = 1;
  const ROOMS_2 = 2;
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
  const getHousingTypeChangeValue = () => {
    return typeHouseFilter.value;
  };
  const getHousingPriceChangeValue = () => {
    return housingPriceFilter.value;
  };

  const getHousingRoomsChangeValue = () => {
    return housingRoomsFilter.value;
  };

  const getHousingGuestsChangeValue = () => {
    return housingGuestsFilter.value;
  };

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

  const filterPinsByHousingFeatures = (pins, featuresArray) => {
    return pins.filter((pin) => {
      return featuresArray.every((feature) => {
        return pin.offer.features.includes(feature);
      });
    });
  };
  const filterPinsByHousingType = (pins, housingType) => {
    if (housingType === ANY_VALUE) {
      return pins;
    } else {
      return pins.filter((pin) => {
        return pin.offer.type === housingType;
      });
    }
  };
  const getPriceCategoryFromNumber = (priceNumber) => {
    if (priceNumber < PRICE_10000) {
      return `low`;
    }
    if (priceNumber > PRICE_50000) {
      return `high`;
    }
    return `middle`;
  };
  const filterPinsByHousingPrice = (pins, priceCatagory) => {
    if (priceCatagory === ANY_VALUE) {
      return pins;
    } else {
      return pins.filter((pin) => {
        return getPriceCategoryFromNumber(pin.offer.price) === priceCatagory;
      });
    }
  };
  const getRoomСategory = (roomNumber) => {
    if (roomNumber === ROOM_1) {
      return `1`;
    }
    if (roomNumber === ROOMS_2) {
      return `2`;
    }
    return `3`;
  };
  const filterPinsByHousingRooms = (pins, roomCategory) => {
    if (roomCategory === ANY_VALUE) {
      return pins;
    } else {
      return pins.filter((pin) => {
        return getRoomСategory(pin.offer.rooms) === roomCategory;
      });
    }
  };
  const getGuestCategory = (guestNumber) => {
    if (guestNumber === GUEST_1) {
      return `1`;
    }
    if (guestNumber === GUESTS_2) {
      return `2`;
    }
    return `0`;
  };
  const filterPinsByHousingGuests = (pins, guestCategory) => {
    if (guestCategory === `any`) {
      return pins;
    } else {
      return pins.filter((pin) => {
        return getGuestCategory(pin.offer.guests) === guestCategory;
      });
    }
  };
  const elementsFilterForm = mapFilters.children;
  for (let i = 0; i < elementsFilterForm.length; i++) {
    let filterElement = elementsFilterForm[i];
    filterElement.addEventListener(`change`, () => {
      const selectedHousingType = getHousingTypeChangeValue();
      const selectedHousingPrice = getHousingPriceChangeValue();
      const selectedHousingRooms = getHousingRoomsChangeValue();
      const selectedHousingGuests = getHousingGuestsChangeValue();
      const selectedFeatures = getCheckedCheckboxes();
      const allPins = window.form.getPinsData();
      const pinsFilteredByHousingType = filterPinsByHousingType(allPins, selectedHousingType);
      const pinsFilteredByPrice = filterPinsByHousingPrice(pinsFilteredByHousingType, selectedHousingPrice);
      const pinsFilteredByRooms = filterPinsByHousingRooms(pinsFilteredByPrice, selectedHousingRooms);
      const pinsFilteredByGuests = filterPinsByHousingGuests(pinsFilteredByRooms, selectedHousingGuests);
      const pinsFilteredByAll = filterPinsByHousingFeatures(pinsFilteredByGuests, selectedFeatures);
      window.pin.renderPins(pinsFilteredByAll);
      if (document.querySelector(`.popup`)) {
        window.card.closeAllPopups();
      }
    });
  }
})();
