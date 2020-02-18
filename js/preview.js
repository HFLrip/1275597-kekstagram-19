'use strict';
(function () {
  var getBigPicture = function (photo) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    var commentList = document.querySelector('.social__comments');
    for (var k = 0; k < photo.comments.length; k++) {
      var commentItem = document.createElement('li');
      commentItem.classList.add('social__comment');
      commentList. appendChild(commentItem);
      var socialPicture = document.createElement('img');
      socialPicture.classList.add('social__picture');
      socialPicture.src = photo.comments[k].avatar;
      socialPicture.alt = photo.comments[k].name;
      commentItem.appendChild(socialPicture);
      var textComment = document.createElement('p');
      textComment.textContent = photo.comments[k].message;
      commentItem.appendChild(textComment);
    }
  };
  window.preview = {
    getBigPicture: getBigPicture,
  };
})();
