// import { Grid2, Typography, IconButton } from "@mui/material";
// import SwapVertIcon from "@mui/icons-material/SwapVert";
// import { useState } from "react";

// function SortedUl({ children, sortByName, sortByRating }) {
//   const [sortDirectionAlpha, setSortDirectionAlpha] = useState(null);
//   const [sortDirectionRating, setSortDirectionRating] = useState(null);

//   const handleClickSortAlpha = () => {
//     if (sortDirectionAlpha == "desc") {
//       sortByName("asc");
//       setSortDirectionAlpha("asc");
//     } else {
//       sortByName("desc");
//       setSortDirectionAlpha("desc");
//     }
//   };
//   const handleClickSortRating = () => {
//     if (sortDirectionRating == "desc") {
//       sortByRating("asc");
//       setSortDirectionRating("asc");
//     } else {
//       sortByRating("desc");
//       setSortDirectionRating("desc");
//     }
//   };
//   return (
//     <ul>
//       <Grid2 container>
//         <Grid2 item size={1} />
//         <Grid2 item size={10}>
//           <div style={{ display: "flex" }}>
//             <span style={{ display: "flex", flex: 3, marginLeft: "90px" }}>
//               <Typography variant="h4">Title</Typography>
//               <IconButton onClick={handleClickSortAlpha}>
//                 <SwapVertIcon />
//               </IconButton>
//             </span>
//             <span style={{ display: "flex", flex: 3 }}>
//               <Typography variant="h4">Rating</Typography>
//               <IconButton onClick={handleClickSortRating}>
//                 <SwapVertIcon />
//               </IconButton>
//             </span>
//           </div>
//           {children}
//         </Grid2>
//         <Grid2 item size={1} />
//       </Grid2>
//     </ul>
//   );
// }

// export default SortedUl;

import { Box, List, Paper, TableSortLabel, Typography } from "@mui/material";
import { useState } from "react";

function SortedUl({ children, sortByName, sortByRating }) {
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const handleSort = (key) => {
    const isSameKey = orderBy === key;
    const nextOrder = isSameKey && order === "asc" ? "desc" : "asc";

    setOrderBy(key);
    setOrder(nextOrder);

    if (key === "title") sortByName(nextOrder);
    if (key === "rating") sortByRating(nextOrder);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        variant="outlined"
        sx={{
          mb: 1.5,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "32px 44px 1fr 84px 80px",
              sm: "32px 52px 1fr 110px 88px",
              md: "40px 56px 1fr 140px 96px",
            },
            alignItems: "center",
            columnGap: 2,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 900 }}
          >
            #
          </Typography>

          {/* cover column spacer */}
          <Box />

          <TableSortLabel
            active={orderBy === "title"}
            direction={orderBy === "title" ? order : "asc"}
            onClick={() => handleSort("title")}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 900, color: "text.secondary" }}
            >
              Game
            </Typography>
          </TableSortLabel>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <TableSortLabel
              active={orderBy === "rating"}
              direction={orderBy === "rating" ? order : "asc"}
              onClick={() => handleSort("rating")}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 900, color: "text.secondary" }}
              >
                Rating
              </Typography>
            </TableSortLabel>
          </Box>

          {/* actions column spacer */}
          <Box />
        </Box>
      </Paper>

      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {children}
      </List>
    </Box>
  );
}

export default SortedUl;
