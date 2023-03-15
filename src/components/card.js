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

export function addCard(cardName, cardLink) {
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');
  cardImg.src = cardLink;
  cardImg.setAttribute('alt', cardName);
  cardEl.querySelector('.card__desc').textContent = cardName;
  

  //  добавление / удаление лайка по клику на соответствующую иконку
  cardEl.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
  // удаление карточки по клику на иконку
  cardEl.querySelector('.card__trash').addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardEl.querySelector('.card__img').addEventListener('click', (evt) => {
    openElementPopup(evt.target.src, cardName);
  })

  return(cardEl);
}



