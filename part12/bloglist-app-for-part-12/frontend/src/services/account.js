import axios from "axios";
import { urlBuilder } from "../lib/url";

const route = "/users";
const url = urlBuilder(route);

const createAccount = async (credentials) => {
  console.log("url", url);
  try {
    const response = await axios.post(url, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (id) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

export default { createAccount, deleteAccount };
