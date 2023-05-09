// Создал класс Api на основе которого будут создаваться объекты запросов
class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
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

// Универсальная функция запроса с проверкой ответа
const request = (url, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(this.getResponse)
}


// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return request(`${this.baseUrl}/users/me`, { headers: this.headers })
}

export const setUserInfo = ({ name, about }) => {
  return request(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
}

// Функция запроса для получения карточек с сервера
export const getCardList = () => {
  return request(`${this.baseUrl}/cards`, {
    headers: this.headers
  })
}

// Функци запроса для добавления карточки на сервер
export const addCard = ({ name, link }) => {
  return request(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
};

// Функция запроса для добавления/удаления лайка 
export const changeLikeCardInfo = (cardId, like) => {
  return request(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: like ? 'PUT' : 'DELETE',
    headers: this.headers
  })
}

// Функция обновления аватара пользователя
export const setUserAvatar = (link) => {
  return request(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
}

export const deleteCard = (cardId) => {
  return request(`${this.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  })
}
