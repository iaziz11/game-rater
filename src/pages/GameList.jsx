import { Grid2, Typography } from "@mui/material";
import GameListItem from "../features/lists/GameListItem";
import { useContext, useEffect, useState } from "react";
import { getListFromId, removeGameFromList } from "../services/gameLists";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomConfirmModal from "../ui/CustomConfirmModal";
import SortedUl from "../ui/SortedUl";
import { useQuery } from "react-query";
import { fetchRatingsFromList } from "../services/ratings";
import { AuthContext } from "../contexts/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function GameList() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [curGameInfo, setCurGameInfo] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };
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
    () => fetchRatingsFromList(listData?.games, currentUser.email),
    { enabled: !!listData }
  );

  const [displayedGames, setDisplayedGames] = useState([]);

  useEffect(() => {
    if (listData?.games) {
      setDisplayedGames(listData.games);
      console.log(listData.games);
    }
  }, [listData]);

  const handleSortAlpha = (direction) => {
    if (direction == "asc") {
      const sorted = [...displayedGames].sort((a, b) =>
        a.gameName.localeCompare(b.gameName)
      );
      setDisplayedGames(sorted);
    } else {
      const sorted = [...displayedGames].sort((a, b) =>
        b.gameName.localeCompare(a.gameName)
      );
      setDisplayedGames(sorted);
    }
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
    console.log();
    if (!curGameInfo?.listId || !curGameInfo?.gameId) return;
    e.stopPropagation();
    await removeGameFromList(curGameInfo?.listId, curGameInfo?.gameId);
    window.location.reload();
  };

  if (isListInfoLoading || isRatingsInfoLoading) return <p>Loading...</p>;
  if (isListInfoError || isRatingsInfoError)
    return <p>{listInfoError || ratingsInfoError}</p>;

  return (
    <>
      <CustomConfirmModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmit={handleSubmitDelete}
        variant="delete"
        text={{
          header: `Are you sure you would like to delete ${curGameInfo?.gameName} from this list?`,
          button: "Remove",
        }}
      />
      <Grid2 container>
        <Grid2 item size={8} sx={{ mb: 3, mt: 5 }}>
          <Link to="/profile" sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </Link>
          <Typography variant="h2">{listData.listName}</Typography>
          <Typography variant="h4">
            {listData.games.length} Games in this List
          </Typography>
        </Grid2>
      </Grid2>
      {listData.games.length > 0 && (
        <SortedUl sortByName={handleSortAlpha} sortByRating={handleSortRating}>
          {displayedGames.map((e, idx) => (
            <GameListItem
              index={idx + 1}
              key={e.gameId}
              name={e.gameName}
              rating={ratingsData[e.gameId] ? ratingsData[e.gameId] : "-"}
              onDelete={(event) =>
                handleClickDelete(event, listId, e.gameId, e.gameName)
              }
              thumbnail={e.gameThumbnail}
              handleClick={() => handleClick(e.gameId)}
              editable={false}
              deletable={listData.userCreated}
            />
          ))}
        </SortedUl>
      )}
    </>
  );
}

export default GameList;
