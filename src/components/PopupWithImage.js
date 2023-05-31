import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    popupImg,
    popupImgsTitle,
  }) {
    super(popupSelector);
    this.img = popupImg;
    this.title = popupImgsTitle;
  }

  open(name, link) {
    super.open();

    this.img.src = link;
    this.img.alt = name;
    this.title.textContent = name;
  }
}