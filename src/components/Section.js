export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this.container = document.querySelector(selector);
  }

  renderNewItem(item) {
    this._renderer(item);
  }

  renderItems(cardsArr) {
    this._items = cardsArr;
    cardsArr.reverse().forEach((item) => this._renderer(item));
  }

  addItem(elem) {
    this.container.prepend(elem);
  }
}
