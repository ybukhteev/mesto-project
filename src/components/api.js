import { config, getResponse } from "./utils.js";
import { addCard } from "./card.js";

// запрос профиля на сервере
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponse)
    .then((data)=>console.log(data))
  };

// запрос карт на сервере
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(getResponse)
};

/*

запрос на удаление картоки
export const delCard = (cardId) =>{
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers
  })
  .then(getResponse)
  .then((data)=>console.log(data))
}



// запрос на отправку данных нового профиля
export const sendProfileInfo = (name, about) =>{
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    })
  })
  .then(getResponse)
  .then((data)=>console.log(data))
}

// запрос на редактрование аватара

// запрос на добавление карточки  на сервер
export const sendCard = (cardname,cardlink ) => {
   return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      cardname: cardname,
      cardlink: cardlink
    })
  })
  .then(getResponse)
  .then((data)=>console.log(data))
}

// запрос на добавление лайка
export const addLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse)
  .then((data)=>console.log(data));
}

// запрос на удаление лайка
export const delLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse)
  .then((data)=>console.log(data));
}

// запрос на обновление аватара{
export const editProfileAvatar = (avaLink) => {
  return fetch(`${config.baseUrl}/cards/likes/cardId}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avaLink}`
    })
  })
  .then(getResponse)
  .then((data)=>console.log(data));
}

*/