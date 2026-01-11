import { IconButton, ListItem, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

function GameListItem({
  name,
  index,
  rating,
  handleClick,
  onDelete,
  onEdit,
  icon,
  thumbnail = "/sword.png",
  deletable = true,
  editable = true,
}) {
  return (
    <ListItem
      sx={{
        width: "100%",
        height: "100px",
        borderRadius: "5px",
        backgroundColor: "gray",
        display: "flex",
      }}
      onClick={handleClick}
    >
      <Typography variant="h4" style={{ marginRight: "10px" }}>
        {index}
      </Typography>
      {icon || (
        <img
          src={thumbnail}
          style={{
            flex: 1,
            maxWidth: "50px",
            height: "90%",
            marginRight: "20px",
          }}
        />
      )}
      <Typography variant="h4" style={{ flex: 5 }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ flex: 4 }}>
        {rating || ""}
      </Typography>
      <div style={{ flex: 1 }}>
        {editable && (
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        )}
        {deletable && (
          <IconButton onClick={onDelete}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </div>
    </ListItem>
  );
}

export default GameListItem;
