import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    popupImgsSelector,
    popupImgsTitleSelector,
  }) {
    super(popupSelector);
    this.popup = document.querySelector(popupSelector);
    this.img = this.popup.querySelector(popupImgsSelector);
    this.title = this.popup.querySelector(popupImgsTitleSelector);
  }

  open(name, link) {
    super.open();

    this.img.src = link;
    this.img.alt = name;
    this.title.textContent = name;
  }
}