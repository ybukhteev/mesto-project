const editPopupButton = document.querySelector('.profile__name-edit');
const popup = document.querySelector('.popup');

const closePopupButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editPopupButton.addEventListener('click', function () {
  openPopup(popup);
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', function () {
  closePopup(popup);
});

// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = popup.querySelector('#username'); // Воспользуйтесь инструментом .querySelector()
const jobInput = popup.querySelector('#status');  // Воспользуйтесь инструментом .querySelector()

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popup);
}

