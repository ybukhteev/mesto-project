export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(this.popupSelector);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners() {
    this.popup.addEventListener("mousedown", this._handleOverlayClose);
  }
}