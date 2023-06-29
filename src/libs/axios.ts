import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2/pokemon";

const api = axios.create({
  baseURL,
});

export default api;
