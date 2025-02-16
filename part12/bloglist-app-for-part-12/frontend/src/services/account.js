import api from './api'

const createAccount = async (credentials) => {
  try {
    const response = await api.post('/users', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default { createAccount, deleteAccount };
