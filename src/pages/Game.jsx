import TitleLayout from "../features/game/TitleLayout";
import DetailsLayout from "../features/game/DetailsLayout";
import { useParams } from "react-router-dom";
import { fetchGameFromId } from "../services/gamesApi";
import { useQuery } from "react-query";
import { getRatingFromGame } from "../services/ratings";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Game() {
  const params = useParams();
  const gameId = params.id;
  const { currentUser, authLoading } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useQuery(
    [gameId],
    () => fetchGameFromId(gameId),
    {
      staleTime: 60000,
    }
  );
  const {
    data: userRating,
    isLoading: ratingIsLoading,
    isError: ratingIsError,
    error: ratingError,
  } = useQuery(
    [`ratings${currentUser?.email}${gameId}`],
    () => getRatingFromGame(gameId, currentUser?.email),
    {
      enabled: !!currentUser?.email,
    }
  );
  return (
    <>
      {isLoading || ratingIsLoading || authLoading ? (
        <p>Loading...</p>
      ) : isError || ratingIsError ? (
        <p>{error.message || ratingError.message}</p>
      ) : (
        <>
          <TitleLayout data={data} rating={userRating} gameId={gameId} />
          <DetailsLayout data={data} />
        </>
      )}
    </>
  );
}

export default Game;
