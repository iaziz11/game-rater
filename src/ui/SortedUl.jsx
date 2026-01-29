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
