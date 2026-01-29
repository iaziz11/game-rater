import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import SearchBar from "../features/search/SearchBar";
import { createSearchParams, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const suggestions = ["Elden Ring", "Hades", "Portal 2", "Halo"];

  const go = (q) => {
    navigate({
      pathname: "/results",
      search: createSearchParams({ q }).toString(),
    });
  };

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: { xs: 2.5, md: 3.5 },
          bgcolor: "background.paper",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Stack spacing={0.75} sx={{ maxWidth: 760 }} alignItems="center">
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                fontWeight: 1000,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Search for a game
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Find games, rate what you’ve played, and save titles to your
              lists.
            </Typography>
          </Stack>

          <SearchBar autoFocus />

          <Stack spacing={1} alignItems="center">
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 800 }}
            >
              Try:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              {suggestions.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  variant="outlined"
                  clickable
                  onClick={() => go(s)}
                  sx={{ fontWeight: 800, lineHeight: 1.5 }}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Search;
