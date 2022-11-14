const profileEditBtn = document.querySelector('.profile__name-edit');  //  нашел кнопку редактирования профиля 
const profilePopup = document.querySelector('.popup__edit-profile');  //  нашел попап редактирования профиля
const cardAddBtn = document.querySelector('.profile__add-btn');  //  нашел кнопку добавления профиля
const cardPopup = document.querySelector('.popup__add-card');  //  нашел окно для добавления карточки 

const profileName = document.querySelector('.profile__name'); //  нашел поле ввода имени
const profileStatus = document.querySelector('.profile__status');  // нашел поле ввода профессии

//  функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//  добавил слушатель событий на кнопку редактирования профиля, передал в него 2 пармаетра - клик и коллбэк
profileEditBtn.addEventListener('click', function () {
  openPopup(profilePopup);
});

//  добавил слушатель событий на кнопку добавления профиля, переда в него 2 параметра - клик и коллбэк
cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});

const closePopupButton = document.querySelectorAll('.popup__close');  // нашел кнопку закрытия попапа

// запустил 
closePopupButton.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    const openModals = evt.target.closest('.popup');
    openModals.classList.remove('popup_opened');
  })
})


const formElement = document.querySelector('.popup__form'); //
// Находим поля формы в DOM
let nameInput = document.querySelector('#username');
let jobInput = document.querySelector('#status');


//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  evt.target.closest('.popup').classList.remove('popup_opened');
}   
