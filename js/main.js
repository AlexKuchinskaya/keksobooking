'use strict';
(function () {
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomParameter = (arr) => {
    return arr[getRandomNumber(arr.length)];
  };

  const getObjectArray = (arr) => {
    let someArray = [];
    for (let i = 0; i < getRandomNumber(arr.length); i++) {
      someArray.push(getRandomParameter(arr));
    }
    return someArray;
  };

  window.main = {
    getRandomIntInclusive,
    getRandomNumber,
    getRandomParameter,
    getObjectArray,
  };
})();
