import { Middleware } from "@reduxjs/toolkit";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { logout } from "@/entities/auth/model";

export const authMiddleware: Middleware = store => next => action => {
  const token = store.getState()?.auth?.accessToken;

  if (token) {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);

      if (Date.now() >= (exp as number) * 1000) {
        store.dispatch(logout());
      }
    } catch (error) {
      console.error("Token decoding error", error);
    }
  }

  return next(action);
};
