import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSession } from "@/shared/lib/types";
import { getSession, setSession } from "@/shared/lib/helpers/storage";

/**
 * Represents the initial state of a session.
 *
 * @type {TSession}
 * @property {string} accessToken - The access token for the session.
 * @property {string} refreshToken - The refresh token for the session.
 * @property {boolean} isAuthenticated - Indicates whether the session is authenticated.
 */
const initialState: TSession = getSession() || {
  id: "",
  role: "",
  name: "",
  surname: "",
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
};

/**
 * A slice of the Redux state related to authentication.
 * Handles actions for logging in and logging out, updating the
 * corresponding state, and storing the session in localStorage.
 *
 * @constant {Object} authSlice
 * @property {string} name - The name of the slice, which is "auth".
 * @property {Object} initialState - The initial state of the auth slice.
 * @property {Object} reducers - An object containing reducer functions to handle actions.
 * @property {function} reducers.setLogin - A reducer to update the state with the new session and store it in localStorage.
 * @property {function} reducers.logout - A reducer to clear the session data from the state and localStorage.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<TSession>) {
      // Update the state with the new session
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      // Store the session in localStorage
      setSession({ ...action.payload, isAuthenticated: true });
    },
    logout: state => {
      state.id = "";
      state.role = "";
      state.name = "";
      state.surname = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;

      setSession(null);
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
