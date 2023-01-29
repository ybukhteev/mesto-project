import { settings } from './utils.js';

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

export const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}; 

const setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  // Найдём в текущей форме кнопку отправки
const buttonElement = formElement.querySelector(settings.submitButtonSelector);
// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
toggleButtonState(inputList, buttonElement);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    toggleButtonState(inputList, buttonElement);
    isValid(formElement, inputElement);
  });
});
}; 

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
