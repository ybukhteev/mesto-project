import { cardsTemplate, cardsSection, cardPopup, popupImgs, popupView, popupImgsTitle, cardUserName, cardStatus } from './constnts.js';
import { closePopup, openPopup } from './modal.js';
import { addCard, changeLikeCardInfo, deleteCard } from './Api.js';
import { renderLoading } from './utils.js';
import { getUserId } from './index.js';

//  функция рендеринга карточек в контейнере
export const renderCards = (cards) => {
  cards.forEach((card) => {
    cardsSection.prepend(createCard(card));
  });
};

// Функция открытия попапа картинки
const previewImage = (data) => {
  popupView.src = data.link;
  popupImgs.alt = data.name;
  popupImgsTitle.textContent = data.name;
  openPopup(popupImgs);
}

const updateLikes = (cardEl, likes, currentUserId) => {
  const likeButton = cardEl.querySelector('.card__like');
  const likeCounter = cardEl.querySelector('.card__like-count');

  likeCounter.textContent = likes.length.toString();
  const isLiked = Boolean(likes.find((item) => item._id === currentUserId));
  likeButton.classList.toggle('card__like_active', isLiked)
};

const likeClick = (cardEl, cardId, currentUserId) => {
  const likeButton = cardEl.querySelector('.card__like');
  const isLiked = likeButton.classList.contains('card__like_active');
  changeLikeCardInfo(cardId, !isLiked)
    .then((cardData) => {
      updateLikes(cardEl, cardData.likes, currentUserId);
    })
    .catch((err) => {
      console.log(`Ошибка добавления лайка: ${err}`);
    });
};


// Функция создания новой карточки
export const createCard = ({ name, link, likes, owner, _id }) => {
  const cardEl = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');

  const likeButton = cardEl.querySelector('.card__like');

  const deleteBtn = cardEl.querySelector('.card__trash');

  const currentUserId = getUserId();

  deleteBtn.classList.toggle(
    'card__trash_hidden',
    owner._id !== currentUserId
  )

  cardEl.querySelector('.card__desc').textContent = name;
  cardImg.src = link;

  cardImg.addEventListener('click', () => {
    previewImage({ name, link })
  });

  updateLikes(cardEl, likes, currentUserId);

  likeButton.addEventListener('click', () => {
    likeClick(cardEl, _id, currentUserId);
  });

  deleteBtn.addEventListener('click', () => {
    deleteCard(_id)
      .then(() => {
        cardEl.remove()
      })
      .catch((err) => console.log(err))
  })

  return cardEl;
};

export const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(cardPopup, true);
  addCard({
    name: cardUserName.value,
    link: cardStatus.value,
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