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

const  request = (url, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(getResponse)
}

export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {headers: config.headers})
}

export const setUserInfo = ({name, about}) => {
  return request(`${config.baseUrl}/users/me`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    }) 
  })
}

// Функция запроса для получения карточек с сервера
export const getCardList = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

// Функци запроса для добавления карточки на сервер
export const addCard = ({name, link}) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    }) 
  })
};

// Функция запроса для добавления/удаления лайка 
export const changeLikeCardInfo = (cardId, like) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: like? 'PUT': 'DELETE',
    headers: config.headers
  })
}

// Функция обновления аватара пользователя
export const setUserAvatar = (link) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    }) 
  })
}

export const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}