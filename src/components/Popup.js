export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(this.popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener(keydown, this._handleEscClose)
  }

  setEventListeners() {
    this.popup.addEventListener("mousedown", this._handleOverlayClose);
  }
}