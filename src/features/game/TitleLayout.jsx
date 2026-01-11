import { Box, Grid2, IconButton, Rating, Typography } from "@mui/material";
import GenreTag from "./GenreTag";
import { useContext, useEffect, useState } from "react";
import { StarBorder } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { changeGameRating } from "../../services/ratings";
import ClickMenu from "../../ui/ClickMenu";

function TitleLayout({ data, rating, gameId }) {
  console.log(data);
  const { currentUser } = useContext(AuthContext);
  const { name, first_release_date, genres, cover } = data;
  const coverUrl = cover?.url.replace("t_thumb", "t_1080p");
  const year = first_release_date
    ? new Date(first_release_date * 1000).getFullYear()
    : "";
  const [curRating, setCurRating] = useState(rating || 0);
  const [curHover, setCurHover] = useState(rating);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({
    mouseX: null,
    mouseY: null,
  });

  const handleAddToListClick = (event) => {
    // event.preventDefault();
    setIsMenuOpened(true);
    setMenuCoordinates({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  const handleMenuClose = () => {
    setIsMenuOpened(false);
    setMenuCoordinates({
      mouseX: null,
      mouseY: null,
    });
  };

  useEffect(() => {
    if (rating) {
      setCurRating(rating);
      setCurHover(rating);
    }
  }, [rating]);

  return (
    <>
      <ClickMenu
        isOpen={isMenuOpened}
        mouseX={menuCoordinates.mouseX}
        mouseY={menuCoordinates.mouseY}
        handleClose={handleMenuClose}
        gameInfo={{ gameId, gameName: name, gameThumbnail: cover?.url }}
      />
      <Grid2
        container
        spacing={2}
        sx={{ margin: "50px", border: "solid black" }}
      >
        <Grid2 item size={4}>
          <img
            src={coverUrl}
            alt="poster"
            width="315px"
            height="480px"
            style={{ display: "block" }}
          />
        </Grid2>
        <Grid2 item size={8}>
          <Typography variant="h2" sx={{ padding: "50px 0px 0px 0px" }}>
            {name}
          </Typography>
          <Typography variant="h4">{year}</Typography>
          <div>
            <Rating
              name="hover-feedback"
              value={curRating}
              precision={0.5}
              max={10}
              onChange={async (event, newValue) => {
                setCurRating(newValue);
                await changeGameRating(gameId, currentUser.email, newValue);
              }}
              onChangeActive={(event, newHover) => {
                setCurHover(newHover);
              }}
              emptyIcon={
                <StarBorder style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {curRating !== null && (
              <span>
                {curHover !== -1 ? curHover : curRating == 0 ? null : curRating}
              </span>
            )}
          </div>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={(e) => handleAddToListClick(e)}
          >
            <PlaylistAddIcon />
          </IconButton>
          <Box
            sx={{
              backgroundColor: "gray",
              borderRadius: "5px",
              margin: "80px 40px 0px 0px",
              padding: "5px 5px",
            }}
          >
            {genres?.map((e) => (
              <GenreTag key={e.id} icon="/sword.png" genreName={e.name} />
            ))}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default TitleLayout;
