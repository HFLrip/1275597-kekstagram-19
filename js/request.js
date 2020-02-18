'use strict';
(function () {
  window.request = function (onSuccess) {
    var URLT = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('GET', URLT);
    xhr.send();
  };
})();
