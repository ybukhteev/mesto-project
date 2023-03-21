// Опциональный объект fetch запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '8f3ed13c-ae6e-4a59-b837-9d4380da0d56',
    'Content-Type': 'application/json'
  }
}

// Получение ответа от сервера
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Метод fetch создает запрос на сервер и возвращает его ответ 
// На вход fetch принимает 2 аргумерта; первый - обязательный - url запрашиваемого ресурса 
// Второй аругумент не обязательный - это опциональный обект


// Запрос на загрузку данных профиля с сервера
export const getProfileInfo = () => {
  // Метод fetch асинхронный, когда его вызывают он создает промис, а когда получает ответ, переводит промис в нужный статус
  // Ответ от сервера при этом записывается в промис, так что его можно использовать через then и catch
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponse)
};

// Запрос на загрузку карточек с сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponse)
};

// Fetch запрос к серверу для отправки данных новой карточки
export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(getResponse)
}

// Запрос на удаление карточки с вервера
export const delCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponse)
}


// Запрос на отправку данных нового профиля
export const sendProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    })
  })
    .then(getResponse)
}


// Запрос на добавление карточки  на сервер
export const sendCard = (cardname, cardlink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      cardname: cardname,
      cardlink: cardlink
    })
  })
    .then(getResponse)
}

// Запрос на добавление лайка
export const addLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getResponse)
}

// Запрос на удаление лайка
export const delLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponse)
}

// Запрос на обновление аватара
export const editProfileAvatar = (avaLink) => {
  return fetch(`${config.baseUrl}/cards/likes/cardId}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avaLink}`
    })
  })
    .then(getResponse)
}