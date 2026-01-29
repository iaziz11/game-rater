import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GENRE_CONFIG } from "../../genreConfig";
import { Chip } from "@mui/material";

function GenreTag({ genreName }) {
  const config = GENRE_CONFIG[genreName];
  return (
    <Chip
      size="small"
      avatar={
        <FontAwesomeIcon icon={config?.icon} style={{ color: config?.color }} />
      }
      label={genreName}
      sx={{
        bgcolor: "white",
        border: "1px solid #d3d3d3",
        fontWeight: 900,
        lineHeight: 1.5,
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}

export default GenreTag;
