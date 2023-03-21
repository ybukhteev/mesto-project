import { cardsTemplate, cardsSection } from './constnts.js';
import { openElementPopup } from './modal.js';
import { addLikeApi, delLikeApi, delCardApi } from './api.js';

//  Функция рендеринга карточек в контейнере
export function renderCard(card) {
  cardsSection.prepend(card); // Добавляем контейнер с названием и ссылкой в начало блока карточки
}

// Функция добавления лайка
const addLike = (button, counter, idCard) => {
  return addLikeApi(idCard)
    .then((res) => {
      button.classList.add('card__like_active');
      counter.textContent = res.likes.length;
    })
    .catch((err) => { console.log(err) });
};

// Функция удаления лайка
const delLike = (button, counter, idCard) => {
  return delLikeApi(idCard)
    .then((res) => {
      button.classList.remove('card__like_active');
      counter.textContent = res.likes.length;
    })
    .catch((err) => { console.log(err) });
};

export function addCard(cardName, cardLink, likes, idOwner, idCard, userId) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__desc');
  const cardDelete = cardElement.querySelector('.card__trash');
  const cardLike = cardElement.querySelector('.card__like');
  const cardLikeCounter = cardElement.querySelector('.card__like-count');
  const likesArray = Array.from(likes);

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  cardLikeCounter.textContent = likes.length;
  cardElement.id = idCard;



  if (idOwner === userId) {
    cardDelete.remove();
  }

  likesArray.forEach((item) => {
    if (idCard === userId) {
      cardLike.classList.add('card__like_active')
    }
  })



  //  Добавление / удаление лайка по клику на соответствующую иконку
  cardLike.addEventListener('click', function () {
    if (cardLike.classList.contains('card__like_active')) {
      delLike(cardLike, cardLikeCounter, idCard);
    } else {
      addLike(cardLike, cardLikeCounter, idCard);
    }
  });

  // Удаление карточки по клику на иконку корзины
  cardDelete.addEventListener('click', function () {
    delCardApi(idCard)
      .then(() => cardElement.remove())
      .catch((err) => console.log(err))
  });

  cardImage.addEventListener('click', function () {
    openElementPopup(cardLink, cardName);
  })

  return cardElement;
}
