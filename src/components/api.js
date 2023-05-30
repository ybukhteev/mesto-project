// Создал класс Api на основе которого будут создаваться объекты запросов
export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // После выполнения запроса на сервер получаем response объект, в котором промис возвращает текущее состояние запроса
  // Чтобы получить тело нашего запроса требуется в response объекте вызвать метод.json
  getResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    // Если ошибка, отклоняем промис      
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Универсальная функция запроса с проверкой ответа
  request = (url, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(this.getResponse)
  }


  // Загрузка информации о пользователе с сервера
  getApiUserInfo = () => {
    return this.request(`${this.baseUrl}/users/me`, { headers: this.headers })
  }

  setApiUserInfo = ({ username, status }) => {
    return this.request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: username,
        about: status
      })
    })
  }

  // Функция запроса для получения карточек с сервера
  getCardList = () => {
    return this.request(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
  }

  // Функци запроса для добавления карточки на сервер
  addCard = ({ cardname, url }) => {
    return this.request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardname,
        link: url
      })
    })
  };

  // Функция запроса для добавления/удаления лайка 
  changeLikeCardInfo = (cardId, like) => {
    return this.request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this.headers
    })
  }

  // Функция обновления аватара пользователя
  setUserAvatar = (link) => {
    return this.request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link.url
      })
    })
  }

  deleteCard = (cardId) => {
    return this.request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
  }
}