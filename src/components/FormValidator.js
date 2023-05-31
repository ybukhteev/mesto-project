export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    // Найдём в текущей форме кнопку отправки
    this.buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputElement) {
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
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }


  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this.errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    this.errorElement.classList.add(this.settings.errorClass);
    this.errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    this.errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    this.errorElement.classList.remove(this.settings.errorClass);
    this.errorElement.textContent = '';
  }

  resetReopenError() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  disableReopenButtonSubmit() {
    this.buttonElement.setAttribute('disabled', true);
    this.buttonElement.classList.add(this.settings.inactiveButtonClass);
  }

}