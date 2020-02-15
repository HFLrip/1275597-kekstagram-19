'use strict';
(function () {
  var URLT = 'https://js.dump.academy/kekstagram/data';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', URLT);
  xhr.send();
  window.request = {
    xhr: xhr,
  };
})();
