import { cardsTemplate, cardsSection} from './constnts.js';
import { openElementPopup } from './modal.js';

/*
//  функция добавления исходнго массива карточек
function renderInitialCards(cards) {
  cardsSection.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    cardsSection.append(addCard(cards[i].name, cards[i].link));
  }
}

renderInitialCards(initialCards);
*/

//  функция рендеринга карточек в контейнере
export const renderCards = (cardsArray) => {
  cardsArray.forEach((card)=> {
    cardsSection.prepend(card);
  })
}


// Функция создания новой карточки
export const addCard = (cardName, cardLink, likes, owner, _id) => {
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



