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
const formElement = document.querySelector('.form');
const inputElement = formElement.querySelector('.form__input');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const popupList = document.querySelectorAll('.popup');

// добавил функцию открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// добавил функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// добавил слушателя на событе клик по кнопке редактирования профиля, в качестве коллбэка добавил функцию
profileEditBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  jobInput.value = profileStatus.textContent; // добавил в содержимое элемента строковое значение, представляющее значение текущего узла
  openPopup(profilePopup);  // вызвал функцию открытию popup и в качестве параметра передал ей popup редактирования профиля
});

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.add('form__input-error_active');
  inputElement.classList.add('form__input_type_error');
  
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}; 


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {
  // теперь, если ошибка вызвана регулярным выражением,
      // переменная validationMessage хранит наше кастомное сообщение
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
const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  // Найдём в текущей форме кнопку отправки
const buttonElement = formElement.querySelector('.form__submit');
// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
toggleButtonState(inputList, buttonElement);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    toggleButtonState(inputList, buttonElement);
    isValid(formElement, inputElement);

          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
   
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

// Вызовем функцию
enableValidation(); 



//  добавил слушатель событий на кнопку добавления профиля, переда в него 2 параметра - клик и коллбэк
cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
  document.addEventListener('keydown', closeByEsc);
});

// запуск forEach для прохождения по кнопкам закрытия попапов
buttonClosePopup.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

// зыкрытие popup по клавише ESC
function closeByEsc(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if ( evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

popupList.forEach(item => (
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  })
));

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

  return(cardEl);
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

const formCardAdd = cardPopup.querySelector('.formAddCard');
formCardAdd.addEventListener('submit', handleFormSubmitCardAdd);

function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCard(addCard(cardUserName.value, cardStatus.value));
  cardUserName.value = '';
  cardStatus.value = '';
  closePopup(cardPopup);
}