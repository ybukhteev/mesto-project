import {
  cardsSection,
  cardPopup,
  cardUserName,
  cardStatus,
  formCardAdd
} from './constnts';

//  функция добавления исходнго массива карточек
function renderInitialCards(cards) {
  cardsSection.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    cardsSection.append(addCard(cards[i].name, cards[i].link));
  }
}

renderInitialCards(initialCards);

function handleFormSubmitCardAdd(evt) {
  evt.preventDefault();
  renderCard(addCard(cardUserName.value, cardStatus.value));
  cardUserName.value = '';
  cardStatus.value = '';
  closePopup(cardPopup);
}

//  функция рендеринга карточек в контейнере
function renderCard(card) {
  cardsSection.prepend(card);
}


formCardAdd.addEventListener('submit', handleFormSubmitCardAdd);

function addCard(cardName, cardLink) {
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
