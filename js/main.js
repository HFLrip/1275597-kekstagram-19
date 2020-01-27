'use strict';
var quntityOfDescriptions = 25;
var namesOfCommentator = ['Артем', 'Коля', 'Dima', 'Petr'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var comments = [];
var photoDescriptions = [];
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (var j = 0; j < 6; j++) {
  var avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  var comment = {
    avatar: avatar,
    message: messages[getRandomNumber(0, 5)],
    name: namesOfCommentator[getRandomNumber(0, 3)],
  };
  comments[j] = comment;
}

for (var i = 0; i < quntityOfDescriptions; i++) {
  var url = 'photos/' + (i + 1) + '.jpg';
  var element = {
    url: url,
    description: 'описание фотографии',
    likes: getRandomNumber(15, 200),
    comments: comments,
  };
  photoDescriptions[i] = element;
}

var photoList = document.querySelector('.pictures'); // контейнер для фото по классу

var template = document.querySelector('#picture').content;
var pictureElement = template.querySelector('a');
for (var n = 0; n < photoDescriptions.length; n++) {
  var clonedPictureElement = pictureElement.cloneNode(true);
  var quantityOfComment = clonedPictureElement.querySelector('.picture__comments');
  quantityOfComment.textContent = photoDescriptions[n].comments;
  var quantityOfLikes = clonedPictureElement.querySelector('.picture__likes');
  quantityOfLikes.textContent = photoDescriptions[n].likes;
  var imgSource = clonedPictureElement.querySelector('img');
  imgSource.src = photoDescriptions[n].url;
  photoList.appendChild(clonedPictureElement);
}

/* Вместо этого говна – клонирование ниже
var makeElement = function (tagName, className, text) {
  var elementOfPicture = document.createElement(tagName);
  elementOfPicture.classList.add(className);
  if (text) {
    elementOfPicture.textContent = text;
  }
  return elementOfPicture;
};
var createPicture = function (photo) {
  var listPicture = makeElement('a', 'picture');
  var photoPicture = makeElement('img', 'picture__img');
  photoPicture.src = photo.url;
  photoPicture.alt = photo.description;
  listPicture.appendChild(photoPicture);
  var info = makeElement('p', 'picture__info');
  listPicture.appendChild(info);
  var pictureComments = makeElement('span', 'picture__comments', comments.length);
  info.appendChild(pictureComments);
  var pictureLikes = makeElement('span', 'picture__likes', photo.likes);
  info.appendChild(pictureLikes);
  return listPicture;
};
for (var n = 0; n < photoDescritpions.length; n++) {
  var photoItem = createPicture(photoDescritpions[n]);
  photoList.appendChild(photoItem);
}

Надо создать контейнер для фото по классу, затем добавить в него элемент


  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>
  */
