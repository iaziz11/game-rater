import axios from "axios";

// API function to fetch games
export const fetchGamesFromSearch = async (query) => {
  console.log("Searching this query: " + query);
  const { data } = await axios.get(`http://localhost:3000/search?q=${query}`);
  console.log("Got this back: " + data);
  return data;
};
