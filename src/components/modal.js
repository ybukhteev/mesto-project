// добавил функцию открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// добавил функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// зыкрытие popup по клавише ESC
function closeByEsc(evt) {
  if ( evt.keyCode === 27) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

// запуск forEach для прохождения по кнопкам закрытия попапов
buttonClosePopup.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

popupList.forEach(item => (
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  })
));

cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
  document.addEventListener('keydown', closeByEsc);
});

// ПОПАП КАРТИНКИ
// Функция открытия попап с картинкой
function openElementPopup(cardLink, cardName) {
  openPopup(popupImgs);
  popupImgsTitle.textContent = cardName;
  popupView.src = cardLink;
  popupView.alt = cardName;
}