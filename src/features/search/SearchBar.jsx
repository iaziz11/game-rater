import { FormControl, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      {
        pathname: "/results",
        search: createSearchParams({ q: query }).toString(),
      },
      { replace: true }
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="standard" sx={{ width: "100%", mt: "100px" }}>
        <Input
          id="input-with-icon-adornment"
          variant="outlined"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </FormControl>
    </form>
  );
}

export default SearchBar;
