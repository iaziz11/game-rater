import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import GenreTag from "./GenreTag";
import { useContext, useEffect, useMemo, useState } from "react";
import { StarBorder } from "@mui/icons-material";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import { AuthContext } from "../../contexts/AuthContext";
import { changeGameRating } from "../../services/ratings";
import ClickMenu from "../../ui/ClickMenu";
import { useNavigate } from "react-router-dom";

function TitleLayout({ data, rating, gameId }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { name, first_release_date, genres, cover } = data || {};

  const coverUrl = useMemo(() => {
    if (!cover?.url) return "";
    return cover.url.replace("t_thumb", "t_1080p");
  }, [cover?.url]);

  const thumbUrl = useMemo(() => {
    if (!cover?.url) return "";
    return cover.url.replace("t_thumb", "t_720p");
  }, [cover?.url]);

  const year = useMemo(() => {
    if (!first_release_date) return "";
    const y = new Date(first_release_date * 1000).getFullYear();
    return Number.isFinite(y) ? y : "";
  }, [first_release_date]);

  const canInteract = Boolean(currentUser?.email);

  const [curRating, setCurRating] = useState(rating ?? 0);
  const [curHover, setCurHover] = useState(rating ?? -1);
  const [isSavingRating, setIsSavingRating] = useState(false);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({
    mouseX: null,
    mouseY: null,
  });

  useEffect(() => {
    setCurRating(rating ?? 0);
    setCurHover(rating ?? -1);
  }, [rating]);

  const handleAddToListClick = (event) => {
    event.stopPropagation?.();
    setIsMenuOpened(true);
    setMenuCoordinates({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  const handleMenuClose = () => {
    setIsMenuOpened(false);
    setMenuCoordinates({ mouseX: null, mouseY: null });
  };

  const handleRatingChange = async (_, newValue) => {
    if (!canInteract) return;

    const safeValue = newValue ?? 0;
    setCurRating(safeValue);

    try {
      setIsSavingRating(true);
      await changeGameRating(gameId, currentUser.email, safeValue);
    } catch (e) {
      console.log("Could not save rating:", e?.message || e);
    } finally {
      setIsSavingRating(false);
    }
  };

  const displayValue =
    curHover !== -1 ? curHover : curRating === 0 ? null : curRating;

  return (
    <>
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

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: { xs: 2, md: 3 },
          bgcolor: "background.paper",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
        }}
      >
        <Grid2 container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "grey.100",
                width: "100%",
                maxWidth: { xs: "100%", md: 360 },
              }}
            >
              {coverUrl ? (
                <Box
                  component="img"
                  src={coverUrl}
                  alt={`${name} cover`}
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              ) : (
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ fontWeight: 900 }}>
                    No cover available
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This game doesn’t have artwork in the database.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 1000,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  {name}
                </Typography>
                {!!year && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 800, mt: 0.5 }}
                  >
                    {year}
                  </Typography>
                )}
              </Box>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                      Your rating
                    </Typography>

                    {isSavingRating && <CircularProgress size={16} />}
                    {displayValue !== null && (
                      <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                        {displayValue}
                      </Typography>
                    )}
                  </Stack>

                  <Tooltip
                    title={canInteract ? "" : "Log in to rate games"}
                    disableHoverListener={canInteract}
                  >
                    <Box sx={{ width: "fit-content" }}>
                      <Rating
                        name="hover-feedback"
                        value={curRating}
                        precision={0.5}
                        max={10}
                        readOnly={!canInteract}
                        onChange={handleRatingChange}
                        onChangeActive={(_, newHover) => setCurHover(newHover)}
                        emptyIcon={
                          <StarBorder
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Box>
                  </Tooltip>

                  {!canInteract && (
                    <Typography variant="caption" color="text.secondary">
                      Log in to rate and save games.
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={1}>
                  {!canInteract ? (
                    <Button
                      variant="contained"
                      onClick={() => navigate("/login")}
                      sx={{ borderRadius: 2, fontWeight: 900 }}
                    >
                      Log in
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<PlaylistAddRoundedIcon />}
                      onClick={handleAddToListClick}
                      sx={{ borderRadius: 2, fontWeight: 900 }}
                    >
                      Save to lists
                    </Button>
                  )}
                </Stack>
              </Stack>

              {!!genres?.length && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 900, mb: 1 }}
                  >
                    Genres
                  </Typography>

                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {genres.map((g) => (
                      <GenreTag key={g.id} genreName={g.name} />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
}

export default TitleLayout;
