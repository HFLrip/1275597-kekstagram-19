'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.ESC_KEY) {
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
    if (evt.key === window.data.ESC_KEY) {
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
  var scaleOfImg = window.data.SCALE_DEFAULT;
  scaleControlValue.value = window.data.SCALE_DEFAULT + ' %';
  var scaleControlSmaller = editingForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = editingForm.querySelector('.scale__control--bigger');
  var imgUploadPreviewContainer = editingForm.querySelector('.img-upload__preview');
  var imgUploadPreview = imgUploadPreviewContainer.querySelector('img');

  var buttonScaleControlBigger = function () {
    if (scaleOfImg < window.data.SCALE_DEFAULT) {
      scaleOfImg += window.data.SCALE_STEP;
      scaleControlValue.value = scaleOfImg + ' %';
      imgUploadPreview.style.transform = 'scale(' + (scaleOfImg / 100) + ')';
    }
  };
  var buttonScaleControlSmaller = function () {
    if (scaleOfImg > window.data.SCALE_STEP) {
      scaleOfImg -= window.data.SCALE_STEP;
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
  var pinValue = window.data.PIN_DEFAULT;
  imgUploadEffectLevel.classList.add('hidden');

  var addEffectsPreviewChrome = function () {
    filter = 'chrome';
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadPreview.classList.add('effects__preview--chrome');
    pinValue = window.data.PIN_DEFAULT / 100;
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
    pinValue = window.data.PIN_DEFAULT / 100;
    imgUploadPreview.style.filter = 'sepia(' + pinValue + ')';
    imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevelPin.addEventListener('mouseup', radioChangeFilter);
  };
  var addEffectsPreviewMarvin = function () {
    filter = 'marvin';
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadPreview.classList.add('effects__preview--marvin');
    imgUploadPreview.style.filter = 'invert(' + window.data.PIN_DEFAULT + '%)';
    imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevelPin.addEventListener('mouseup', radioChangeFilter);
  };
  var addEffectsPreviewPhobos = function () {
    filter = 'phobos';
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadPreview.classList.add('effects__preview--phobos');
    pinValue = window.data.PIN_DEFAULT * 3 / 100;
    imgUploadPreview.style.filter = 'blur(' + pinValue + 'px)';
    imgUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--heat');
    effectLevelPin.addEventListener('mouseup', radioChangeFilter);
  };
  var addEffectsPreviewHeat = function () {
    filter = 'heat';
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadPreview.classList.add('effects__preview--heat');
    pinValue = 1 + window.data.PIN_DEFAULT * 2 / 100;
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
})();
