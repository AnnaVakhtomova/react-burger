import {
  ApiCreateOrderResponse,
  ApiLogoutResponse,
  ApiRegisterResponse,
  ApiResponse,
  ApiTokenResponse,
  GetUserResponse,
  TIngredient,
} from "./api-types";
const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export function getIngredients(): Promise<
  ApiResponse & { data: Array<TIngredient> }
> {
  return request<ApiResponse & { data: Array<TIngredient> }>(
    `${config.baseUrl}/ingredients`,
    {
      headers: config.headers,
    }
  );
}

export function createOrder(
  ingredients: Array<string>,
  token: string
): Promise<ApiCreateOrderResponse> {
  return request<ApiCreateOrderResponse>(`${config.baseUrl}/orders`, {
    headers: { ...config.headers, Authorization: "Bearer " + token },
    method: "POST",
    body: JSON.stringify({ ingredients }),
  });
}

export function forgotPassword(email: string): Promise<ApiResponse> {
  return request(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(
  password: string,
  token: string
): Promise<ApiResponse> {
  return request<ApiResponse>(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
}

export function register(
  email: string,
  password: string,
  name: string
): Promise<ApiRegisterResponse> {
  return request<ApiRegisterResponse>(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export function login(
  email: string,
  password: string
): Promise<ApiRegisterResponse> {
  return request<ApiRegisterResponse>(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout(token: string): Promise<ApiLogoutResponse> {
  return request<ApiLogoutResponse>(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function token(token: string): Promise<ApiTokenResponse> {
  return request<ApiTokenResponse>(`${config.baseUrl}/auth/token`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function getUserInfo(token: string): Promise<GetUserResponse> {
  return request<GetUserResponse>(`${config.baseUrl}/auth/user`, {
    headers: { ...config.headers, Authorization: "Bearer " + token },
    method: "GET",
  });
}

export function updateUserInfo(
  token: string,
  form: { name: string; password: string; email: string }
): Promise<GetUserResponse> {
  return request<GetUserResponse>(`${config.baseUrl}/auth/user`, {
    headers: { ...config.headers, Authorization: "Bearer " + token },
    method: "PATCH",
    body: JSON.stringify(form),
  });
}

function request<T>(url: string, options: RequestInit | undefined): Promise<T> {
  return fetch(url, options).then(checkResponse<T>);
}

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  } else if (response.status === 403) {
    return Promise.reject("403");
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export type Error403 = {
  status: number;
};
