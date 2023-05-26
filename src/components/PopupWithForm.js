import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitEditForm) {
    super(popupSelector);
    this.popup = document.querySelector(popupSelector);
    this.form = this.popup.querySelector('.form');
    this.submitEditeForm = submitEditForm;
    this._inputList = this.form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this.forms = {};
    this._inputList.forEach((input) =>
      this.forms[input.name] = input.value);

    return this.forms;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submitHandler(evt, this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
    this.form.reset();
  }
}