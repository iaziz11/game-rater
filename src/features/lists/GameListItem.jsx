import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandIcon from "@mui/icons-material/Expand";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../contexts/AuthContext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useContext, useEffect, useRef, useState } from "react";
import { changeGameRating } from "../../services/ratings";
import { StarBorder } from "@mui/icons-material";
// import ClickMenu from "../../ui/ClickMenu";

function GameListItem({
  name,
  index,
  rating,
  handleClick,
  onDelete,
  onEdit,
  onDragItem,
  gameId,
  icon,
  thumbnail = "/sword.png",
  deletable = true,
  editable = true,
}) {
  const ref = useRef();

  const [isRating, setIsRating] = useState(false);
  const [curRating, setCurRating] = useState(rating);
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [curHover, setCurHover] = useState(rating ?? -1);
  const isGameRow = typeof index === "number" && Number.isFinite(index);
  const { currentUser } = useContext(AuthContext);

  const hasRealRating =
    rating !== undefined && rating !== null && String(rating).trim() !== "";

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setIsRating(true);
  };

  const handleRatingChange = async (e, newValue) => {
    e.stopPropagation();
    const safeValue = newValue ?? 0;
    setCurRating(safeValue);

    try {
      setIsSavingRating(true);
      await changeGameRating(gameId, currentUser.email, safeValue);
    } catch (e) {
      console.log("Could not save rating:", e?.message || e);
    } finally {
      setIsSavingRating(false);
      setIsRating(false);
    }
  };

  // const handleAddToListClick = (event) => {
  //   event.stopPropagation?.();
  //   setIsMenuOpened(true);
  //   setMenuCoordinates({
  //     mouseX: event.clientX + 2,
  //     mouseY: event.clientY - 6,
  //   });
  // };

  // const handleAddToListClick = (event, gameInfo) => {
  //   setIsMenuOpened(true);
  //   setMenuCoordinates({
  //     mouseX: event.clientX + 2,
  //     mouseY: event.clientY - 6,
  //   });
  //   setMenuGameInfo(gameInfo);
  // };

  // const handleMenuClose = () => {
  //   setIsMenuOpened(false);
  //   setMenuCoordinates({ mouseX: null, mouseY: null });
  // };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsRating(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const displayValue =
    curHover !== -1 ? curHover : curRating === 0 ? "-" : curRating;

  return (
    <ListItem
      ref={ref}
      disablePadding
      draggable
      onDragStart={(e) => {
        onDragItem(index);
        console.log("dragging: ", index);
        const ghost = document.getElementById("ghost");

        if (ghost) {
          e.dataTransfer.setDragImage(ghost, 20, 20);
        }
      }}
      onDragEnd={() => {
        onDragItem(null);
        console.log("stopped dragging: ", index);
      }}
    >
      <div
        id="ghost"
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: -9999,
          left: -9999,
          width: 25,
          height: 25,
          background: "white",
          border: "1px solid black",
          borderRadius: "3px",
        }}
      >
        <ExpandIcon />
      </div>
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
              {!isRating ? (
                hasRealRating ? (
                  <Chip
                    icon={<StarRoundedIcon fontSize="small" />}
                    label={curRating}
                    onClick={handleRatingClick}
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
                    onClick={handleRatingClick}
                    sx={{ bgcolor: "grey.100", fontWeight: 900, mr: "30px" }}
                  />
                )
              ) : (
                <>
                  <Rating
                    name="hover-feedback"
                    value={curRating}
                    precision={0.5}
                    max={10}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleRatingChange}
                    onChangeActive={(_, newHover) => setCurHover(newHover)}
                    emptyIcon={
                      <StarBorder
                        style={{ opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                  />
                  {isSavingRating && <CircularProgress size={16} />}
                  {displayValue !== null && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                      {displayValue}
                    </Typography>
                  )}
                </>
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

            {/* {isGameRow && (
              <ClickMenu
                isOpen={isMenuOpened}
                mouseX={menuCoordinates.mouseX}
                mouseY={menuCoordinates.mouseY}
                handleClose={handleMenuClose}
                gameInfo={{
                  gameId,
                  gameName: name,
                  gameThumbnail: thumbUrl || coverUrl || "",
                }}
              />
            )} */}

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
