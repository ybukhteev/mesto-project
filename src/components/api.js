// Cоздал объект config в котром указал URL и заголовки для fetch запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  header: {
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


