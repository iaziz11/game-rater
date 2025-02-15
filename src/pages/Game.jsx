import TitleLayout from "../features/game/TitleLayout";
import DetailsLayout from "../features/game/DetailsLayout";
import game_data from "../../test_data/test_game_data.json";

function Game() {
  return (
    <>
      <TitleLayout data={game_data[0]} rating={5} />
      <DetailsLayout data={game_data[0]} />
    </>
  );
}

export default Game;
