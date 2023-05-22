// Объявляю  класс Card
export default class Card {
  // В метод конструктора передается  объект с данными карточки, айди текущего юзера, селектор template-элемента карточки 
  // и объект с тремя обработчиками: открытие попапа с картинкой, лайк
  constructor(cardData, userId, cardTemplateSelector, { previewImage, likeClick, deleteCard }) {
    this.cardData = cardData;
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.owner = cardData.owner;
    this._id = cardData._id;
    this._userId = userId;
    this.cardtTemplateSelector = cardTemplateSelector;

    this._previewImage = previewImage;
    this._likeClick = likeClick;
    this._deleteCard = deleteCard;

    this.likeActiveClass = 'card__like_active ';
  }

  // Создаю приватный метод для получения готовой разметки перед размещением на страницу
  _getElement() {
    //  Забираю разметку из HTML и клонирую элемент 
    const cardEl = document
      .querySelector(this.cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    //  Возвращаю DOM-элемент карточки  
    return cardEl;
  }

  _setEventlistener() {
    this._likeButton.addEventListener('click', (evt) => {
      this._likeClick(evt);
    });

    this._cardImg.addEventListener('click', () => {
      this._previewImage(this.name, this.link);
    })

    if (this._userId === this.owner) {
      this._deleteButton.addEventListener('click', (evt) => {
        this._deleteCard(evt.target, this._id);
      });
    } else {
      this._deleteButton.remove();
    }
  }

  _updateLikes() {
    this.likeCounter.textContent = this.likes.length.toString();
    this.isLiked = Boolean(this.likes.find((item) => item.id === this.userId));
    this.likeButton.classList.toggle(this.likeActiveClass,)
  }

  _likeClick() {
    changeLikeCardInfo(this._id, !isLiked)
      .then((cardData) => {
        this._updateLikes(cardData.likes);
      })
      .catch((err) => {
        console.log(`Ошибка добавления лайка: ${err}`);
      })
  }

  generate() {
    // Запишу разметку в приватное поле _element, чтобы у других элементов появился к ней доступ
    this._element = this._getElement();

    this._cardImg = this._element.querySelector('.card__img');
    this._cardDescription = this._element.querySelector('.card__desc');
    this._likeCounter = this._element.querySelector('.card__like_count');
    this._likeButton = this._element.querySelector('.card__like');
    this._deleteButton = this._element.querySelector('.card__trash');

    this.cardImg.alt = this._name;
    this.cardImg.src = this._link;
    this._cardDescription.textContent = this._name;

    // Возвращаю элемент в качестве реузльтата работы метода 
    return this._element;
  }
}   