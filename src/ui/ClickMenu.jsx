import { Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getListsFromUser } from "../services/userFunctions";
import { addGameToList } from "../services/gameLists";

export default function ClickMenu({
  isOpen,
  mouseX,
  mouseY,
  handleClose,
  gameInfo,
}) {
  const handleAddGameToList = async (listId) => {
    try {
      await addGameToList(
        gameInfo.gameId,
        gameInfo.gameName,
        gameInfo.gameThumbnail,
        listId
      );
      handleClose();
    } catch (e) {
      console.log("Could not add game to list: " + e.message);
    }
  };
  const { currentUser } = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      if (currentUser) {
        const lists = await getListsFromUser(currentUser.email);
        const filteredLists = lists.filter(
          (e) => e.userCreated === true || e.userCreated === undefined
        );
        setUserLists(filteredLists);
      }
    };
    fetchLists();
  }, [currentUser]);
  return (
    <>
      <Menu
        open={isOpen}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouseX !== null ? { top: mouseY, left: mouseX } : undefined
        }
      >
        {userLists.map((e) => (
          <MenuItem key={e.id} onClick={() => handleAddGameToList(e.id)}>
            {e.listName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
