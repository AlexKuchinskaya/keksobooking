'use strict';
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

const creatNewImage = (someContainer) => {
  let newImg = new Image(40, 40);
  newImg.src = ``;
  someContainer.appendChild(newImg);
  onAnyFileChooserChange(fileChooserHousingPhoto, FILE_TYPES, newImg);
};

fileChooserAvatar.addEventListener(`change`, () => {
  onAnyFileChooserChange(fileChooserAvatar, FILE_TYPES, previewAvatar);
});

fileChooserHousingPhoto.addEventListener(`change`, () => {
  const oldImg = previewHousingPhotoContainer.querySelector(`img`);
  if (!oldImg) {
    creatNewImage(previewHousingPhotoContainer);
  } else {
    const newContainer = previewHousingPhotoContainer.cloneNode();
    creatNewImage(newContainer);
    document.querySelector(`.ad-form__photo-container`).appendChild(newContainer);
  }
});
