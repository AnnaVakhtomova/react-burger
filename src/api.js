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

export function createOrder(ingredients, token) {
  return request(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ ingredients }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function forgotPassword(email) {
  return request(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(password, token) {
  return request(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
}

export function register(email, password, name) {
  return request(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export function login(email, password, name) {
  return request(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export function logout(token) {
  return request(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function token(token) {
  return request(`${config.baseUrl}/auth/token`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function getUserInfo(token) {
  return request(`${config.baseUrl}/auth/user`, {
    headers: config.headers,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function updateUserInfo(token, form) {
  return request(`${config.baseUrl}/auth/user`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(form),
  });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else if (response.status === 403) {
    return Promise.reject({ status: 403 });
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}
