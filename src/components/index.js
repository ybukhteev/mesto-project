import '../pages/index.css';

import {
  profileEditBtn,
  nameInput,
  jobInput,
  profileName,
  profileStatus,
  formElement,
  cardAddBtn,
  formAddCard,
  profileAvatar,
  formUpdateAvatar,
  avatarUpdateInput,
  formSubmit,
  popupImgs,
  cardPopup
} from './constnts.js';


import { renderLoading, settings } from './utils.js';
import Card from './card';
import Api from './api';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import FormValidator from './FormValidator';
import Section from './Section';
import UserInfo from './UserInfo';

let currentUserId;



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

function setUserId(userId) {
  currentUserId = userId;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(item, currentUserId, "#card-template", {
      previewImage: (name, link) => {
        popupImgs.open(name, link);
      },
      likeClick: (cardId) => {
        return api.changeLikeCardInfo(cardId);
      },
      deleteCard: (cardId) => {
        return api.deleteCard(cardId);
      }
    })

    const cardElement = newCard.generate();
    cardList.addItem(cardElement);
  },
},
  '.card'
);

const user = new UserInfo({
  profileName: profileName,
  profileStatus: profileStatus,
  profileAvatar: profileAvatar
})

const likeClick = (cardEl) => {
  if (cardEl.getLike()) {
    api.changeLikeCardInfo(cardEl, like)
  }
}

function deleteCard(cardId) {
  api.deleteCard(cardId)
}

function previewImage() {
  popupImgs.open(this.name, this.link);
}

const profilePopup = new PopupWithForm('.popup_edit-profile', {
  submitEditForm: ({ name, about }) => {
    return api.setApiUserInfo(name, about)
      .then((res) => {
        user.setUserInfo(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
});

profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_update-avatar', {
  submitEditForm: ({ avatar }) => {
    return api.setUserAvatar(avatar)
      .then((res) => {
        user.setUserInfo(res);
      })
  }
})

avatarPopup.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: '.popup_imgs__container',
  popupImgsSelector: '.popup__view',
  popupImgsTitleSelector: '.popup_imgs__title'
})

imagePopup.setEventListeners();

Promise.all([api.getApiUserInfo(), api.getCardList()])
  .then(([userData, cards]) => {
    setUserId(userData._id);
    user.setUserInfo(userData);
    console.log(cardList);
    cardList.renderItems(cards);

  })
  .catch((err) => console.log(err));

profileAvatar.addEventListener('click', () => {
  formUpdateAvatar.reset();
  avatarPopup.open();
})

profileEditBtn.addEventListener('click', () => {
  profilePopup.open();
})

cardAddBtn.addEventListener | ('click', () => {
  cardPopup.open();
})