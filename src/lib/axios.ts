import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.response.use(
    (response) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(response), Math.random() * 3000)
      )
  );
}
