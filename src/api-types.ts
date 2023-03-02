export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type ApiResponse = {
  success: boolean;
};

export type ApiRegisterResponse = ApiResponse & {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type ApiLogoutResponse = ApiResponse & {
  message: string;
};

export type ApiTokenResponse = ApiResponse & {
  accessToken: string;
  refreshToken: string;
};

export type ApiCreateOrderResponse = ApiResponse & {
  name: string;
  order: {
    ingredients: Array<TIngredient>;
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
};

export type GetUserResponse = ApiResponse & {
  user: TUser;
};

export type TErrorReponse = ApiResponse & {
  message: string;
};

export type TUser = {
  email: string;
  name: string;
};
