'use strict';
(function () {
  var photoList = document.querySelector('.pictures'); // контейнер для фото по классу
  var template = document.querySelector('#picture').content;
  var pictureElement = template.querySelector('a');
  var pushDescription = function (photo) {
    var clonedPictureElement = pictureElement.cloneNode(true);
    var quantityOfComment = clonedPictureElement.querySelector('.picture__comments');
    quantityOfComment.textContent = photo.comments.length;
    var quantityOfLikes = clonedPictureElement.querySelector('.picture__likes');
    quantityOfLikes.textContent = photo.likes;
    var imgSource = clonedPictureElement.querySelector('img');
    imgSource.src = photo.url;
    photoList.appendChild(clonedPictureElement);
    var photoClickHandler = function () {
      window.preview.getBigPicture(photo);
    };
    clonedPictureElement.addEventListener('click', photoClickHandler);
  };
  var pushDescriptionsInDom = function (photo) {
    for (var j = 0; j < photo.length; j++) {
      pushDescription(photo[j]);
    }
  };
  window.request(pushDescriptionsInDom);
})();
