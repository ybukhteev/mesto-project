import { cardsTemplate, cardsSection} from './constnts.js';
import { openElementPopup } from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://vsegda-pomnim.com/uploads/posts/2022-04/1648761617_81-vsegda-pomnim-com-p-sofiiskie-ozera-arkhiz-foto-86.png'
  },
  { 
    name: 'Мурманская область',
    link: 'https://photocentra.ru/images/main89/892236_main.jpg'
  },
  {
    name: 'Соловки',
    link: 'https://photocentra.ru/images/main47/476758_main.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Москва Сити',
    link: 'https://phonoteka.org/uploads/posts/2021-06/1624353296_15-phonoteka_org-p-moskva-siti-oboi-krasivo-15.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//  функция добавления исходнго массива карточек
function renderInitialCards(cards) {
  cardsSection.innerHTML = '';
  for (let i = 0; i < cards.length; i++) {
    cardsSection.append(addCard(cards[i].name, cards[i].link));
  }
}

renderInitialCards(initialCards);

//  функция рендеринга карточек в контейнере
export function renderCard(card) {
  cardsSection.prepend(card);
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

cardAddBtn.addEventListener('click', function () {
  openPopup(cardPopup);
  document.addEventListener('keydown', closeByEsc);
});


