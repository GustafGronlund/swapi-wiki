import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

const getFilms = async () => {
  const res = await axios.get(`${BASE_URL}/films`);
  return res;
};

const getPeople = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/people`);
    return res.data;
  } catch (err) {
    return err.response.status;
  }
};

const getSinglePerson = async (id) => {
  const res = await axios.get(`${BASE_URL}/people/${id}`);
  return res.data;
};

const getSingleFilm = async (id) => {
  const res = await axios.get(`${BASE_URL}/films/${id}`);
  console.log("res är nu ", res);
  return res;
};

export default {
  getFilms,
  getPeople,
  getSinglePerson,
  getSingleFilm,
};
