import api from './api'

const getAll = async () => {
  const response = await api.get('/users');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default { getAll, getById };
