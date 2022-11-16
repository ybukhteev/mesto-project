const profileEditBtn = document.querySelector('.profile__name-edit');  //  нашел кнопку редактирования профиля 
const profilePopup = document.querySelector('.popup__edit-profile');  //  нашел попап редактирования профиля
const cardPopup = document.querySelector('.popup__add-card');  //  нашел окно для добавления карточки
const cardAddBtn = document.querySelector('.profile__add-btn');  //  нашел кнопку добавления профиля
const closePopupButton = document.querySelectorAll('.popup__close');  // нашел кнопку закрытия попапа
const profileName = document.querySelector('.profile__name'); //  нашел поле ввода имени
const profileStatus = document.querySelector('.profile__status');  // нашел поле ввода профессии
const popupImgs = document.querySelector('.popup__imgs');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

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


// закрытие попап
closePopupButton.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
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

//  функция создания карточки
function addCard(cardName, cardLink) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  cardEl.querySelector('.card__img').src = cardLink;
  cardEl.querySelector('.card__desc').textContent = cardName;
//  функция добавления/удаления лайка
  cardEl.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
//  функция добавления/удаления лайка
  });
  cardEl.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardEl.querySelector('.card__img').addEventListener('click', (evt) => {
    openPopupImage(evt.target.src, cardName);
  })

  function openPopupImage(imageLink, name) {
    openPopup(popupImgs);
    popupImgs.querySelector('.popup__view').src = imageLink;
  };

  return(cardEl);
}

//  функция добавления исходнго массива карточек
function baseCard(cards) {
  document.querySelector('.cards').innerHTML = '';
  for (let i = 0;  i < cards.length; i++) {
    document.querySelector('.cards').append(addCard(cards[i].name, cards[i].link));
  }
}
baseCard(initialCards);

//  функция рендеринга карточек в контейнере
function renderHasImage(card) {
  document.querySelector('.cards').prepend(card);
}

const formCardAdd = cardPopup.querySelector('.popup__form');
formCardAdd.addEventListener('submit', handleFormSubmitCardAdd);

function handleFormSubmitCardAdd (evt) {
  evt.preventDefault();
  renderHasImage(
    addCard(
      cardPopup.querySelector('.form__input[name="username"]').value,
      cardPopup.querySelector('.form__input[name="status"]').value
    )
  );
  evt.target.closest('.popup').classList.remove('popup_opened');
}
