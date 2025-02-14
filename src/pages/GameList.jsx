import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../features/lists/GameListItem";

function GameList() {
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
        <GameListItem />
        <GameListItem />
        <GameListItem />
      </List>
    </>
  );
}

export default GameList;
