'use strict';
(function () {
  var photoList = document.querySelector('.pictures'); // контейнер для фото по классу
  var template = document.querySelector('#picture').content;
  var pictureElement = template.querySelector('a');
  var pushDescriptionsInDom = function (photo) {
    for (var j = 0; j < photo.length; j++) {
      var clonedPictureElement = pictureElement.cloneNode(true);
      var quantityOfComment = clonedPictureElement.querySelector('.picture__comments');
      quantityOfComment.textContent = photo[j].window.data.comments.length;
      var quantityOfLikes = clonedPictureElement.querySelector('.picture__likes');
      quantityOfLikes.textContent = photo[j].likes;
      var imgSource = clonedPictureElement.querySelector('img');
      imgSource.src = photo[j].url;
      photoList.appendChild(clonedPictureElement);
    }
  };
  pushDescriptionsInDom(window.data.photoDescriptions);
})();
