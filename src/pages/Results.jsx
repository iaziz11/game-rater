import { Grid2, List, Typography } from "@mui/material";
import ResultListItem from "../features/search/ResultListItem";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchGamesFromSearch } from "../services/gamesApi";
import SearchBar from "../features/search/SearchBar";
import { useState } from "react";
import ClickMenu from "../ui/ClickMenu";

function Results() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState({
    mouseX: null,
    mouseY: null,
  });
  const [menuGameInfo, setMenuGameInfo] = useState({
    gameId: null,
    gameName: null,
    gameThumbnail: null,
  });
  const handleAddToListClick = (event, gameInfo) => {
    // event.preventDefault();
    setIsMenuOpened(true);
    setMenuCoordinates({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
    setMenuGameInfo(gameInfo);
  };

  const handleMenuClose = () => {
    setIsMenuOpened(false);
    setMenuCoordinates({
      mouseX: null,
      mouseY: null,
    });
    setMenuGameInfo({
      gameId: null,
      gameName: null,
      gameThumbnail: null,
    });
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const { data, isLoading, isError, error } = useQuery(
    [searchQuery],
    () => fetchGamesFromSearch(searchQuery),
    {
      staleTime: 60000,
    }
  );

  return (
    <>
      <ClickMenu
        isOpen={isMenuOpened}
        mouseX={menuCoordinates.mouseX}
        mouseY={menuCoordinates.mouseY}
        handleClose={handleMenuClose}
        gameInfo={menuGameInfo}
      />
      <Grid2 container>
        <Grid2 item size={2} />
        <Grid2 item size={8}>
          <SearchBar />
        </Grid2>
        <Grid2 item size={2} />
      </Grid2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <Typography variant="h3" sx={{ margin: "40px 0px 40px 0px" }}>
            Results for &quot;{searchQuery}&quot;
          </Typography>

          <List>
            {isLoading
              ? "Loading..."
              : data.map((e) => (
                  <ResultListItem
                    key={e.id}
                    data={e}
                    onAddToList={handleAddToListClick}
                  />
                ))}
          </List>
        </>
      )}
    </>
  );
}

export default Results;
