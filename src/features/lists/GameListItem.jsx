import { ListItem, Typography } from "@mui/material";

function GameListItem({ name }) {
  return (
    <ListItem
      sx={{
        width: "100%",
        height: "100px",
        borderRadius: "5px",
        backgroundColor: "gray",
      }}
    >
      <img src="/sword.png" width={50} height={50} />
      <Typography variant="h4">{name}</Typography>
    </ListItem>
  );
}

export default GameListItem;
