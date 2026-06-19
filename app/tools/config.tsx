import axios, { type AxiosRequestConfig } from "axios";

export interface ApiConfig {
  apiUrl: string;
  timeoutMs: number;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
const timeoutMs = Number(process.env.API_TIMEOUT ?? process.env.VITE_TIMEOUT ?? 5000);

export const apiConfig: ApiConfig = {
  apiUrl,
  timeoutMs,
};

export const apiClient = axios.create({
  baseURL: apiConfig.apiUrl,
  timeout: apiConfig.timeoutMs,
});

function ensureBaseUrl() {
  if (!apiConfig.apiUrl) {
    throw new Error("Missing API URL. Set API_URL or NEXT_PUBLIC_API_URL in env.");
  }
}

export async function getApi<T>(url: string, config?: AxiosRequestConfig) {
  ensureBaseUrl();
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function postApi<T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
  ensureBaseUrl();
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function putApi<T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
  ensureBaseUrl();
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function deleteApi<T>(url: string, config?: AxiosRequestConfig) {
  ensureBaseUrl();
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}
 