import { buttonClosePopup, popupList } from './constnts.js';

// добавил функцию открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// добавил функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// зыкрытие popup по клавише ESC
export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

// запуск forEach для прохождения по кнопкам закрытия попапов
buttonClosePopup.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

popupList.forEach((item) => (
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  })
));

