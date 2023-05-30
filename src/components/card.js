// Объявляю  класс Card
export default class Card {
  // В метод конструктора передается  объект с данными карточки, айди текущего юзера, селектор template-элемента карточки 
  // и объект с тремя обработчиками: открытие попапа с картинкой, лайк
  constructor(cardData, userId, cardTemplateSelector, { previewImage, changeLike, deleteCard }) {
    this.cardData = cardData;
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.owner = cardData.owner._id;
    this._id = cardData._id;
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._previewImage = previewImage;
    this._changeLike = changeLike;
    this._deleteCard = deleteCard;
    this.likeActiveClass = 'card__like_active';

    this._likeClick = this._likeClick.bind(this);
  }

  // Создаю приватный метод для получения готовой разметки перед размещением на страницу
  _getElement() {
    //  Забираю разметку из HTML и клонирую элемент 
    const cardEl = document.querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardEl;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likeClick);

    this._cardImg.addEventListener('click', () => {
      this._previewImage(this.name, this.link);
    })

    if (this._userId === this.owner) {
      this._deleteButton.addEventListener('click', (evt) => {
        this._deleteCard(evt, this._id);
      });
    } else {
      this._deleteButton.remove();
    }
  }

  isLiked() {
    return Boolean(this.likes.find((item) => item._id === this._userId));
  }

  _updateLikes(likes) {
    this.likes = likes;
    this._likeButton.classList.toggle(this.likeActiveClass);
    this._likeCounter.textContent = this.likes.length.toString();
  }

  _likeClick() {
    this._changeLike(this._id, !this.isLiked())
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

    if (this.isLiked()) {
      this._likeButton.classList.add(this.likeActiveClass);
      this._likeCounter.textContent = this.likes.length.toString();
    }

    this._cardImg.alt = this.name;
    this._cardImg.src = this.link;
    this._cardDescription.textContent = this.name;

    this._setEventListeners();

    // Возвращаю элемент в каче стве реузльтата работы метода 
    return this._element;
  }
} 