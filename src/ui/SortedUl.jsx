import { Grid2, Typography, IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

function SortedUl({ children, sortByName, sortByRating }) {
  const [sortDirectionAlpha, setSortDirectionAlpha] = useState(null);
  const [sortDirectionRating, setSortDirectionRating] = useState(null);

  const handleClickSortAlpha = () => {
    if (sortDirectionAlpha == "desc") {
      sortByName("asc");
      setSortDirectionAlpha("asc");
    } else {
      sortByName("desc");
      setSortDirectionAlpha("desc");
    }
  };
  const handleClickSortRating = () => {
    if (sortDirectionRating == "desc") {
      sortByRating("asc");
      setSortDirectionRating("asc");
    } else {
      sortByRating("desc");
      setSortDirectionRating("desc");
    }
  };
  return (
    <ul>
      <Grid2 container>
        <Grid2 item size={1} />
        <Grid2 item size={10}>
          <div style={{ display: "flex" }}>
            <span style={{ display: "flex", flex: 3, marginLeft: "90px" }}>
              <Typography variant="h4">Title</Typography>
              <IconButton onClick={handleClickSortAlpha}>
                <SwapVertIcon />
              </IconButton>
            </span>
            <span style={{ display: "flex", flex: 3 }}>
              <Typography variant="h4">Rating</Typography>
              <IconButton onClick={handleClickSortRating}>
                <SwapVertIcon />
              </IconButton>
            </span>
          </div>
          {children}
        </Grid2>
        <Grid2 item size={1} />
      </Grid2>
    </ul>
  );
}

export default SortedUl;
