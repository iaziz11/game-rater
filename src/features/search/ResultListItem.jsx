import { IconButton, ListItem, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function ResultListItem() {
  return (
    <ListItem
      sx={{
        width: "100%",
        height: "100px",
        borderRadius: "5px",
        backgroundColor: "gray",
        marginBottom: "3px",
      }}
    >
      <img src="test.webp" width={50} height={70} />
      <Typography variant="h4">BOTW</Typography>
      <Typography variant="h5">2020</Typography>
      <IconButton sx={{ marginLeft: "auto" }}>
        <PlaylistAddIcon />
      </IconButton>
    </ListItem>
  );
}

export default ResultListItem;
