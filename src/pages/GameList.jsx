import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../features/lists/GameListItem";
import { useEffect, useState } from "react";
import { getListsFromId } from "../services/gameLists";
import { useParams } from "react-router-dom";

function GameList() {
  const [listData, setListData] = useState({ games: [], listName: "" });
  const handleClick = () => {};
  const params = useParams();
  useEffect(() => {
    const getListInfo = async (id) => {
      const res = await getListsFromId(id);
      if (res) {
        setListData((old) => ({
          ...old,
          games: res.games,
          listName: res.listName,
        }));
      }
    };
    const listId = params.id;
    getListInfo(listId);
  }, [params.id]);
  return (
    <>
      <Grid2 container>
        <Grid2 item size={4}>
          <img src="/list.jpg" />
        </Grid2>
        <Grid2 item size={8}>
          <Typography variant="h2" sx={{ padding: "50px 0px 0px 0px" }}>
            {listData.listName}
          </Typography>
          <Typography variant="h4">
            {listData.games.length} Games in this List
          </Typography>
        </Grid2>
      </Grid2>
      <List>
        {listData.games.map((e) => (
          <GameListItem key={e} data={e} onClick={handleClick} />
        ))}
      </List>
    </>
  );
}

export default GameList;
