import axios, { type AxiosRequestConfig } from "axios";

export interface ApiConfig {
  apiUrl: string;
  timeoutMs: number;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
const timeoutMs = Number(process.env.NEXT_PUBLIC_TIMEOUT ?? process.env.API_TIMEOUT ?? process.env.VITE_TIMEOUT ?? 5000);

export const apiConfig: ApiConfig = {
  apiUrl,
  timeoutMs,
};

export const apiClient = axios.create({
  baseURL: apiConfig.apiUrl,
  timeout: apiConfig.timeoutMs,
});

const refreshClient = axios.create({
  baseURL: apiConfig.apiUrl,
  timeout: apiConfig.timeoutMs,
});

function ensureBaseUrl() {
  if (!apiConfig.apiUrl) {
    throw new Error("Missing API URL. Set API_URL or NEXT_PUBLIC_API_URL in env.");
  }
}

export interface AuthInput {
  sessionToken?: string | null;
  expiredTime?: string | number | null;
  refreshToken?: string | { value?: string } | null;
}

export interface NewTokenInfo {
  access_token: string;
  refresh_token: string | null;
  expired_time: number | null;
}

export interface AuthResult {
  token: string;
  isRefreshToken: boolean;
  forceLogout: boolean;
  newTokenInfo: NewTokenInfo | null;
}

export type ApiRequestConfig = Omit<AxiosRequestConfig, 'auth'> & {
  auth?: AuthInput;
  next?: Record<string, unknown>;
};

const AUTH_UNCHANGED: AuthResult = {
  token: "",
  isRefreshToken: false,
  forceLogout: false,
  newTokenInfo: null,
};

function checkExpiredToken(expiredTimestamp: number): boolean {
  return Math.floor(Date.now() / 1000) >= expiredTimestamp;
}

function calculateExpiredTime(expiresIn: number): number {
  return Math.floor(Date.now() / 1000) + expiresIn;
}

let refreshInFlight: Promise<NewTokenInfo> | null = null;

async function refreshAccessToken(sessionToken: string, refreshToken: string): Promise<NewTokenInfo> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const response = await refreshClient.post(
        "users/refresh_token",
        { refresh_token: refreshToken },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      const result = response.data?.result ?? response.data?.data;
      const newTokenInfo: NewTokenInfo = {
        access_token: result?.access_token,
        refresh_token: result?.refresh_token ?? null,
        expired_time:
          result?.expired_time ??
          (result?.expires_in ? calculateExpiredTime(result.expires_in) : null),
      };
      if (!newTokenInfo.access_token) {
        throw new Error("Refresh token response is missing access_token");
      }
      return newTokenInfo;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export async function resolveAuth(input?: AuthInput | null): Promise<AuthResult> {
  const sessionToken = input?.sessionToken || "";
  if (!sessionToken) {
    return AUTH_UNCHANGED;
  }

  const refreshToken =
    typeof input?.refreshToken === "string" ? input.refreshToken : input?.refreshToken?.value || "";
  const expiredTime = Number(input?.expiredTime ?? 0);
  const isExpired = expiredTime > 0 ? checkExpiredToken(expiredTime) : false;

  if (!isExpired) {
    return { token: sessionToken, isRefreshToken: false, forceLogout: false, newTokenInfo: null };
  }

  if (!refreshToken) {
    return { token: "", isRefreshToken: false, forceLogout: true, newTokenInfo: null };
  }

  try {
    const newTokenInfo = await refreshAccessToken(sessionToken, refreshToken);
    return { token: newTokenInfo.access_token, isRefreshToken: true, forceLogout: false, newTokenInfo };
  } catch (error) {
    console.error("[http] Failed to refresh token, forcing logout:", error);
    return { token: "", isRefreshToken: false, forceLogout: true, newTokenInfo: null };
  }
}

function withAuthHeaders(config: ApiRequestConfig | undefined, auth: AuthResult): AxiosRequestConfig {
  const headers: Record<string, string> = {
    ...((config?.headers as Record<string, string>) ?? {}),
  };
  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { auth: _auth, ...rest } = config ?? {};
  return { ...rest, headers };
}

function buildOptions(config: ApiRequestConfig | undefined, auth: AuthResult) {
  return {
    ...(config ?? {}),
    isRefreshToken: auth.isRefreshToken,
    forceLogout: auth.forceLogout,
    newTokenInfo: auth.newTokenInfo ?? undefined,
  };
}

export async function getApi<T>(url: string, config?: ApiRequestConfig) {
  ensureBaseUrl();
  const auth = await resolveAuth(config?.auth);
  const response = await apiClient.get<T>(url, withAuthHeaders(config, auth));
  return {
    data: response.data,
    options: buildOptions(config, auth),
  };
}

export async function postApi<T, B = unknown>(url: string, data?: B, config?: ApiRequestConfig) {
  ensureBaseUrl();
  const auth = await resolveAuth(config?.auth);
  const response = await apiClient.post<T>(url, data, withAuthHeaders(config, auth));
  return {
    data: response.data,
    options: buildOptions(config, auth),
  };
}

export async function putApi<T, B = unknown>(url: string, data?: B, config?: ApiRequestConfig) {
  ensureBaseUrl();
  const auth = await resolveAuth(config?.auth);
  const response = await apiClient.put<T>(url, data, withAuthHeaders(config, auth));
  return {
    data: response.data,
    options: buildOptions(config, auth),
  };
}

export async function deleteApi<T>(url: string, config?: ApiRequestConfig) {
  ensureBaseUrl();
  const auth = await resolveAuth(config?.auth);
  const response = await apiClient.delete<T>(url, withAuthHeaders(config, auth));
  return {
    data: response.data,
    options: buildOptions(config, auth),
  };
}
