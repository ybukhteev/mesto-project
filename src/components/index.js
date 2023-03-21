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
  formSubmit,
  profileAvatar,
  popupUpdateAvatar,
  formUpdateAvatar,
  avatarUpdateInput,
  cardsSection
} from './constnts.js';

import { openPopup, closePopup } from './modal.js';
import { addCard, renderCard } from './card';
import { enableValidation } from './validate.js';
import { settings } from './utils.js';

import { getCards, getProfileInfo, addNewCard } from './api.js';

let userId;




// Добавление новой карточки    
export function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  addNewCard(cardUserName.value, cardStatus.value)
    .then(card => renderCard(addCard(card.name, card.link, card.likes, card.owner._id, card._id, userId)))
    .then(() => closePopup(cardPopup))
    .catch(err => console.log(err))
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
  closePopup(profilePopup);
}

//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});

profileAvatar.addEventListener('click', function () {
  openPopup(popupUpdateAvatar);
});

function submitUpdateAvatar(evt) {
  evt.preventDefault();
  const avatarImg = document.querySelector('.profile__avatar');
  avatarImg.src = avatarUpdateInput.value;
  closePopup(popupUpdateAvatar);
}

formUpdateAvatar.addEventListener('submit', submitUpdateAvatar);

enableValidation(settings);

// загрузка с сервера данных пользователя и карточек
Promise.all([getProfileInfo(), getCards()])
  .then(([user, cards]) => {
    updateProfileInfo(user);
    renderCards(cards);
  })
  .catch(err => console.log(err))