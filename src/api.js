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

export function createOrder(ingredients) {
  return request(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ ingredients }),
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
