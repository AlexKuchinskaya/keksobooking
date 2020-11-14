'use strict';
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const STATUS_CODE = {
  OK: 200
};
const TIMEOUT_IN_MS = 1000;

const ajax = (method, url, data, onSuccess, onError) => {
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
  xhr.open(method, url);
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  ajax(`GET`, URL_LOAD, null, onSuccess, onError);
};

const upload = (data, onSuccess, onError) => {
  ajax(`POST`, URL_UPLOAD, data, onSuccess, onError);
};

window.server = {load, upload};
