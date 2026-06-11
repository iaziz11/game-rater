import { Box, Divider } from "@mui/material";
import { useState } from "react";

function GameListItemSeparator({ position, handleItemDrop }) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <Box
      sx={{
        opacity: !isDisplayed ? 0 : 1,
        minHeight: "7px",
        display: "flex",
        alignItems: "center",
        border: "1px #90D5FF solid",
        borderRadius: "4px",
        boxShadow: "0px 0px 3px #98d5fc",
        px: "5px",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDisplayed(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDisplayed(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDisplayed(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDisplayed(false);
        handleItemDrop(position);
      }}
    >
      <Divider sx={{ padding: 0, margin: 0, flex: 1 }} />
    </Box>
  );
}

export default GameListItemSeparator;
