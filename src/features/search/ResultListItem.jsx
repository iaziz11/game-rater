import {
  Avatar,
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function ResultListItem({ data, onAddToList }) {
  const navigate = useNavigate();

  const { id, name, cover, first_release_date } = data;

  const gameThumb = useMemo(() => {
    if (!cover?.url) return "";
    return cover.url.replace("t_thumb", "t_720p");
  }, [cover?.url]);

  const year = useMemo(() => {
    if (!first_release_date) return "";
    const y = new Date(first_release_date * 1000).getFullYear();
    return Number.isFinite(y) ? String(y) : "";
  }, [first_release_date]);

  const handleRowClick = () => navigate(`/game/${id}`);

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToList(e, {
      gameId: id,
      gameName: name,
      gameThumbnail: gameThumb,
    });
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleRowClick}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          px: 2,
          py: 1.25,
          transition:
            "transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
          "&:hover": {
            bgcolor: "grey.50",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            width: "100%",
            alignItems: "center",
            columnGap: 2,
            gridTemplateColumns: {
              xs: "52px 1fr auto",
              sm: "56px 1fr auto",
            },
          }}
        >
          <Avatar
            variant="rounded"
            src={gameThumb}
            alt={name}
            sx={{
              width: { xs: 52, sm: 56 },
              height: { xs: 72, sm: 76 },
              borderRadius: 2,
              bgcolor: "grey.200",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          />

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 900,
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {name}
            </Typography>

            <Box
              sx={{ mt: 0.75, display: "flex", gap: 1, alignItems: "center" }}
            >
              {year && (
                <Chip
                  label={year}
                  size="small"
                  sx={{ bgcolor: "grey.100", fontWeight: 900 }}
                />
              )}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                Click to view details
              </Typography>
            </Box>
          </Box>

          <Tooltip title="Save to lists">
            <IconButton
              onClick={handleAddClick}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "grey.50" },
              }}
            >
              <PlaylistAddRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}

export default ResultListItem;
