import axios from "axios";
const baseUrl = "http://localhost:3005/api/persons";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllPersons = async () => {
  let request = await axios.get(baseUrl);
  //return request.then((res) => res.data);
  return request.data;
};

export const getSinglePerson = async (id) => {
  let request = await axios.get(`${baseUrl}/${id}`);
  //return request.then((res) => res.data);
  return request.data;
};

export const createNewPerson = async (person) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  let request = await axios.post(baseUrl, person, config);
  return request.data;
};

export const editNewPerson = async (id, update) => {
  let request = await axios.patch(`${baseUrl}/${id}`, update);
  return request.data;
};

export const deletePerson = (id) => {
  let request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};
