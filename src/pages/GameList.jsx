// import { Grid2, Typography } from "@mui/material";
// import GameListItem from "../features/lists/GameListItem";
// import { useContext, useEffect, useState } from "react";
// import { getListFromId, removeGameFromList } from "../services/gameLists";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import CustomConfirmModal from "../ui/CustomConfirmModal";
// import SortedUl from "../ui/SortedUl";
// import { useQuery } from "react-query";
// import { fetchRatingsFromList } from "../services/ratings";
// import { AuthContext } from "../contexts/AuthContext";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// function GameList() {
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [curGameInfo, setCurGameInfo] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const handleClick = (gameId) => {
//     navigate(`/game/${gameId}`);
//   };
//   const params = useParams();
//   const listId = params.id;
//   const {
//     data: listData,
//     isLoading: isListInfoLoading,
//     isError: isListInfoError,
//     error: listInfoError,
//   } = useQuery(["listData" + listId], () => getListFromId(listId), {
//     staleTime: 60000,
//   });

//   const {
//     data: ratingsData,
//     isLoading: isRatingsInfoLoading,
//     isError: isRatingsInfoError,
//     error: ratingsInfoError,
//   } = useQuery(
//     ["ratings" + listId],
//     () => fetchRatingsFromList(listData?.games, currentUser.email),
//     { enabled: !!listData }
//   );

//   const [displayedGames, setDisplayedGames] = useState([]);

//   useEffect(() => {
//     if (listData?.games) {
//       setDisplayedGames(listData.games);
//       console.log(listData.games);
//     }
//   }, [listData]);

//   const handleSortAlpha = (direction) => {
//     if (direction == "asc") {
//       const sorted = [...displayedGames].sort((a, b) =>
//         a.gameName.localeCompare(b.gameName)
//       );
//       setDisplayedGames(sorted);
//     } else {
//       const sorted = [...displayedGames].sort((a, b) =>
//         b.gameName.localeCompare(a.gameName)
//       );
//       setDisplayedGames(sorted);
//     }
//   };

//   const handleSortRating = (direction) => {
//     if (!ratingsData) return;

//     const sorted = [...displayedGames].sort((a, b) => {
//       const ratingA = ratingsData[a.gameId] ?? -Infinity;
//       const ratingB = ratingsData[b.gameId] ?? -Infinity;

//       return direction === "asc" ? ratingA - ratingB : ratingB - ratingA;
//     });

//     setDisplayedGames(sorted);
//   };

//   const handleClickDelete = (e, listId, gameId, gameName) => {
//     e.stopPropagation();
//     setCurGameInfo({ listId, gameId, gameName });
//     setIsDeleteModalOpen(true);
//   };

//   const handleSubmitDelete = async (e) => {
//     console.log();
//     if (!curGameInfo?.listId || !curGameInfo?.gameId) return;
//     e.stopPropagation();
//     await removeGameFromList(curGameInfo?.listId, curGameInfo?.gameId);
//     window.location.reload();
//   };

//   if (isListInfoLoading || isRatingsInfoLoading) return <p>Loading...</p>;
//   if (isListInfoError || isRatingsInfoError)
//     return <p>{listInfoError || ratingsInfoError}</p>;

//   return (
//     <>
//       <CustomConfirmModal
//         open={isDeleteModalOpen}
//         handleClose={() => setIsDeleteModalOpen(false)}
//         handleSubmit={handleSubmitDelete}
//         variant="delete"
//         text={{
//           header: `Are you sure you would like to delete ${curGameInfo?.gameName} from this list?`,
//           button: "Remove",
//         }}
//       />
//       <Grid2 container>
//         <Grid2 item size={8} sx={{ mb: 3, mt: 5 }}>
//           <Link to="/profile" sx={{ mb: 2 }}>
//             <ArrowBackIcon />
//           </Link>
//           <Typography variant="h2">{listData.listName}</Typography>
//           <Typography variant="h4">
//             {listData.games.length} Games in this List
//           </Typography>
//         </Grid2>
//       </Grid2>
//       {listData.games.length > 0 && (
//         <SortedUl sortByName={handleSortAlpha} sortByRating={handleSortRating}>
//           {displayedGames.map((e, idx) => (
//             <GameListItem
//               index={idx + 1}
//               key={e.gameId}
//               name={e.gameName}
//               rating={ratingsData[e.gameId] ? ratingsData[e.gameId] : "-"}
//               onDelete={(event) =>
//                 handleClickDelete(event, listId, e.gameId, e.gameName)
//               }
//               thumbnail={e.gameThumbnail}
//               handleClick={() => handleClick(e.gameId)}
//               editable={false}
//               deletable={listData.userCreated}
//             />
//           ))}
//         </SortedUl>
//       )}
//     </>
//   );
// }

// export default GameList;

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GameListItem from "../features/lists/GameListItem";
import { useContext, useEffect, useState } from "react";
import { getListFromId, removeGameFromList } from "../services/gameLists";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import CustomConfirmModal from "../ui/CustomConfirmModal";
import SortedUl from "../ui/SortedUl";
import { useQuery, useQueryClient } from "react-query";
import { fetchRatingsFromList } from "../services/ratings";
import { AuthContext } from "../contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function GameList() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [curGameInfo, setCurGameInfo] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const params = useParams();
  const listId = params.id;

  const {
    data: listData,
    isLoading: isListInfoLoading,
    isError: isListInfoError,
    error: listInfoError,
  } = useQuery(["listData" + listId], () => getListFromId(listId), {
    staleTime: 60000,
  });

  const {
    data: ratingsData,
    isLoading: isRatingsInfoLoading,
    isError: isRatingsInfoError,
    error: ratingsInfoError,
  } = useQuery(
    ["ratings" + listId],
    () => fetchRatingsFromList(listData?.games || [], currentUser?.email),
    { enabled: !!listData && !!currentUser?.email },
  );

  const [displayedGames, setDisplayedGames] = useState([]);

  useEffect(() => {
    if (listData?.games) setDisplayedGames(listData.games);
  }, [listData]);

  const handleClickGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleSortAlpha = (direction) => {
    const sorted = [...displayedGames].sort((a, b) =>
      direction === "asc"
        ? a.gameName.localeCompare(b.gameName)
        : b.gameName.localeCompare(a.gameName),
    );
    setDisplayedGames(sorted);
  };

  const handleSortRating = (direction) => {
    if (!ratingsData) return;

    const sorted = [...displayedGames].sort((a, b) => {
      const ratingA = ratingsData[a.gameId] ?? -Infinity;
      const ratingB = ratingsData[b.gameId] ?? -Infinity;
      return direction === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    setDisplayedGames(sorted);
  };

  const handleClickDelete = (e, listId, gameId, gameName) => {
    e.stopPropagation();
    setCurGameInfo({ listId, gameId, gameName });
    setIsDeleteModalOpen(true);
  };

  const handleSubmitDelete = async (e) => {
    e.stopPropagation();
    if (!curGameInfo?.listId || !curGameInfo?.gameId) return;

    await removeGameFromList(curGameInfo.listId, curGameInfo.gameId);

    setIsDeleteModalOpen(false);
    setCurGameInfo(null);

    queryClient.invalidateQueries(["listData" + listId]);
    queryClient.invalidateQueries(["ratings" + listId]);
  };

  if (isListInfoLoading || isRatingsInfoLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
            Loading list…
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (isListInfoError || isRatingsInfoError) {
    const msg =
      listInfoError?.message ||
      ratingsInfoError?.message ||
      String(listInfoError || ratingsInfoError);

    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {msg}
      </Alert>
    );
  }

  const gamesCount = listData?.games?.length ?? 0;
  const ratings = ratingsData || {};

  return (
    <Box>
      <CustomConfirmModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmit={handleSubmitDelete}
        variant="delete"
        text={{
          header: `Remove ${curGameInfo?.gameName || "this game"}?`,
          subheader:
            "This will remove it from this list (you can always add it back).",
          button: "Remove",
        }}
      />

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            component={RouterLink}
            to="/profile"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "grey.50" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 1000,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {listData?.listName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage games you’ve saved to this list.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            sx={{ lineHeight: 1.5 }}
            label={`${gamesCount} game${gamesCount === 1 ? "" : "s"}`}
            size="small"
          />
          <Chip
            label={listData?.userCreated ? "Custom list" : "Default list"}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Stack>

      {gamesCount > 0 ? (
        <SortedUl sortByName={handleSortAlpha} sortByRating={handleSortRating}>
          {displayedGames.map((g, idx) => (
            <GameListItem
              index={idx + 1}
              key={g.gameId}
              name={g.gameName}
              rating={ratings[g.gameId] ?? null}
              onDelete={(event) =>
                handleClickDelete(event, listId, g.gameId, g.gameName)
              }
              thumbnail={g.gameThumbnail}
              handleClick={() => handleClickGame(g.gameId)}
              editable={false}
              deletable={!!listData?.userCreated}
            />
          ))}
        </SortedUl>
      ) : (
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
              This list is empty
            </Typography>
            <Typography color="text.secondary">
              Head to search, find a game, then add it to this list.
            </Typography>
            <Box>
              <Button
                variant="contained"
                startIcon={<SearchRoundedIcon />}
                onClick={() => navigate("/search")}
                sx={{ borderRadius: 2, fontWeight: 900 }}
              >
                Search games
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default GameList;
