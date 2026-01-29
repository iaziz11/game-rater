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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

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
  const isGameRow = typeof index === "number" && Number.isFinite(index);

  const hasRealRating =
    rating !== undefined && rating !== null && String(rating).trim() !== "";

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleClick}
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
            alignItems: "center",
            width: "100%",
            columnGap: 2,
            gridTemplateColumns: isGameRow
              ? {
                  xs: "32px 44px 1fr 84px 80px",
                  sm: "32px 52px 1fr 110px 88px",
                  md: "40px 56px 1fr 140px 96px",
                }
              : {
                  xs: "44px 1fr 88px",
                  sm: "52px 1fr 96px",
                },
          }}
        >
          {isGameRow && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 900, textAlign: "center" }}
            >
              {index}
            </Typography>
          )}

          <Avatar
            variant="rounded"
            src={isGameRow && !icon ? thumbnail : undefined}
            sx={{
              width: { xs: 44, sm: 52, md: 56 },
              height: { xs: 44, sm: 52, md: 56 },
              bgcolor: "grey.400",
              borderRadius: 2,
              fontWeight: 900,
              overflow: "hidden",
            }}
          >
            {icon ? icon : (name?.[0] ?? "?")}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 900,
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: isGameRow ? 2 : 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {name}
            </Typography>

            {!isGameRow && (
              <Typography variant="caption" color="text.secondary">
                {editable ? "Custom list" : "Default list"}
              </Typography>
            )}
          </Box>

          {isGameRow && (
            <Box sx={{ justifySelf: "end" }}>
              {hasRealRating ? (
                <Chip
                  icon={<StarRoundedIcon fontSize="small" />}
                  label={rating}
                  size="small"
                  sx={{
                    fontWeight: 900,
                    mr: "20px",
                    bgcolor: "grey.100",
                    "& .MuiChip-icon": { mr: 0.25 },
                  }}
                />
              ) : (
                <Chip
                  label="—"
                  size="small"
                  sx={{ bgcolor: "grey.100", fontWeight: 900, mr: "30px" }}
                />
              )}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 0.75,
              justifySelf: "end",
            }}
          >
            {editable && (
              <Tooltip title="Edit">
                <IconButton
                  onClick={onEdit}
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "grey.50" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {deletable && (
              <Tooltip title={isGameRow ? "Remove from list" : "Delete list"}>
                <IconButton
                  onClick={onDelete}
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "grey.50" },
                  }}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
}

export default GameListItem;
