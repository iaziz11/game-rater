// import { Grid2, List, Typography } from "@mui/material";
// import GameListItem from "../lists/GameListItem";
// import { getListsFromUser } from "../../services/userFunctions";
// import { useState, useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { createList, deleteList, editList } from "../../services/gameLists";
// import CustomInputModal from "../../ui/CustomInputModal";
// import CustomConfirmModal from "../../ui/CustomConfirmModal";
// import { useQuery, useQueryClient } from "react-query";

// function ListCollection() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);
//   const [userLists, setUserLists] = useState([]);
//   const [createListModalIsOpen, setCreateListModalIsOpen] = useState(false);
//   const [editListModalIsOpen, setEditListModalIsOpen] = useState(false);
//   const [deleteListModalIsOpen, setDeleteListModalIsOpen] = useState(false);
//   const [curModalData, setCurModalData] = useState({ listName: "" });
//   const queryClient = useQueryClient();

//   // Invalidate the userLists query

//   const handleClickList = (listId) => {
//     navigate(`/list/${listId}`);
//   };

//   const handleClickEditList = (e, listId, listName) => {
//     e.stopPropagation();
//     setCurModalData({ listId, listName });
//     setEditListModalIsOpen(true);
//   };

//   const handleClickDeleteList = (e, listId, listName) => {
//     e.stopPropagation();
//     setCurModalData({ listId, listName });
//     setDeleteListModalIsOpen(true);
//   };

//   const handleSubmitCreateList = async (e, input) => {
//     await createList(input.listName, currentUser.email);
//     setCreateListModalIsOpen(false);
//     queryClient.invalidateQueries({
//       queryKey: ["userLists", currentUser?.email],
//     });
//   };

//   const handleSubmitEditList = async (e, input) => {
//     await editList(curModalData.listId, input);
//     setEditListModalIsOpen(false);
//     queryClient.invalidateQueries({
//       queryKey: ["userLists", currentUser?.email],
//     });
//   };

//   const handleSubmitDeleteList = async (e) => {
//     e.stopPropagation();
//     await deleteList(curModalData.listId);
//     queryClient.invalidateQueries({
//       queryKey: ["userLists", currentUser?.email],
//     });
//     setDeleteListModalIsOpen(false);
//   };

//   useQuery({
//     queryKey: ["userLists", currentUser?.email],
//     queryFn: () => getListsFromUser(currentUser.email),
//     enabled: !!currentUser,
//     select: (lists) =>
//       lists.sort((a, b) => {
//         if (a.userCreated && !b.userCreated) return 1;
//         if (a.dateCreated > b.dateCreated) return 1;
//         return -1;
//       }),
//     onSuccess: (lists) => {
//       setUserLists(lists);
//     },
//   });
//   return (
//     <div>
//       <Grid2 container>
//         <Grid2 item size={1} />
//         <Grid2 item size={10}>
//           <Typography variant="h3">Your Lists</Typography>
//           <CustomInputModal
//             open={createListModalIsOpen}
//             handleClose={() => setCreateListModalIsOpen(false)}
//             handleSubmit={handleSubmitCreateList}
//             variant={"create"}
//             text={{
//               header: "Create a List",
//               namePlaceholder: "List Name",
//               button: "Create",
//             }}
//           />
//           <CustomInputModal
//             open={editListModalIsOpen}
//             handleClose={() => setEditListModalIsOpen(false)}
//             handleSubmit={handleSubmitEditList}
//             variant="edit"
//             text={{
//               header: "Edit List",
//               namePlaceholder: "Change List Name",
//               button: "Update",
//             }}
//             defaults={{ listName: curModalData.listName }}
//           />
//           <CustomConfirmModal
//             open={deleteListModalIsOpen}
//             handleClose={() => setDeleteListModalIsOpen(false)}
//             handleSubmit={handleSubmitDeleteList}
//             variant="delete"
//             text={{
//               header: `Delete ${curModalData.listName}?`,
//               subheader: "This action is irreversible!",
//               button: "Delete",
//             }}
//           />

//           <List>
//             <GameListItem
//               name={"Create new list"}
//               icon={<AddBoxIcon />}
//               editable={false}
//               deletable={false}
//               handleClick={() => setCreateListModalIsOpen(true)}
//             />
//             {userLists.map((list) => (
//               <GameListItem
//                 key={list.id}
//                 name={list.listName}
//                 handleClick={() => handleClickList(list.id)}
//                 onDelete={(event) =>
//                   handleClickDeleteList(event, list.id, list.listName)
//                 }
//                 onEdit={(event) =>
//                   handleClickEditList(event, list.id, list.listName)
//                 }
//                 editable={list.userCreated}
//                 deletable={list.userCreated}
//               />
//             ))}
//           </List>
//         </Grid2>
//         <Grid2 item size={1} />
//       </Grid2>
//     </div>
//   );
// }

// export default ListCollection;

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import GameListItem from "../lists/GameListItem";
import { getListsFromUser } from "../../services/userFunctions";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { createList, deleteList, editList } from "../../services/gameLists";
import CustomInputModal from "../../ui/CustomInputModal";
import CustomConfirmModal from "../../ui/CustomConfirmModal";
import { useQuery, useQueryClient } from "react-query";

function ListCollection() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [createListModalIsOpen, setCreateListModalIsOpen] = useState(false);
  const [editListModalIsOpen, setEditListModalIsOpen] = useState(false);
  const [deleteListModalIsOpen, setDeleteListModalIsOpen] = useState(false);
  const [curModalData, setCurModalData] = useState({ listName: "" });

  const queryClient = useQueryClient();

  const handleClickList = (listId) => navigate(`/list/${listId}`);

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

  const {
    data: userLists = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userLists", currentUser?.email],
    queryFn: () => getListsFromUser(currentUser.email),
    enabled: !!currentUser,
    select: (lists) =>
      lists.sort((a, b) => {
        if (a.userCreated && !b.userCreated) return 1;
        if (a.dateCreated > b.dateCreated) return 1;
        return -1;
      }),
  });

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 1000, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            Your Lists
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organize games you’ve played, want to play, or recommend.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setCreateListModalIsOpen(true)}
          sx={{
            borderRadius: 2,
            fontWeight: 900,
            alignSelf: { xs: "flex-start", sm: "auto" },
          }}
        >
          New list
        </Button>
      </Stack>

      <CustomInputModal
        open={createListModalIsOpen}
        handleClose={() => setCreateListModalIsOpen(false)}
        handleSubmit={handleSubmitCreateList}
        variant="create"
        text={{
          header: "Create a List",
          namePlaceholder: "List name",
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
          namePlaceholder: "List name",
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
          subheader: "This action is irreversible.",
          button: "Delete",
        }}
      />

      {isLoading && (
        <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
              Loading your lists…
            </Typography>
          </Stack>
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error?.message || String(error)}
        </Alert>
      )}

      {!isLoading && !isError && (
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            p: { xs: 1.5, md: 2 },
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={1}>
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
                editable={!!list.userCreated}
                deletable={!!list.userCreated}
              />
            ))}

            {userLists.length === 0 && (
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 900 }}>No lists yet</Typography>
                <Typography color="text.secondary">
                  Create a list to start organizing your games.
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default ListCollection;
