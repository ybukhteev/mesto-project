import '../pages/index.css';

import {
  profileEditBtn,
  nameInput,
  jobInput,
  profilePopup,
  profileName,
  profileStatus,
  cardPopup,
  formElement,
  cardAddBtn,
  cardUserName,
  cardStatus,
  formAddCard,
  formSubmit
} from './constnts.js';


import { openPopup, closePopup, closeByEsc} from './modal.js';
import { addCard, renderCard } from './card';
import { enableValidation } from './validate.js';
import { settings} from './utils.js';


function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCard(addCard(cardUserName.value, cardStatus.value));
  cardUserName.value = '';
  cardStatus.value = '';
  closePopup(cardPopup);
  formSubmit.setAttribute('disabled', true);
  formSubmit.classList.add('form__submit_inactive');
}

formAddCard.addEventListener('submit', handleFormSubmitCardAdd);

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

cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
  document.addEventListener('keydown', closeByEsc);
});

enableValidation(settings);