import axios from "axios";
const baseUrl = "http://localhost:3005/api/login";

export const loginService = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
