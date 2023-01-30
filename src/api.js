const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export function getIngredients() {
  return request(`${config.baseUrl}/ingredients`, {
    headers: config.headers,
  });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}
