import axios, { AxiosError } from "axios";

const baseURL = "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
export type ApiError = AxiosError<{ error: string }>;
