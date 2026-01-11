import { IconButton, ListItem, Typography } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";

function ResultListItem({ data, onAddToList }) {
  const { id, name, cover, first_release_date } = data;
  const gameThumb = cover?.url.replace("t_thumb", "t_720p");
  const year = new Date(first_release_date * 1000).getFullYear();
  const navigate = useNavigate();
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
      <img src={gameThumb} width={50} height={70} />
      <Typography variant="h4" onClick={() => navigate(`/game/${id}`)}>
        {name}
      </Typography>
      <Typography variant="h5">{year || ""}</Typography>
      <IconButton
        sx={{ marginLeft: "auto" }}
        onClick={(e) =>
          onAddToList(e, {
            gameId: id,
            gameName: name,
            gameThumbnail: gameThumb,
          })
        }
      >
        <PlaylistAddIcon />
      </IconButton>
    </ListItem>
  );
}

export default ResultListItem;
