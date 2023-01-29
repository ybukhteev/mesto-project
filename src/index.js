import '../pages/index.css';

import {
  profileEditBtn,
  nameInput,
  jobInput,
  profilePopup,
  profileName,
  profileStatus,
  cardPopup,
  formElement
} from './constnts.js';

import {
  enableValidation
} from './constants.js';

// добавил слушателя на событе клик по кнопке редактирования профиля, в качестве коллбэка добавил функцию
profileEditBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  jobInput.value = profileStatus.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  openPopup(profilePopup);  // вызвал функцию открытию popup и в качестве параметра передал ей popup редактирования профиля
});

function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  evt.target.closest('.popup').classList.remove('popup_opened');
  closePopup(cardPopup);
}   

//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 