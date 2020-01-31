'use strict';
var QUANTITY_OF_DESCRIPTIONS = 25;
var MIN_NUMB_OF_LIKES = 15;
var MAX_NUMB_OF_LIKES = 200;
var MAX_AVAILABLE_QUANT_OF_AVATARS = 6;
var MAX_QUANT_OF_COMMENTS = 3;

var namesOfCommentator = ['Артем', 'Коля', 'Dima', 'Petr'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoDescriptions = [];
var getRandomNumber = function (min, max) {
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
var photoList = document.querySelector('.pictures'); // контейнер для фото по классу

var template = document.querySelector('#picture').content;
var pictureElement = template.querySelector('a');
var pushDescriptionsInDom = function (photo) {
  for (var j = 0; j < photo.length; j++) {
    var clonedPictureElement = pictureElement.cloneNode(true);
    var quantityOfComment = clonedPictureElement.querySelector('.picture__comments');
    quantityOfComment.textContent = photo[j].comments.length;
    var quantityOfLikes = clonedPictureElement.querySelector('.picture__likes');
    quantityOfLikes.textContent = photo[j].likes;
    var imgSource = clonedPictureElement.querySelector('img');
    imgSource.src = photo[j].url;
    photoList.appendChild(clonedPictureElement);
  }
};
pushDescriptionsInDom(photoDescriptions);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').src = photoDescriptions[0].url;
bigPicture.querySelector('.likes-count').textContent = photoDescriptions[0].likes;
bigPicture.querySelector('.comments-count').textContent = photoDescriptions[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = photoDescriptions[0].description;
var commentList = document.querySelector('.social__comments');
for (var k = 0; k < photoDescriptions[0].comments.length; k++) {
  var commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentList. appendChild(commentItem);
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = photoDescriptions[0].comments[k].avatar;
  socialPicture.alt = photoDescriptions[0].comments[k].name;
  commentItem.appendChild(socialPicture);
  var textComment = document.createElement('p');
  textComment.textContent = photoDescriptions[0].comments[k].message;
  commentItem.appendChild(textComment);
}
var blocks = document.querySelectorAll('.social__comment-count');
var newComments = document.querySelectorAll('.comments-loader');
var hideElements = function (elements) {
  for (var l = 0; l < elements.length; l++) {
    elements[l].classList.add('hidden');
  }
};
hideElements(newComments);
hideElements(blocks);
var modalOpen = document.querySelector('body');
modalOpen.classList.add('modal-open');


