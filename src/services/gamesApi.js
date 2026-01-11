import axios from "axios";

// API function to fetch games
export const fetchGamesFromSearch = async (query) => {
  const { data } = await axios.get(`http://localhost:3000/search?q=${query}`);
  return data;
};

export const fetchGameFromId = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/game/${id}`);
  return data;
};
