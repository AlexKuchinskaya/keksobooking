'use strict';
(function () {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const fileChooserAvatar = document.querySelector(`.ad-form-header__input`);
  const fileChooserHousingPhoto = document.querySelector(`.ad-form__input`);
  const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
  const previewHousingPhotoContainer = document.querySelector(`.ad-form__photo`);
  previewHousingPhotoContainer.style.padding = `15px 15px`;

  const onAnyFileChooserChange = (fileChooser, FILE_ARRAY, preview) => {
    let file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_ARRAY.some((type) => {
      return fileName.endsWith(type);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener(`change`, () => {
    onAnyFileChooserChange(fileChooserAvatar, FILE_TYPES, previewAvatar);
  });
  fileChooserHousingPhoto.addEventListener(`change`, () => {
    const oldImg = previewHousingPhotoContainer.querySelector(`img`);
    if (oldImg) {
      oldImg.remove(`img`);
    }
    // СОЗДАЮ НОВЫЙ ЭЛМЕНТ img. ЕСТЬ 2 СПОСОБО, ОБА РАБОТАЮТ, ГДЕ ВТОРОЙ КОРОЧЕ, НО НЕ ЗНАЮ ПОДОЙДЕТ ЛИ?

    // 1-ЫЙ СПОСОБ

    // let newImg = document.createElement(`img`);
    // newImg.classList.add(`ad-form__choosen-picture`);
    // newImg.src = ``;
    // newImg.width = `40`;
    // newImg.height = `40`;
    // previewHousingPhotoContainer.appendChild(newImg);

    // 2-ОЙ СПОСОБ
    let newImg = new Image(40, 40);
    newImg.src = ``;
    previewHousingPhotoContainer.appendChild(newImg);

    onAnyFileChooserChange(fileChooserHousingPhoto, FILE_TYPES, newImg);
  });
})();
