import axios from "axios";

export const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
