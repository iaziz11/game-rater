import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../lists/GameListItem";
import game_data from "../../../test_data/test_game_data.json";

function ListCollection() {
  return (
    <div>
      <Grid2 container>
        <Grid2 item size={1} />

        <Grid2 item size={10}>
          <Typography variant="h3">Your Lists</Typography>
          <List>
            {game_data.map((e) => (
              <GameListItem key={e.id} data={e} />
            ))}
          </List>
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </div>
  );
}

export default ListCollection;
