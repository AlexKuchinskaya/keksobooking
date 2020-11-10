'use strict';
(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  const typeHouseFilter = mapFilters.querySelector(`#housing-type`);

  if (window.form.getPinsData() === `undefined`) {
    mapFilters.children.disabled = true;
  }
  let typeHousing = `any`;
  const updatePins = () => {
    if (typeHousing === `any`) {
      window.pin.renderPins(window.form.getPinsData());
    }
    const sameTypeHousing = window.form.getPinsData().filter((pin) => {
      return pin.offer.type === typeHousing;
    });
    window.pin.renderPins(sameTypeHousing);
  };

  typeHouseFilter.addEventListener(`change`, () => {
    typeHousing = typeHouseFilter.value;
    updatePins();
    if (document.querySelector(`.popup`)) {
      window.card.closeAllPopups();
    }
  });
})();
