import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

export default api 