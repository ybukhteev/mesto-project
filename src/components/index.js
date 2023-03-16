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




import { openPopup, closePopup} from './modal.js';
import { addCard, renderCards } from './card';
import { enableValidation } from './validate.js';
import { settings} from './utils.js';
import { getUserInfo, getCardList } from './api';

let userId;

const  fillProfileInfo = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

const getUserId = () => {
  return userId;
};

const updateUserInfo = ( {name, about, avatar, _id} ) => {
  userId = _id;
  profileName.textContent = name;
  profileStatus.textContent = about;
  //avatar
};


function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCard(addCard(cardUserName.value, cardStatus.value));
  evt.target.reset();
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
    setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    })
    .then((data) =>{
      updateUserInfo(data);
      closePopup(profilePopup);
    })
    .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
    )
}   

//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});

enableValidation(settings);

Promise.all([getUserInfo(), getCardList()])
  .then(([cards,userData]) => {
    updateUserInfo(userData);
    renderCards(cards);
  })
  .catch((err) => console.log(err));
