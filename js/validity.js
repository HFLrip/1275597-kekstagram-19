'use strict';
(function () {
  var imgUploadText = document.querySelector('.img-upload__text');
  var textInputHashtag = imgUploadText.querySelector('.text__hashtags');
  textInputHashtag.maxlength = window.data.MAX_LENGTH;
  textInputHashtag.minlength = window.data.MIN_LENGTH;


  var getFullHashtags = function (text) {
    var hashtags = text.split(' ');
    return hashtags;
  };

  var checkHashTag = function () {
    var textLineHashtag = textInputHashtag.value.toLowerCase();
    var letters = [];
    var array = getFullHashtags(textLineHashtag);
    if (array.length > window.data.MAX_QUANTITY_OF_HASHTAGS) {
      return 'Максимальное количество хэштегов - 5';
    }
    for (var t = 0; t < array.length; t++) {
      letters = array[t].split('');
      var idx = array.indexOf(array[t], t + 1);
      if (idx !== -1) {
        return 'один и тот же хэш-тег не может быть использован дважды';
      } else if (array[t] === '#') {
        return 'Хэштег не должен состоять только из #';
      } else if (letters[0] !== '#') {
        return 'Хэштег начинается с #';
      } else if (letters.length > window.data.MAX_LENGTH) {
        return 'Максимальное количество символов - 20';
      }
      for (var j = 0; j < letters.length; j++) {
        if (letters[j + 1] === '#') {
          return 'Разделите хэштеги пробелом';
        } else if (letters[j].search(/[#a-zа-яё0-9]/) === -1) {
          return 'хэштег не может содержать спецсимволы';
        } else if (letters[0] !== '#') {
          return 'Хэштег начинается с #';
        }
      }
    }
    return '';
  };

  var onHashtagsInput = function (evt) {
    textInputHashtag.setCustomValidity('');
    var errorMessage = checkHashTag(); // здесь вызывается функция, которая проверяет хэш тег и возвращает текст ошибки после проверки или пустую строку
    if (errorMessage) {
      textInputHashtag.setCustomValidity(errorMessage);
    }
    textInputHashtag.reportValidity();
  };

  var onHashtagsInvalid = function (evt) {
    if (textInputHashtag.validity.tooShort) {
      textInputHashtag.setCustomValidity('Очень короткий');
    } else if (textInputHashtag.validity.tooLong) {
      textInputHashtag.setCustomValidity('Очень длинный');
    }
  };
  textInputHashtag.addEventListener('input', onHashtagsInput);
  textInputHashtag.addEventListener('invalid', onHashtagsInvalid);
})();
