const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export function getIngredients() {
  return fetch(`${config.baseUrl}/ingredients`, {
    headers: config.headers,
  }).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}
