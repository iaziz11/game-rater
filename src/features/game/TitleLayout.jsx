import { Box, Grid2, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GenreTag from "./GenreTag";

function TitleLayout() {
  return (
    <Grid2 container spacing={2} sx={{ margin: "50px", border: "solid black" }}>
      <Grid2 item size={4}>
        <img
          src="test.webp"
          alt="poster"
          width="315px"
          height="480px"
          style={{ display: "block" }}
        />
      </Grid2>
      <Grid2 item size={8}>
        <Typography variant="h2" sx={{ padding: "50px 0px 0px 0px" }}>
          Title
        </Typography>
        <Typography variant="h4">Year</Typography>
        <div>
          <span>Rating:</span>
          <StarBorderIcon />
        </div>
        <Box
          sx={{
            backgroundColor: "gray",
            borderRadius: "5px",
            margin: "80px 40px 0px 0px",
            padding: "5px 5px",
          }}
        >
          <GenreTag icon="sword.png" genreName="Adventure" />
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default TitleLayout;
