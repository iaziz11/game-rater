import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  List,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ResultListItem from "../features/search/ResultListItem";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGamesFromSearch } from "../services/gamesApi";
import SearchBar from "../features/search/SearchBar";
import { useMemo, useState } from "react";
import ClickMenu from "../ui/ClickMenu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Results() {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [page, setPage] = useState(0);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const searchQueryRaw = queryParams.get("q") || "";
  const searchQuery = searchQueryRaw.trim();

  const handleAddToListClick = (event, gameInfo) => {
    setIsMenuOpened(true);
    setMenuCoordinates({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
    setMenuGameInfo(gameInfo);
  };

  const handleMenuClose = () => {
    setIsMenuOpened(false);
    setMenuCoordinates({ mouseX: null, mouseY: null });
    setMenuGameInfo({ gameId: null, gameName: null, gameThumbnail: null });
  };

  const handlePrevPage = () => {
    // Placeholder: decrement page
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    // Placeholder: increment page
    setPage((prev) => prev + 1);
  };

  const {
    data: results,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(
    ["searchResults", searchQuery, page],
    () => fetchGamesFromSearch(searchQuery, page),
    {
      enabled: !!searchQuery,
      staleTime: 60000,
    },
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

      <Stack spacing={2.5}>
        <Box sx={{ pt: 1 }}>
          <SearchBar initialQuery={searchQuery} setPage={setPage} />
          {isFetching && !isLoading && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <CircularProgress size={16} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                Updating results…
              </Typography>
            </Stack>
          )}
        </Box>

        {!searchQuery && (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={1.25}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Search for a game to see results
              </Typography>
              <Typography color="text.secondary">
                Type a title above and press Enter.
              </Typography>
            </Stack>
          </Paper>
        )}

        {searchQuery && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="baseline"
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 1000,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Results for “{searchQuery}”
            </Typography>
            {!isLoading && !isError && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 800 }}
              >
                Showing {Math.min(results.data.length, 15)} results
              </Typography>
            )}
          </Stack>
        )}

        {isError && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error?.message || "Could not load results."}
          </Alert>
        )}

        {searchQuery && isLoading && (
          <List
            disablePadding
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <Paper
                key={idx}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "background.paper",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="rounded" width={52} height={72} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton width="60%" />
                    <Skeleton width="30%" />
                  </Box>
                  <Skeleton variant="circular" width={32} height={32} />
                </Stack>
              </Paper>
            ))}
          </List>
        )}

        {searchQuery && !isLoading && !isError && results.data.length === 0 && (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={1.25}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                No results found
              </Typography>
              <Typography color="text.secondary">
                Try a different spelling or a shorter title.
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<SearchRoundedIcon />}
                  onClick={() => navigate("/search")}
                  sx={{ borderRadius: 2, fontWeight: 900 }}
                >
                  Back to search
                </Button>
              </Box>
            </Stack>
          </Paper>
        )}

        {searchQuery && !isLoading && !isError && results.data.length > 0 && (
          <>
            <List
              disablePadding
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {results.data.slice(0, 15).map((e) => (
                <ResultListItem
                  key={e.id}
                  data={e}
                  onAddToList={handleAddToListClick}
                />
              ))}
            </List>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              sx={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                border: "1px solid #d3d3d3",
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "5px 10px",
              }}
            >
              {page > 0 ? (
                <IconButton onClick={handlePrevPage} aria-label="previous page">
                  <ArrowBackIosNewIcon />
                </IconButton>
              ) : null}

              <Typography
                variant="h6"
                sx={{ minWidth: 24, textAlign: "center" }}
              >
                {page + 1}
              </Typography>

              {results?.hasMore ? (
                <IconButton onClick={handleNextPage} aria-label="next page">
                  <ArrowForwardIosIcon />
                </IconButton>
              ) : null}
            </Box>
            <Box height="50px"></Box>
          </>
        )}
      </Stack>
    </>
  );
}

export default Results;
