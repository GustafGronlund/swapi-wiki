import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

const getFilms = async () => {
  const res = await axios.get(`${BASE_URL}/films`);
  return res.data;
};

const getPeople = async () => {
  const res = await axios.get(`${BASE_URL}/people`);
  return res.data;
};

const getSinglePerson = async (id) => {
  const res = await axios.get(`${BASE_URL}/people/:id`);
  return res.data;
};

const getSingleFilm = async (id) => {
  const res = await axios.get(`${BASE_URL}/films/:id`);
  return res.data;
};

export default {
  getFilms,
  getPeople,
  getSinglePerson,
  getSingleFilm,
};
