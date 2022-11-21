const profileEditBtn = document.querySelector('.profile__name-edit');  //  нашел кнопку редактирования профиля 
const profilePopup = document.querySelector('.popup_edit-profile');  //  нашел попап редактирования профиля
const cardPopup = document.querySelector('.popup_add-card');  //  нашел окно для добавления карточки
const cardAddBtn = document.querySelector('.profile__add-btn');  //  нашел кнопку добавления профиля
const buttonClosePopup = document.querySelectorAll('.popup__close');  // нашел кнопку закрытия попапа
const profileName = document.querySelector('.profile__name'); //  нашел поле ввода имени
const profileStatus = document.querySelector('.profile__status');  // нашел поле ввода профессии
const popupImgs = document.querySelector('.popup_imgs');  //  нашел попап отображения картинки
const popupImgsBox = document.querySelector('.popup_imgs__container');  // нашел контейнер содержимого попапа с отобраением картки
const popupView = document.querySelector('.popup__view');
const cardsTemplate = document.querySelector('#card-template').content;
const popupImgsTitle = document.querySelector('.popup_imgs__title');
const cardsSection = document.querySelector('.cards');
const cardUserName = cardPopup.querySelector('.form__input[name="username"]');
const cardStatus = cardPopup.querySelector('.form__input[name="status"]');

//  функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//  добавил слушатель событий на кнопку редактирования профиля, передал в него 2 пармаетра - клик и коллбэк
profileEditBtn.addEventListener('click', function () {
  openPopup(profilePopup);
});

//  добавил слушатель событий на кнопку добавления профиля, переда в него 2 параметра - клик и коллбэк
cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});



// запуск forEach для прохождения по кнопкам закрытия попапов
buttonClosePopup.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})


const formElement = document.querySelector('.formEditProfile'); //
// Находим поля формы в DOM
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#status');
nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;


//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  evt.target.closest('.popup').classList.remove('popup_opened');
  closePopup(cardPopup);
  
}   

//  функция сохранения данных в форму профиля
formElement.addEventListener('submit', submitEditProfileForm);

//  функция создания карточки
function addCard(cardName, cardLink) {
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  cardEl.querySelector('.card__img').src = cardLink;
  cardEl.querySelector('.card__desc').textContent = cardName;
  cardEl.querySelector('.card__img').setAttribute('alt', cardName);

  //  добавление / удаление лайка по клику на соответствующую иконку
  cardEl.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
  // удаление карточки по клику на иконку
  cardEl.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardEl.querySelector('.card__img').addEventListener('click', (evt) => {
    openElementPopup(evt.target.src, cardName);
  })

  return (cardEl);
}

// ПОПАП КАРТИНКИ
// Функция открытия попап с картинкой
function openElementPopup(cardLink, cardName) {
  openPopup(popupImgs);
  popupImgsTitle.textContent = cardName;
  popupView.src = cardLink;
  popupView.alt = cardName;
}

//  функция добавления исходнго массива карточек
function renderInitialCards(cards) {
  cardsSection.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    cardsSection.append(addCard(cards[i].name, cards[i].link));
  }
}
renderInitialCards(initialCards);

//  функция рендеринга карточек в контейнере
function renderCard(card) {
  cardsSection.prepend(card);
}

const formCardAdd = cardPopup.querySelector('.formEditProfile');
formCardAdd.addEventListener('submit', handleFormSubmitCardAdd);

function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCard(addCard(cardUserName.value, cardStatus.value));
  cardUserName.value = '';
  cardStatus.value = '';
  closePopup(cardPopup);
}