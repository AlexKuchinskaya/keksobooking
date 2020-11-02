'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 1000;
  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
  window.upload = upload;
}());
