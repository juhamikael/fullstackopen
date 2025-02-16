import api from './api'

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const clearToken = () => {
  token = null;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await api.get('/blogs', config);
  return response.data;
};

const getById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.get(`/blogs/${id}`, config);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.post('/blogs', newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await api.put(`/blogs/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.delete(`/blogs/${id}`, config);
  return response.data;
};

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.post(
    `/blogs/${id}/comments`,
    { comment: comment.content },
    config
  );
  return response.data;
};

export default {
  clearToken,
  commentBlog,
  create,
  deleteBlog,
  getAll,
  getById,
  setToken,
  update,
};
