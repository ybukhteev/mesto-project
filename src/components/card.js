import { cardsTemplate, cardsSection, cardPopup} from './constnts.js';
import { closePopup, openElementPopup } from './modal.js';
import { addCard } from './api.js';
import { renderLoading } from './utils.js';


//  функция рендеринга карточек в контейнере
export const renderCards = (cardsArray) => {
  cardsArray.forEach((card)=> {
    cardsSection.prepend(createCard(card));
  });
};


// Функция создания новой карточки
export const createCard = ({cardName, cardLink, likes, owner, _id}) => {
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');
  
  const deleteButton = cardEl.querySelector('.card__trash');

  const currentUserId = getUserId();
  
  cardEl.querySelector('.card__desc').textContent = cardName;
  cardImg.src = cardLink;
  cardImg.setAttribute('alt', cardName);
  
const updateLikes = (cardEl, likes, currentUserId) => {
  const likeButton = cardEl.querySelector('.card__like');
  const likeCounter = cardEl.querySelector('.card__like-count');

  likeCounter.textContent = likes.length.toString();
  const isLiked = Boolean(likes.find((item) => item.id === currentUserId));
  likeButton.classList.toggle('card__like_active', isLiked)
};

const likeClick = (cardEl, cardId, currentUserId) => {
  const likeButton = cardEl.querySelector('.card__like');
  const isLiked = likeButton.classList.contains('card__like_active');

  changeLikeCardInfo(cardId,isLiked)
    .then((cardData) => {
      updateLikes(cardEl, cardData.likes, currentUserId);
    })
    .catch((err) => {
      console.log(`Ошибка добавления лайка: ${err}`);
    });
  };


  // удаление карточки по клику на иконку
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  cardImg.addEventListener('click', (evt) => {
    openElementPopup(evt.target.src, cardName);
  })

  updateLikes(cardEl, likes, currentUserId);

  likeButton.addEventListener('click', () => {
    likeClick(cardEl, _id, currentUserId);
  })

  return cardEl;
};

export const handleCardSubmit = (evt) => {
  evt.preventDeafault();

  renderLoading(cardPopup, true);

  addCard({
    name: cardName.value,
    link: cardLink.vlaue,
  })
    .then((cardData) => {
      cardsSection.prepend(createCard(cardData));
      closePopup(cardPopup);
      evt.target.reset();
    })
    .catch((err) => console.log(`Ошибка при добавлении новой карточки на сервер: ${err}`))
    .finally(() => {
      renderLoading(cardPopup);
    })
  };