import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../lists/GameListItem";

function ListCollection() {
  return (
    <div>
      <Grid2 container>
        <Grid2 item size={1} />

        <Grid2 item size={10}>
          <Typography variant="h3">Your Lists</Typography>
          <List>
            <GameListItem />
            <GameListItem />
          </List>
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </div>
  );
}

export default ListCollection;
