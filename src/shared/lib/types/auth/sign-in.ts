export type TLogin = {
  phone: string;
  password: string;
};

export type TSession = {
  id: string;
  role: string;
  name: string;
  surname: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  data: TSession;
  status: number;
  statusText: string;
  headers: {
    "cache-control": string;
    "content-type": string;
    expires: string;
    pragma: string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: any[];
    transformResponse: any[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Record<string, unknown>;
    headers: {
      Accept: string;
      "Content-Type": string;
      "Cache-Control": string;
      Pragma: string;
    };
    baseURL: string;
    method: string;
    url: string;
    data: string;
  };
  request: Record<string, unknown>;
};
