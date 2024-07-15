import axios from "axios";
const baseUrl = "http://localhost:3005/api/persons";

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

export const createNewPerson = (person) => {
  let request = axios.post(baseUrl, person);
  return request.then((res) => res.data);
};

export const editNewPerson = async (id, update) => {
  let request = await axios.patch(`${baseUrl}/${id}`, update);
  return request.data;
};

export const deletePerson = (id) => {
  let request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};
