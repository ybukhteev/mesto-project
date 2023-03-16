import { cardsTemplate, cardsSection} from './constnts.js';
import { closePopup, openElementPopup } from './modal.js';
import { addCard } from './api.js';


//  функция рендеринга карточек в контейнере
export const renderCards = (cardsArray) => {
  cardsArray.forEach((card)=> {
    cardsSection.prepend(createCard(card));
  })
}


// Функция создания новой карточки
export const createCard = (cardName, cardLink, likes, owner, _id) => {
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');
  const likeButton = cardEl.querySelector('.card__like');
  const deleteButton = cardEl.querySelector('.card__trash');
  const currentUserId = getUserId();
  cardImg.src = cardLink;
  cardImg.setAttribute('alt', cardName);
  cardEl.querySelector('.card__desc').textContent = cardName;
  

  //  добавление / удаление лайка по клику на соответствующую иконку
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
  // удаление карточки по клику на иконку
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardImg.addEventListener('click', (evt) => {
    openElementPopup(evt.target.src, cardName);
  })

  return cardEl;
};

export const handleCardSubmit = (evt) => {
  evt.preventDeafault();

  addCard({
    name: cardName,
    link: cardLink,
  })
    .then((cardData) => {
      cardsSection.prepend(createCard(cardData));
      closePopup();
      evt.target.reset();
    })
    .catch((err) => console.log(`Ошибка при добавлении новой карточки на сервер: ${err}`))
  };