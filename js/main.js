'use strict';
var QUANTITY_OF_DESCRIPTIONS = 25;
var MIN_NUMB_OF_LIKES = 15;
var MAX_NUMB_OF_LIKES = 200;
var MAX_AVAILABLE_QUANT_OF_AVATARS = 6;
var MAX_QUANT_OF_COMMENTS = 3;
var ESC_KEY = 'Escape';
var SCALE_STEP = 25;
var SCALE_DEFAULT = 100;
var PIN_DEFAULT = 100;

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
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});
var bigPictureCloseButton = bigPicture.querySelector('#picture-cancel');
var closeButtonHandler = function () {
  bigPicture.classList.add('hidden');
};

bigPictureCloseButton.addEventListener('click', closeButtonHandler);


var modalOpen = document.querySelector('body');
var fieldUploadFile = document.querySelector('#upload-file');
var editingForm = modalOpen.querySelector('.img-upload__overlay');
var closeButtonEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeEditingForm();
  }
};
var openEditingForm = function () {
  editingForm.classList.remove('hidden');
  document.addEventListener('keydown', closeButtonEscPress);
  modalOpen.classList.add('modal-open');
};
var closeEditingForm = function () {
  editingForm.classList.add('hidden');
  document.removeEventListener('keydown', closeButtonEscPress);
  modalOpen.classList.remove('modal-open');
};
fieldUploadFile.addEventListener('change', openEditingForm);
var closeButtonEditingForm = editingForm.querySelector('#upload-cancel');
closeButtonEditingForm.addEventListener('click', closeEditingForm);
var scaleControlValue = editingForm.querySelector('.scale__control--value');
var scaleOfImg = SCALE_DEFAULT;
scaleControlValue.value = SCALE_DEFAULT + ' %';
var scaleControlSmaller = editingForm.querySelector('.scale__control--smaller');
var scaleControlBigger = editingForm.querySelector('.scale__control--bigger');
var imgUploadPreviewContainer = editingForm.querySelector('.img-upload__preview');
var imgUploadPreview = imgUploadPreviewContainer.querySelector('img');

var buttonScaleControlBigger = function () {
  if (scaleOfImg < SCALE_DEFAULT) {
    scaleOfImg += SCALE_STEP;
    scaleControlValue.value = scaleOfImg + ' %';
    imgUploadPreview.style.transform = 'scale(' + (scaleOfImg / 100) + ')';
  }
};
var buttonScaleControlSmaller = function () {
  if (scaleOfImg > SCALE_STEP) {
    scaleOfImg -= SCALE_STEP;
    scaleControlValue.value = scaleOfImg + ' %';
    imgUploadPreview.style.transform = 'scale(' + (scaleOfImg / 100) + ')';
  }
};
scaleControlBigger.addEventListener('click', buttonScaleControlBigger);
scaleControlSmaller.addEventListener('click', buttonScaleControlSmaller);

var effectLevelPin = editingForm.querySelector('.effect-level__pin');
var effectLevelValue = editingForm.querySelector('.effect-level__value');
var effectsList = editingForm.querySelector('.effects__list');
var effectNone = effectsList.querySelector('#effect-none');
var effectChrome = effectsList.querySelector('#effect-chrome');
var effectSepia = effectsList.querySelector('#effect-sepia');
var effectMarvin = effectsList.querySelector('#effect-marvin');
var effectsPhobos = effectsList.querySelector('#effect-phobos');
var effectsheat = effectsList.querySelector('#effect-heat');
var imgUploadEffectLevel = editingForm.querySelector('.img-upload__effect-level');
var filter = '';
var pinValue = PIN_DEFAULT;
imgUploadEffectLevel.classList.add('hidden');

var addEffectsPreviewChrome = function () {
  filter = 'chrome';
  imgUploadEffectLevel.classList.remove('hidden');
  imgUploadPreview.classList.add('effects__preview--chrome');
  pinValue = PIN_DEFAULT / 100;
  imgUploadPreview.style.filter = 'grayscale(' + pinValue + ')';
  imgUploadPreview.classList.remove('effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  effectLevelPin.addEventListener('mouseup', radioChangeFilter);
};
var addEffectsPreviewNone = function () {
  filter = 'none';
  imgUploadPreview.classList.add('effects__preview--none');
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imgUploadPreview.style.filter = '';
};
var addEffectsPreviewSepia = function () {
  filter = 'sepia';
  imgUploadEffectLevel.classList.remove('hidden');
  imgUploadPreview.classList.add('effects__preview--sepia');
  pinValue = PIN_DEFAULT / 100;
  imgUploadPreview.style.filter = 'sepia(' + pinValue + ')';
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  effectLevelPin.addEventListener('mouseup', radioChangeFilter);
};
var addEffectsPreviewMarvin = function () {
  filter = 'marvin';
  imgUploadEffectLevel.classList.remove('hidden');
  imgUploadPreview.classList.add('effects__preview--marvin');
  imgUploadPreview.style.filter = 'invert(' + PIN_DEFAULT + '%)';
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
  effectLevelPin.addEventListener('mouseup', radioChangeFilter);
};
var addEffectsPreviewPhobos = function () {
  filter = 'phobos';
  imgUploadEffectLevel.classList.remove('hidden');
  imgUploadPreview.classList.add('effects__preview--phobos');
  pinValue = PIN_DEFAULT * 3 / 100;
  imgUploadPreview.style.filter = 'blur(' + pinValue + 'px)';
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
  effectLevelPin.addEventListener('mouseup', radioChangeFilter);
};
var addEffectsPreviewHeat = function () {
  filter = 'heat';
  imgUploadEffectLevel.classList.remove('hidden');
  imgUploadPreview.classList.add('effects__preview--heat');
  pinValue = 1 + PIN_DEFAULT * 2 / 100;
  imgUploadPreview.style.filter = 'brightness(' + pinValue + ')';
  imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos');
  effectLevelPin.addEventListener('mouseup', radioChangeFilter);
};

effectChrome.addEventListener('change', addEffectsPreviewChrome);
effectNone.addEventListener('change', addEffectsPreviewNone);
effectSepia.addEventListener('change', addEffectsPreviewSepia);
effectMarvin.addEventListener('change', addEffectsPreviewMarvin);
effectsPhobos.addEventListener('change', addEffectsPreviewPhobos);
effectsheat.addEventListener('change', addEffectsPreviewHeat);

var radioChangeFilter = function () {
  if (filter === 'none') {
    addEffectsPreviewNone();
  } else if (filter === 'chrome') {
    pinValue = effectLevelValue.value / 100;
    imgUploadPreview.style.filter = 'grayscale(' + pinValue + ')';
  } else if (filter === 'sepia') {
    pinValue = effectLevelValue.value / 100;
    imgUploadPreview.style.filter = 'sepia(' + pinValue + ')';
  } else if (filter === 'marvin') {
    imgUploadPreview.style.filter = 'invert(' + effectLevelValue.value + '%)';
  } else if (filter === 'phobos') {
    pinValue = effectLevelValue.value * 3 / 100;
    imgUploadPreview.style.filter = 'blur(' + pinValue + 'px)';
  } else if (filter === 'heat') {
    pinValue = 1 + effectLevelValue.value * 2 / 100;
    imgUploadPreview.style.filter = 'brightness(' + pinValue + ')';
  }
};
var MIN_LENGTH = 0;
var MAX_LENGTH = 20;
var MAX_QUANTITY_OF_HASHTAGS = 5;
var imgUploadText = document.querySelector('.img-upload__text');
var textInputHashtag = imgUploadText.querySelector('.text__hashtags');
textInputHashtag.maxlength = MAX_LENGTH;
textInputHashtag.minlength = MIN_LENGTH;


var getFullHashtags = function (text) {
  var hashtags = text.split(' ');
  return hashtags;
};

var checkHashTag = function () {
  var textLineHashtag = textInputHashtag.value;
  var letters = [];
  var array = getFullHashtags(textLineHashtag);
  if (array.length > MAX_QUANTITY_OF_HASHTAGS) {
    return 'Максимальное количество хэштегов - 5';
  } else if (array[0] === '#') {
    return 'Хэштег не должен состоять только из #';
  }
  for (var t = 0; t < array.length - 1; t++) {
    letters = array[t].split('');
    var idx = array.indexOf(array[t], t + 1);
    if (idx !== -1) {
      return 'один и тот же хэш-тег не может быть использован дважды';
    } else if (array[t] === '#') {
      return 'Хэштег не должен состоять только из #';
    }
    for (var j = 0; j < letters.length; j++) {
      if (letters[j + 1] === '#') {
        return 'Разделите хэштеги пробелом';
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
