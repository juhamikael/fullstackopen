import axios from "axios";
// const baseUrl = '/api/login'
const baseUrl = "http://localhost:3003/api/login";

const login = async (credentials) => {
  console.log("login.js: credentials: ", credentials);
  console.log("login.js: baseUrl: ", baseUrl);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
