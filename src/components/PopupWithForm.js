import Popup from './Popup';

export default class PopupWithForm extends Popup {
  consstructor(popupSelector, { submitEditForm, showLoader, hideLoader }) {
    this.popup = document.querySelector(popupSelector);
    this.form = this.popup.querySelector('.form');
    this.submitEditeForm = submitEditForm;
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  _getInputValues() {
    this.forms = {};
    this._inputList.forEach((input) =>
      this.forms[input.name] = input.value)
    );

    return this.forms;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.showLoader();
    this._submitHandler(this._getInputValues())
      .then(this.close())
      .catch((err) => {
        console.log(`Ошибка при отправке обновленных данных пользователя: ${err.message}`);
      })
      .finnaly(() => {
        this.hideLoader();
      });
  }

  setEventListeners() {
    super.setEventListeners();
    this._inputList = this.form.querySelectorAll('.form__input');
    this.form.addEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
    this.form.reset();
  }
}