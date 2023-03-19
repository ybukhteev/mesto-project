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
} from './constnts.js';

import { openPopup, closePopup} from './modal.js';
import { renderCards } from './card';
import { enableValidation } from './validate.js';
import { renderLoading, settings} from './utils.js';
import { getUserInfo, getCardList, setUserInfo } from './api';

let userId;

const fillProfileInfo = () => {
  nameInput.value = profileName.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  jobInput.value = profileStatus.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
}

export const getUserId = () => {
  return userId;
};

const updateUserInfo = ( {name, about, avatar, _id} ) => {
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

function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCards(addCard(cardUserName.value, cardStatus.value));
  evt.target.reset();
  closePopup(cardPopup);
  formSubmit.setAttribute('disabled', true);
  formSubmit.classList.add('form__submit_inactive');
}

const submitEditAvatarForm = (evt) =>{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(popupUpdateAvatar, true);

  setUserAvatar({
    avatar:  avatarUpdateInput.value,
  })
    .then((data) => {
      updateUserInfo(data);
      closePopup(popupUpdateAvatar);
    })
    .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
    )
    .finally(() => {
      renderLoading(popupUpdateAvatar);
    })
}

formAddCard.addEventListener('submit', handleFormSubmitCardAdd);

// добавил слушателя на событе клик по кнопке редактирования профиля, в качестве коллбэка добавил функцию
profileEditBtn.addEventListener('click', function () {
  fillProfileInfo();
  openPopup(profilePopup);  // вызвал функцию открытию popup и в качестве параметра передал ей popup редактирования профиля
});

//  Функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm, submitEditAvatarForm);


cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});


profileAvatar.addEventListener('click', function () {
  openPopup(popupUpdateAvatar);
});

enableValidation(settings);

Promise.all([getUserInfo(), getCardList()])
  .then(([userData, cards]) => {
    updateUserInfo(userData);
    renderCards(cards);
  })
  .catch((err) => console.log(err));



  