import {
  FormControl,
  Grid2,
  Input,
  InputAdornment,
  List,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResultListItem from "../features/search/ResultListItem";

function Results() {
  return (
    <>
      <Grid2 container>
        <Grid2 item size={2} />
        <Grid2 item size={8}>
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
        </Grid2>
        <Grid2 item size={2} />
      </Grid2>
      <Typography variant="h3" sx={{ margin: "40px 0px 40px 0px" }}>
        Results for "The Legend of Zelda: Breath of the Wild"
      </Typography>
      <List>
        <ResultListItem />
        <ResultListItem />
        <ResultListItem />
      </List>
    </>
  );
}

export default Results;
