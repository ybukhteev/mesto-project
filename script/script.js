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
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopup(profilePopup);
});


const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#status');

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}; 


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
}; 


const setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
const inputList = Array.from(formElement.querySelectorAll(`.form__input`));
  // Найдём в текущей форме кнопку отправки
const buttonElement = formElement.querySelector('.form__submit');

toggleButtonState(inputList, buttonElement);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement);

          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement);
  });
});
}; 


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid); 

// Вызовем функцию
enableValidation(); 



//  добавил слушатель событий на кнопку добавления профиля, переда в него 2 параметра - клик и коллбэк
cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
});

// запуск forEach для прохождения по кнопкам закрытия попапов
buttonClosePopup.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

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
  const cardImg = cardEl.querySelector('.card__img');
  cardImg.src = cardLink;
  cardImg.setAttribute('alt', cardName);
  cardEl.querySelector('.card__desc').textContent = cardName;
  

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