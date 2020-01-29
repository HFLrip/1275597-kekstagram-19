'use strict';
var quntityOfDescriptions = 25;
var namesOfCommentator = ['Артем', 'Коля', 'Dima', 'Petr'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photoDescriptions = [];
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getComment = function () {
  var avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  var comment = {
    avatar: avatar,
    message: messages[getRandomNumber(0, 5)],
    name: namesOfCommentator[getRandomNumber(0, 3)],
  };
  return comment;
};
var generatePhotoDescription = function (count) {
  var comments = [];
  for (var b = 0; b < getRandomNumber(0, 3); b++) {
    comments[b] = getComment();
  }
  var url = 'photos/' + (count + 1) + '.jpg';
  var element = {
    url: url,
    description: 'описание фотографии',
    likes: getRandomNumber(15, 200),
    comments: comments,
  };
  return element;
};
for (var i = 0; i < quntityOfDescriptions; i++) {
  photoDescriptions [i] = generatePhotoDescription(i);
}
var photoList = document.querySelector('.pictures'); // контейнер для фото по классу

var template = document.querySelector('#picture').content;
var pictureElement = template.querySelector('a');
var pushDescriptionsInDom = function (photo) {
  for (var n = 0; n < photo.length; n++) {
    var clonedPictureElement = pictureElement.cloneNode(true);
    var quantityOfComment = clonedPictureElement.querySelector('.picture__comments');
    quantityOfComment.textContent = photo[n].comments.length;
    var quantityOfLikes = clonedPictureElement.querySelector('.picture__likes');
    quantityOfLikes.textContent = photo[n].likes;
    var imgSource = clonedPictureElement.querySelector('img');
    imgSource.src = photo[n].url;
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
var socialComment = document.querySelector('.social__comment');
for (var v = 0; v < photoDescriptions[0].comments.length; v++) {
  var socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = photoDescriptions[0].comments[v].avatar;
  socialPicture.alt = photoDescriptions[0].comments[v].name;
  socialPicture.style.width = '35';
  socialPicture.style.height = '35';
  socialComment.appendChild(socialPicture);
  var textComment = document.createElement('p');
  textComment.textContent = photoDescriptions[0].comments[v].message;
  socialComment.appendChild(textComment);
}
var countBlock = document.querySelectorAll('.social__comment-count');
var newComments = document.querySelectorAll('.comments-loader');
var addClass = function (classArray) {
  for (var c = 0; c < classArray.length; c++) {
    classArray.classList.add('hidden');
  }
};
addClass(newComments);
addClass(countBlock);
var modalOpen = document.querySelector('body');
modalOpen.classList.add('modal-open');


