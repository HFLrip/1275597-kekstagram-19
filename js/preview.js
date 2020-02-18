'use strict';
(function () {
  var getBigPicture = function (photo) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').src = photo[0].url;
    bigPicture.querySelector('.likes-count').textContent = photo[0].likes;
    bigPicture.querySelector('.comments-count').textContent = photo[0].comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo[0].description;
    var commentList = document.querySelector('.social__comments');
    for (var k = 0; k < photo[0].comments.length; k++) {
      var commentItem = document.createElement('li');
      commentItem.classList.add('social__comment');
      commentList. appendChild(commentItem);
      var socialPicture = document.createElement('img');
      socialPicture.classList.add('social__picture');
      socialPicture.src = photo[0].comments[k].avatar;
      socialPicture.alt = photo[0].comments[k].name;
      commentItem.appendChild(socialPicture);
      var textComment = document.createElement('p');
      textComment.textContent = photo[0].comments[k].message;
      commentItem.appendChild(textComment);
    }
  };
  window.request(getBigPicture);
  window.preview = {
    getBigPicture: getBigPicture,
  };
})();
