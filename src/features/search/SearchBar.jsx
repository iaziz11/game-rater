import { Box, Button, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function SearchBar({ initialQuery = "", autoFocus = false, setPage }) {
  const [query, setQuery] = useState(initialQuery || "");
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery || "");
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = (query || "").trim();
    if (!trimmed) return;
    if (setPage) setPage(0);
    navigate(
      {
        pathname: "/results",
        search: createSearchParams({ q: trimmed }).toString(),
      },
      { replace: true },
    );
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 760,
        mx: "auto",
        borderRadius: 999,
        px: 1.25,
        py: 0.75,
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "background.paper",
        boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
      }}
    >
      <SearchRoundedIcon color="action" />

      <InputBase
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games (e.g. Halo, Hades, Elden Ring)…"
        inputProps={{ "aria-label": "search games" }}
        sx={{ flex: 1, fontWeight: 700 }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 999,
            fontWeight: 900,
            px: 2,
            py: 1,
            whiteSpace: "nowrap",
          }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchBar;
