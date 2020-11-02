'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 1000;

  const load = (onSuccess, onError) =>{
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status}  ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.open(`GET`, URL);
    xhr.send();
  };
  window.load = load;
})();
