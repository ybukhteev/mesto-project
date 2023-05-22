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
  formAddCard,
  profileAvatar,
  avatarPopup,
  formUpdateAvatar,
  avatarUpdateInput,
  formSubmit
} from './constnts.js';


import { renderLoading, settings } from './utils.js';
import Card from './card';
import Api from './api';
import Popup from './Popup';
import FormValidator from './FormValidator';

let userId = null;



// Cоздал объект config в котром указал URL и заголовки для fetch запросов
// Адрес сервера проекта Mesto: https://mesto.nomoreparties.co
// Передавать токен нужно в каждом запросе

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22', // идентификатор группы plus-cohort-22
  headers: {
    authorization: '8f3ed13c-ae6e-4a59-b837-9d4380da0d56', // токен, котрый нужно передавать при запросе в заголовке authorization
    'Content-Type': 'application/json'
  }
});


const fillProfileInfo = () => {
  nameInput.value = profileName.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  jobInput.value = profileStatus.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
}

export const getUserId = () => {
  return userId;
};

const updateUserInfo = ({ name, about, avatar, _id }) => {
  userId = _id;
  profileName.textContent = name;
  profileStatus.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

const submitEditProfileForm = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(profilePopup, true);
  setUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((info) => {
      updateUserInfo(info);
      closePopup(profilePopup);
    })
    .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
    )
    .finally(() => {
      renderLoading(profilePopup);
    })
}

const submitEditAvatarForm = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(avatarPopup, true);
  setUserAvatar(avatarUpdateInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
      updateUserInfo(res);
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
    )
    .finally(() => {
      renderLoading(avatarPopup);
    })
}

formAddCard.addEventListener('submit', handleCardFormSubmit);

// добавил слушателя на событе клик по кнопке редактирования профиля, в качестве коллбэка добавил функцию
profileEditBtn.addEventListener('click', function () {
  fillProfileInfo();
  clearValidation(profilePopup, settings)
  openPopup(profilePopup);  // вызвал функцию открытию popup и в качестве параметра передал ей popup редактирования профиля
});

//  Функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

formUpdateAvatar.addEventListener('submit', submitEditAvatarForm);


cardAddBtn.addEventListener('click', function () {
  clearValidation(cardPopup, settings);
  openPopup(cardPopup);
  formSubmit.setAttribute('disabled', true);
  formSubmit.classList.add('form__submit_inactive');
});

profileAvatar.addEventListener('click', function () {
  openPopup(avatarPopup);
});

enableValidation(settings);

Promise.all([getUserInfo(), getCardList()])
  .then(([userData, cards]) => {
    updateUserInfo(userData);
    renderCards(cards);
  })
  .catch((err) => console.log(err));



