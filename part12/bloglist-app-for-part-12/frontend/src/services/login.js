import api from './api'

const login = async credentials => {
  const response = await api.post('/login', credentials)
  return response.data
}

export default { login }
