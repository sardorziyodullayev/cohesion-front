import LoginReducer from "@/entities/auth/model/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./authMiddleware";

export const store = configureStore({
  reducer: {
    auth: LoginReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
