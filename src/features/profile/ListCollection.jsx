import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../lists/GameListItem";
import { getListsFromUser } from "../../services/userFunctions";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ListCollection() {
  const { currentUser } = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      if (currentUser) {
        const lists = await getListsFromUser(currentUser.email);
        setUserLists(lists);
      }
    };
    fetchLists();
  }, [currentUser]);
  return (
    <div>
      <Grid2 container>
        <Grid2 item size={1} />
        <Grid2 item size={10}>
          <Typography variant="h3">Your Lists</Typography>
          <List>
            {userLists.map((e) => (
              <GameListItem key={e.id} name={e.listName} />
            ))}
          </List>
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </div>
  );
}

export default ListCollection;
