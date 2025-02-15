import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../features/lists/GameListItem";
import game_data from "../../test_data/test_game_data.json";

function GameList() {
  console.log(game_data);
  return (
    <>
      <Grid2 container>
        <Grid2 item size={4}>
          <img src="list.jpg" />
        </Grid2>
        <Grid2 item size={8}>
          <Typography variant="h2" sx={{ padding: "50px 0px 0px 0px" }}>
            List Name
          </Typography>
          <Typography variant="h4">4 Games in this List</Typography>
        </Grid2>
      </Grid2>
      <List>
        {game_data.map((e) => (
          <GameListItem key={e.id} data={e} />
        ))}
      </List>
    </>
  );
}

export default GameList;
