// import { logout, store } from "@app/store";
import { store } from "@/app/store";
import axios, { AxiosResponse } from "axios";
import { notifyError } from "@/shared/lib/helpers";

function newAbortSignal(timeoutMs: number) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController.signal;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  config => {
    config.headers["Cache-Control"] = "no-cache ";
    config.headers["Pragma"] = "no-cache";

    const accessToken = store.getState()?.auth?.accessToken;

    if (config.method === "get") {
      config.signal = newAbortSignal(10000);
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === "canceled") {
      notifyError("Something went wrong. Please try again later.");
    } else {
      notifyError(error.message);
    }

    return handleError(error);
  },
);

// Error handling function
function handleError(response: AxiosResponse) {
  const { status, data } = response;

  if (status && status >= 400 && status <= 600) {
    const messages = data?.message;

    if (typeof messages === "string" || Array.isArray(messages)) {
      if (Array.isArray(messages)) {
        const [message] = messages;

        throw new Error(message);
      }

      throw new Error(messages);
    }

    throw Error(String(response));
  }

  if ("data" in response) return response;
}
