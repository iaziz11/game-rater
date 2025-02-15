import { IconButton, ListItem, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { replace, useNavigate } from "react-router-dom";

function ResultListItem({ data }) {
  const { id, name, coverUrl, first_release_date } = data;
  const year = new Date(first_release_date * 1000).getFullYear();
  const navigate = useNavigate();
  return (
    <ListItem
      onClick={() => navigate(`/game/${id}`)}
      sx={{
        width: "100%",
        height: "100px",
        borderRadius: "5px",
        backgroundColor: "gray",
        marginBottom: "3px",
      }}
    >
      <img src={coverUrl} width={50} height={70} />
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">{year}</Typography>
      <IconButton sx={{ marginLeft: "auto" }}>
        <PlaylistAddIcon />
      </IconButton>
    </ListItem>
  );
}

export default ResultListItem;
