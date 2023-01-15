import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})