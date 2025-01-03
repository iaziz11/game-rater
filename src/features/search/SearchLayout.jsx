import {
  FormControl,
  Grid2,
  Typography,
  Input,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
          <FormControl variant="standard" sx={{ width: "100%", mt: "100px" }}>
            <Input
              id="input-with-icon-adornment"
              variant="outlined"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Grid2>
    </>
  );
}

export default SearchLayout;
