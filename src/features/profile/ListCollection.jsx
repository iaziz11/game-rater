import { Grid2, List, Typography } from "@mui/material";
import GameListItem from "../lists/GameListItem";
import { getListsFromUser } from "../../services/userFunctions";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { createList, deleteList, editList } from "../../services/gameLists";
import CustomInputModal from "../../ui/CustomInputModal";
import CustomConfirmModal from "../../ui/CustomConfirmModal";
import { useQuery, useQueryClient } from "react-query";

function ListCollection() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  const [createListModalIsOpen, setCreateListModalIsOpen] = useState(false);
  const [editListModalIsOpen, setEditListModalIsOpen] = useState(false);
  const [deleteListModalIsOpen, setDeleteListModalIsOpen] = useState(false);
  const [curModalData, setCurModalData] = useState({ listName: "" });
  const queryClient = useQueryClient();

  // Invalidate the userLists query

  const handleClickList = (listId) => {
    navigate(`/list/${listId}`);
  };

  const handleClickEditList = (e, listId, listName) => {
    e.stopPropagation();
    setCurModalData({ listId, listName });
    setEditListModalIsOpen(true);
  };

  const handleClickDeleteList = (e, listId, listName) => {
    e.stopPropagation();
    setCurModalData({ listId, listName });
    setDeleteListModalIsOpen(true);
  };

  const handleSubmitCreateList = async (e, input) => {
    await createList(input.listName, currentUser.email);
    setCreateListModalIsOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["userLists", currentUser?.email],
    });
  };

  const handleSubmitEditList = async (e, input) => {
    await editList(curModalData.listId, input);
    setEditListModalIsOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["userLists", currentUser?.email],
    });
  };

  const handleSubmitDeleteList = async (e) => {
    e.stopPropagation();
    await deleteList(curModalData.listId);
    queryClient.invalidateQueries({
      queryKey: ["userLists", currentUser?.email],
    });
    setDeleteListModalIsOpen(false);
  };

  useQuery({
    queryKey: ["userLists", currentUser?.email],
    queryFn: () => getListsFromUser(currentUser.email),
    enabled: !!currentUser,
    select: (lists) =>
      lists.sort((a, b) => {
        if (a.userCreated && !b.userCreated) return 1;
        if (a.dateCreated > b.dateCreated) return 1;
        return -1;
      }),
    onSuccess: (lists) => {
      setUserLists(lists);
    },
  });
  return (
    <div>
      <Grid2 container>
        <Grid2 item size={1} />
        <Grid2 item size={10}>
          <Typography variant="h3">Your Lists</Typography>
          <CustomInputModal
            open={createListModalIsOpen}
            handleClose={() => setCreateListModalIsOpen(false)}
            handleSubmit={handleSubmitCreateList}
            variant={"create"}
            text={{
              header: "Create a List",
              namePlaceholder: "List Name",
              button: "Create",
            }}
          />
          <CustomInputModal
            open={editListModalIsOpen}
            handleClose={() => setEditListModalIsOpen(false)}
            handleSubmit={handleSubmitEditList}
            variant="edit"
            text={{
              header: "Edit List",
              namePlaceholder: "Change List Name",
              button: "Update",
            }}
            defaults={{ listName: curModalData.listName }}
          />
          <CustomConfirmModal
            open={deleteListModalIsOpen}
            handleClose={() => setDeleteListModalIsOpen(false)}
            handleSubmit={handleSubmitDeleteList}
            variant="delete"
            text={{
              header: `Delete ${curModalData.listName}?`,
              subheader: "This action is irreversible!",
              button: "Delete",
            }}
          />

          <List>
            <GameListItem
              name={"Create new list"}
              icon={<AddBoxIcon />}
              editable={false}
              deletable={false}
              handleClick={() => setCreateListModalIsOpen(true)}
            />
            {userLists.map((list) => (
              <GameListItem
                key={list.id}
                name={list.listName}
                handleClick={() => handleClickList(list.id)}
                onDelete={(event) =>
                  handleClickDeleteList(event, list.id, list.listName)
                }
                onEdit={(event) =>
                  handleClickEditList(event, list.id, list.listName)
                }
                editable={list.userCreated}
                deletable={list.userCreated}
              />
            ))}
          </List>
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </div>
  );
}

export default ListCollection;
