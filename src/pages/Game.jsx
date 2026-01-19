// import TitleLayout from "../features/game/TitleLayout";
// import DetailsLayout from "../features/game/DetailsLayout";
// import { useParams } from "react-router-dom";
// import { fetchGameFromId } from "../services/gamesApi";
// import { useQuery } from "react-query";
// import { getRatingFromGame } from "../services/ratings";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// function Game() {
//   const params = useParams();
//   const gameId = params.id;
//   const { currentUser, authLoading } = useContext(AuthContext);
//   const { data, isLoading, isError, error } = useQuery(
//     [gameId],
//     () => fetchGameFromId(gameId),
//     {
//       staleTime: 60000,
//     },
//   );
//   const {
//     data: userRating,
//     isLoading: ratingIsLoading,
//     isError: ratingIsError,
//     error: ratingError,
//   } = useQuery(
//     [`ratings${currentUser?.email}${gameId}`],
//     () => getRatingFromGame(gameId, currentUser?.email),
//     {
//       enabled: !!currentUser?.email,
//     },
//   );
//   return (
//     <>
//       {isLoading || ratingIsLoading || authLoading ? (
//         <p>Loading...</p>
//       ) : isError || ratingIsError ? (
//         <p>{error.message || ratingError.message}</p>
//       ) : (
//         <>
//           <TitleLayout data={data.data} rating={userRating} gameId={gameId} />
//           <DetailsLayout data={data.data} />
//         </>
//       )}
//     </>
//   );
// }

// export default Game;

import TitleLayout from "../features/game/TitleLayout";
import DetailsLayout from "../features/game/DetailsLayout";
import { useParams } from "react-router-dom";
import { fetchGameFromId } from "../services/gamesApi";
import { useQuery } from "react-query";
import { getRatingFromGame } from "../services/ratings";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";

function Game() {
  const params = useParams();
  const gameId = params.id;

  const { currentUser, authLoading } = useContext(AuthContext);

  const {
    data,
    isLoading: gameIsLoading,
    isError: gameIsError,
    error: gameError,
  } = useQuery([gameId], () => fetchGameFromId(gameId), {
    staleTime: 60000,
  });

  const {
    data: userRating,
    isLoading: ratingIsLoading,
    isError: ratingIsError,
    error: ratingError,
  } = useQuery(
    [`ratings${currentUser?.email}${gameId}`],
    () => getRatingFromGame(gameId, currentUser?.email),
    { enabled: !!currentUser?.email },
  );

  const isLoading = gameIsLoading || ratingIsLoading || authLoading;
  const isError = gameIsError || ratingIsError;

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
            Loading game…
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {gameError?.message || ratingError?.message || "Something went wrong."}
      </Alert>
    );
  }

  return (
    <Stack spacing={{ xs: 2.5, md: 3 }}>
      <TitleLayout data={data.data} rating={userRating} gameId={gameId} />
      <DetailsLayout data={data.data} />
    </Stack>
  );
}

export default Game;
