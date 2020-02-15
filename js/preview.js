'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = window.data.photoDescriptions.response[0].url;
  bigPicture.querySelector('.likes-count').textContent = window.data.photoDescriptions.response[0].likes;
  bigPicture.querySelector('.comments-count').textContent = window.data.photoDescriptions.response[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = window.data.photoDescriptions.response[0].description;
  var commentList = document.querySelector('.social__comments');
  for (var k = 0; k < window.data.photoDescriptions.response[0].comments.length; k++) {
    var commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentList. appendChild(commentItem);
    var socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = window.data.photoDescriptions.response[0].comments[k].avatar;
    socialPicture.alt = window.data.photoDescriptions.response[0].comments[k].name;
    commentItem.appendChild(socialPicture);
    var textComment = document.createElement('p');
    textComment.textContent = window.data.photoDescriptions.response[0].comments[k].message;
    commentItem.appendChild(textComment);
  }
  window.preview = {
    bigPicture: bigPicture
  };
})();
