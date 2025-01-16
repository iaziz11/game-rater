import { Grid2, Typography } from "@mui/material";
import GameListItem from "../lists/GameListItem";

function ListCollection() {
  return (
    <div>
      <Grid2 container>
        <Grid2 item size={1} />

        <Grid2 item size={10}>
          <Typography variant="h3">Your Lists</Typography>
          <ul>
            <GameListItem />
          </ul>
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </div>
  );
}

export default ListCollection;
