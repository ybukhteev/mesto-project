import '../pages/index.css';

import {
  profileEditBtn,
  profileName,
  profileStatus,
  cardAddBtn,
  profileAvatar,
  popupView,
  popupImgsTitle,
  buttonSubmit,
  formEditProfile,
  formEditCard,
  formEditAvatar,
  avatarBox
} from './constnts.js';

import { settings } from './utils.js';

import { showPreloader, hidePreloader } from './utils.js';
import Card from './card';
import Api from './api';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Section from './Section';
import UserInfo from './UserInfo';
import FormValidator from './FormValidator';

let currentUserId;

/*
  document.addEventListener("DOMContentLoaded", () => {
  profilePopup.classList.add("popupTransitions");
  cardPopup.classList.add("popupTransitions");
  imagePopup.classList.add("popupTransitions");
  avatarPopup.classList.add("popupTransitions");
});
*/

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22', // идентификатор группы plus-cohort-22
  headers: {
    authorization: '8f3ed13c-ae6e-4a59-b837-9d4380da0d56', // токен, котрый нужно передавать при запросе в заголовке authorization
    'Content-Type': 'application/json'
  }
});

const profileValidator = new FormValidator(settings, formEditProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(settings, formEditCard);
cardValidator.enableValidation();

const avatarValidator = new FormValidator(settings, formEditAvatar);
avatarValidator.enableValidation();

const user = new UserInfo({
  profileName: profileName,
  profileStatus: profileStatus,
  profileAvatar: profileAvatar
})

function setUserId(userId) {
  currentUserId = userId;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(item, currentUserId, "#card-template", {
      previewImage: (name, link) => {
        imagePopup.open(name, link);
      },
      changeLike: (cardId, like) => {
        return api.changeLikeCardInfo(cardId, like);
      },
      deleteCard: (cardId) => {
        return api.apiDeleteCard(cardId);
      }
    })

    const cardElement = newCard.generate();
    cardList.addItem(cardElement);
  },
},
  '.cards'
);

const profilePopup = new PopupWithForm('.popup_edit-profile', {
  handleSubmitForm: ({ username, status }) => {
    return api.setApiUserInfo({ username, status })
      .then((res) => {
        user.setUserInfo(res);
      });
  },
  showLoader: () => {
    showPreloader(buttonSubmit);
  },
  hideLoader: () => {
    hidePreloader(buttonSubmit);
  }
});
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_update-avatar', {
  handleSubmitForm: (link) => {
    return api.setUserAvatar(link)
      .then((res) => {
        user.setUserInfo(res);
      });
  },
  showLoader: () => {
    showPreloader(buttonSubmit);
  },
  hideLoader: () => {
    hidePreloader(buttonSubmit);
  },
});
avatarPopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_add-card', {
  handleSubmitForm: ({ cardname, url }) => {
    return api.addCard({ cardname, url }).then((newCardData) => {
      cardList.renderNewItem(newCardData);
    });
  },
  showLoader: () => {
    showPreloader(buttonSubmit);
  },
  hideLoader: () => {
    hidePreloader(buttonSubmit);
  },
});
cardPopup.setEventListeners();


const imagePopup = new PopupWithImage({
  popupSelector: '.popup_imgs',
  popupImg: popupView,
  popupImgsTitle: popupImgsTitle
})

imagePopup.setEventListeners();

_deleteCard = (cardElement) => {
  return api.apiDeleteCard(cardElement._id)
    .then(() => {
      cardElement._deleteCard()
        .catch(err => console.log(err))
    })
}

Promise.all([api.getApiUserInfo(), api.getCardList()])
  .then(([userData, cards]) => {
    setUserId(userData._id);
    user.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

avatarBox.addEventListener('click', () => {
  formEditAvatar.reset();
  avatarValidator.resetReopenError();
  avatarValidator.disableReopenButtonSubmit();
  avatarPopup.open();
})

profileEditBtn.addEventListener('click', () => {
  formEditProfile.reset()
  profileValidator.resetReopenError();
  profileValidator.disableReopenButtonSubmit();
  profilePopup.setInputValues(user.getUserInfo());
  profilePopup.open();
})

cardAddBtn.addEventListener('click', () => {
  formEditCard.reset();
  cardValidator.resetReopenError();
  cardValidator.disableReopenButtonSubmit();
  cardPopup.open();
})

