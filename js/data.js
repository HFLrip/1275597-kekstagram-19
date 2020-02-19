'use strict';
(function () {
//  var QUANTITY_OF_DESCRIPTIONS = 25;
//  var MIN_NUMB_OF_LIKES = 15;
//  var MAX_NUMB_OF_LIKES = 200;
//  var MAX_AVAILABLE_QUANT_OF_AVATARS = 6;
//  var MAX_QUANT_OF_COMMENTS = 3;
  var ESC_KEY = 'Escape';
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;
  var PIN_DEFAULT = 100;
  var MIN_LENGTH = 0;
  var MAX_LENGTH = 20;
  var MAX_QUANTITY_OF_HASHTAGS = 5;
  //  var namesOfCommentator = ['Артем', 'Коля', 'Dima', 'Petr'];
  //  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  /*  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getComment = function () {
    var avatar = 'img/avatar-' + getRandomNumber(1, MAX_AVAILABLE_QUANT_OF_AVATARS) + '.svg';
    var comment = {
      avatar: avatar,
      message: messages[getRandomNumber(0, messages.length - 1)],
      name: namesOfCommentator[getRandomNumber(0, namesOfCommentator.length - 1)],
    };
    return comment;
  };
  var generatePhotoDescription = function (count) {
    var comments = [];
    for (var i = 0; i < getRandomNumber(0, MAX_QUANT_OF_COMMENTS); i++) {
      comments[i] = getComment();
    }
    var url = 'photos/' + (count + 1) + '.jpg';
    var element = {
      url: url,
      description: 'описание фотографии',
      likes: getRandomNumber(MIN_NUMB_OF_LIKES, MAX_NUMB_OF_LIKES),
      comments: comments,
    };
    return element;
  };
  for (var i = 0; i < QUANTITY_OF_DESCRIPTIONS; i++) {
    photoDescriptions [i] = generatePhotoDescription(i);
  }
*/
  var blocks = document.querySelectorAll('.social__comment-count');
  var newComments = document.querySelectorAll('.comments-loader');
  var hideElements = function (elements) {
    for (var l = 0; l < elements.length; l++) {
      elements[l].classList.add('hidden');
    }
  };
  hideElements(newComments);
  hideElements(blocks);
  //  var photos = document.querySelectorAll('#picture');
  //  photos.addEventListener('click', window.preview.getBigPicture);
  window.data = {
    ESC_KEY: ESC_KEY,
    SCALE_STEP: SCALE_STEP,
    SCALE_DEFAULT: SCALE_DEFAULT,
    PIN_DEFAULT: PIN_DEFAULT,
    MIN_LENGTH: MIN_LENGTH,
    MAX_LENGTH: MAX_LENGTH,
    MAX_QUANTITY_OF_HASHTAGS: MAX_QUANTITY_OF_HASHTAGS,
  };
})();
/*
(function () {
    var avatar = 'img/avatar-' + getRandomNumber(1, MAX_AVAILABLE_QUANT_OF_AVATARS) + '.svg';
    var comment = {
      avatar: avatar,
      message: messages[getRandomNumber(0, messages.length - 1)],
      name: namesOfCommentator[getRandomNumber(0, namesOfCommentator.length - 1)],
    };
    return comment;
  })();
  for (var i = 0; i < QUANTITY_OF_DESCRIPTIONS; i++) {
    photoDescriptions [i] = function () {
      var comments = [];
      for (var j = 0; j < getRandomNumber(0, MAX_QUANT_OF_COMMENTS); j++) {
        comments[j] = comment;
      }
      var url = 'photos/' + (i + 1) + '.jpg';
      var element = {
        url: url,
        description: 'описание фотографии',
        likes: getRandomNumber(MIN_NUMB_OF_LIKES, MAX_NUMB_OF_LIKES),
        comments: comments,
      };
      return element;
    };
  }
  */
