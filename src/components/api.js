// Cоздал объект config в котром указал URL и заголовки для fetch запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '8f3ed13c-ae6e-4a59-b837-9d4380da0d56',
    'Content-Type': 'application/json'
  }
}

// После выполнения запроса на сервер получаем response объект, в котором промис возвращает текущее состояние запроса
// Чтобы получить тело нашего запроса требуется в response объекте вызвать метод.json
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  // Если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция запроса для получения информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers
  })
  .then(getResponse);
}

// Функция запроса для получения карточек с сервера
export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponse);
}

export const addCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    bosy: JSON.stringify({
      name: cardName,
      link: cardLink
    }) 
 })
    .then(getResponse);
};