import { Grid2, List, Typography } from "@mui/material";
import ResultListItem from "../features/search/ResultListItem";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchGamesFromSearch } from "../services/gamesApi";
import SearchBar from "../features/search/SearchBar";

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const { data, isLoading, isError, error } = useQuery(
    [searchQuery],
    () => fetchGamesFromSearch(searchQuery),
    {
      staleTime: 60000,
    }
  );
  return (
    <>
      <Grid2 container>
        <Grid2 item size={2} />
        <Grid2 item size={8}>
          <SearchBar />
        </Grid2>
        <Grid2 item size={2} />
      </Grid2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error}</p>
      ) : (
        <>
          <Typography variant="h3" sx={{ margin: "40px 0px 40px 0px" }}>
            Results for &quot;{searchQuery}&quot;
          </Typography>

          <List>
            {data?.map((e) => (
              <ResultListItem key={e.id} data={e} />
            ))}
          </List>
        </>
      )}
    </>
  );
}

export default Results;
