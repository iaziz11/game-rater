import { Box, Grid2, Typography } from "@mui/material";
import SearchBar from "../features/search/SearchBar";

function Search() {
  return (
    <>
      <Grid2
        display="flex"
        flexDirection="column"
        columns={1}
        alignItems="center"
      >
        <Box>
          <Typography variant="h2" sx={{ mt: "90px" }}>
            Search For A Game
          </Typography>
          <SearchBar />
        </Box>
      </Grid2>
    </>
  );
}

export default Search;
