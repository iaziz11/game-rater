import { Grid2, Typography, Box } from "@mui/material";
import SearchBar from "./SearchBar";

function SearchLayout() {
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

export default SearchLayout;
