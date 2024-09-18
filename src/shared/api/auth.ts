import { AuthResponse, TLogin } from "../lib/types";
import { api } from "./base";

class AuthApi {
  async login({ password, phone }: TLogin) {
    return await api.post<null, AuthResponse>("auth/sign-in", {
      phone: phone,
      password: password,
    });
  }

  async signup(params) {
    return await api.post<null, AuthResponse>("auth/sign-up", params);
  }
}

export const authApi = new AuthApi();
