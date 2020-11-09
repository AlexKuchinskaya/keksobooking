'use strict';
const mapFilters = document.querySelector(`.map__filters`);
const typeHouseFilter = mapFilters.querySelector(`#housing-type`);

if (window.form.getPinsData() === `undefined`) {
  mapFilters.children.disabled = true;
}
let typeHousing = `any`;
const updatePins = function () {
  const sameTypeHousing = window.form.getPinsData().filter(function (pin) {
    return pin.offer.type === typeHousing;
  });
  window.pin.renderPins(sameTypeHousing);
};

typeHouseFilter.addEventListener(`change`, function () {
  let optionHouse = typeHouseFilter.value;
  typeHousing = optionHouse;
  updatePins();
  if (document.querySelector(`.popup`)) {
    window.card.closePopup();
  }
});
