export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderNewItem(item) {
    this._renderer(item);
  }

  renderItems(cardsArr) {
    this._items = cardsArr;
    cardsArr.reverse().forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(elem) {
    this._container.prepend(elem);
  }
}
