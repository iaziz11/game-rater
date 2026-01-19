import { Box, Paper, Stack, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

/**
 * Optional layout wrapper you can reuse for Search/Results pages.
 * Safe defaults so it won't break if rendered without props.
 */
function SearchLayout({
  title = "Search games",
  subtitle = "Find a title, rate it, and save it to your lists.",
  initialQuery = "",
  children,
}) {
  return (
    <Stack spacing={3}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: { xs: 2.5, md: 3 },
          bgcolor: "background.paper",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
        }}
      >
        <Stack spacing={1.5}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 1000,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {title}
            </Typography>
            {!!subtitle && (
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <SearchBar initialQuery={initialQuery} />
        </Stack>
      </Paper>

      {!!children && <Box>{children}</Box>}
    </Stack>
  );
}

export default SearchLayout;
