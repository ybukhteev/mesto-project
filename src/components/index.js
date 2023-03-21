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
  // Аватар
  profileAvatar,
  avatarPopup,
  formUpdateAvatar,
  avatarUpdateInput,
} from './constnts.js';

import { openPopup, closePopup} from './modal.js';
import { renderCards, handleCardFormSubmit } from './card';
import { clearValidation, enableValidation } from './validate.js';
import { renderLoading, settings} from './utils.js';
import { getUserInfo, getCardList, setUserInfo, setUserAvatar } from './api';

let userId = null;

const fillProfileInfo = () => {
  nameInput.value = profileName.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  jobInput.value = profileStatus.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
}

export const getUserId = () => {
  return userId;
};

const updateUserInfo = ({name, about, avatar, _id}) => {
  userId = _id;
  profileName.textContent = name;
  profileStatus.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

const submitEditProfileForm =(evt) => { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(profilePopup, true);
    setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    
    .then((info) =>{
      updateUserInfo(info);
      closePopup(profilePopup);
    })
    .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
    )
    .finally(() => {
      renderLoading(profilePopup);
    })
}   

const submitEditAvatarForm = (evt) =>{
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
formElement.addEventListener('submit', submitEditProfileForm );

formUpdateAvatar.addEventListener('submit', submitEditAvatarForm);


cardAddBtn.addEventListener('click', function () {
  clearValidation(cardPopup, settings);
  openPopup(cardPopup);
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



  