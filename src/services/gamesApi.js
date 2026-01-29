import axios from "axios";

// API function to fetch games
export const fetchGamesFromSearch = async (query, page) => {
  const { data } = await axios.get(
    `https://2bie42lu38.execute-api.us-east-2.amazonaws.com/default/searchIGDB?q=${query}&page=${page}`,
  );
  return data;
};

export const fetchGameFromId = async (id) => {
  const { data } = await axios.get(
    `https://gl5dn8tuvc.execute-api.us-east-2.amazonaws.com/default/searchGameByID?id=${id}`,
  );
  return data;
};
