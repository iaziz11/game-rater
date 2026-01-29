import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getListsFromUser } from "../services/userFunctions";
import { addGameToList, removeGameFromList } from "../services/gameLists";

export default function ClickMenu({
  isOpen,
  mouseX,
  mouseY,
  handleClose,
  gameInfo,
}) {
  const { currentUser } = useContext(AuthContext);

  const [userLists, setUserLists] = useState([]);
  const [isListsLoading, setIsListsLoading] = useState(false);
  const [checkedListIds, setCheckedListIds] = useState(() => new Set());
  const [pendingListIds, setPendingListIds] = useState(() => new Set());

  const gameId = gameInfo?.gameId;

  const listHasGame = (list) => {
    if (!gameId) return false;

    const games = list?.games;
    if (!games) return false;

    if (Array.isArray(games)) {
      return games.some((g) => {
        if (typeof g === "string") return g === gameId;
        return g?.gameId == gameId;
      });
    }

    if (typeof games === "object") {
      return Boolean(games?.[gameId]);
    }

    return false;
  };

  useEffect(() => {
    const fetchLists = async () => {
      if (!currentUser) {
        setUserLists([]);
        setCheckedListIds(new Set());
        return;
      }

      setIsListsLoading(true);
      try {
        const lists = await getListsFromUser(currentUser.email);
        const filteredLists = lists.filter(
          (e) => e.userCreated === true || e.userCreated === undefined,
        );
        setUserLists(filteredLists);
      } catch (e) {
        console.error("Could not fetch user lists: " + e.message);
        setUserLists([]);
      } finally {
        setIsListsLoading(false);
      }
    };

    fetchLists();
  }, [currentUser]);

  useEffect(() => {
    if (!gameId) {
      setCheckedListIds(new Set());
      return;
    }

    const next = new Set();
    for (const list of userLists) {
      if (listHasGame(list)) next.add(list.id);
    }
    setCheckedListIds(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLists, gameId]);

  const sortedLists = useMemo(() => {
    return [...userLists].sort((a, b) =>
      (a?.listName || "").localeCompare(b?.listName || ""),
    );
  }, [userLists]);

  const setPending = (listId, isPending) => {
    setPendingListIds((prev) => {
      const next = new Set(prev);
      if (isPending) next.add(listId);
      else next.delete(listId);
      return next;
    });
  };

  const toggleChecked = (listId, nextChecked) => {
    setCheckedListIds((prev) => {
      const next = new Set(prev);
      if (nextChecked) next.add(listId);
      else next.delete(listId);
      return next;
    });
  };

  const handleToggleList = async (list) => {
    if (!currentUser || !gameInfo?.gameId) return;

    const listId = list.id;
    const currentlyChecked = checkedListIds.has(listId);

    setPending(listId, true);

    try {
      if (currentlyChecked) {
        await removeGameFromList(listId, gameInfo.gameId);
        toggleChecked(listId, false);
      } else {
        await addGameToList(
          gameInfo.gameId,
          gameInfo.gameName,
          gameInfo.gameThumbnail,
          listId,
        );
        toggleChecked(listId, true);
      }
    } catch (e) {
      console.error("Could not update game list membership: " + e.message);
    } finally {
      setPending(listId, false);
    }
  };

  return (
    <Menu
      open={isOpen}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mouseX !== null ? { top: mouseY, left: mouseX } : undefined
      }
      slotProps={{
        paper: {
          elevation: 10,
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            minWidth: 260,
            border: "1px solid",
            borderColor: "divider",
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography sx={{ fontWeight: 900 }} variant="subtitle2">
          Save to lists
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Check to add • Uncheck to remove
        </Typography>
      </Box>

      <Divider />

      {!currentUser && (
        <MenuItem disabled sx={{ py: 1.25 }}>
          <ListItemText
            primary="Sign in to save games"
            primaryTypographyProps={{ sx: { fontWeight: 700 } }}
            secondary="Create lists and track what you’ve played."
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
      )}

      {currentUser && isListsLoading && (
        <MenuItem disabled sx={{ py: 1.25 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <CircularProgress size={18} />
          </ListItemIcon>
          <ListItemText
            primary="Loading lists…"
            primaryTypographyProps={{ sx: { fontWeight: 700 } }}
          />
        </MenuItem>
      )}

      {currentUser && !isListsLoading && sortedLists.length === 0 && (
        <MenuItem disabled sx={{ py: 1.25 }}>
          <ListItemText
            primary="No lists yet"
            primaryTypographyProps={{ sx: { fontWeight: 700 } }}
            secondary="Create a list from your Profile page."
            secondaryTypographyProps={{ variant: "caption" }}
          />
        </MenuItem>
      )}

      {currentUser &&
        !isListsLoading &&
        sortedLists.map((list) => {
          const isChecked = checkedListIds.has(list.id);
          const isPending = pendingListIds.has(list.id);

          return (
            <MenuItem
              key={list.id}
              onClick={() => handleToggleList(list)}
              dense
              sx={{
                py: 0.75,
                "&:active": { bgcolor: "action.selected" },
              }}
              disabled={isPending}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {isPending ? (
                  <Checkbox
                    edge="start"
                    disabled
                    tabIndex={-1}
                    disableRipple
                    size="small"
                  />
                ) : (
                  <Checkbox
                    edge="start"
                    checked={isChecked}
                    tabIndex={-1}
                    disableRipple
                    size="small"
                  />
                )}
              </ListItemIcon>

              <ListItemText
                primary={list.listName}
                slotProps={{
                  primary: { variant: "body2", sx: { fontWeight: 700 } },
                }}
              />
            </MenuItem>
          );
        })}
    </Menu>
  );
}
