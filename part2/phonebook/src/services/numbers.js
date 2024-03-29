import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deleteNumber = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deleteNumber,
};
