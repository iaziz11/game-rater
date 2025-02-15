import { Grid2, Typography } from "@mui/material";

function DetailsLayout({ data }) {
  const { summary, platforms, first_release_date } = data;
  return (
    <Grid2 container sx={{ backgroundColor: "green", margin: "50px" }}>
      <Grid2 size={11}>
        <Typography variant="h5">{summary}</Typography>
        <Typography variant="h6" sx={{ marginTop: "5px" }}>
          Platforms: {platforms.map((e) => `${e}, `)}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
          Release Date: {new Date(first_release_date).toDateString()}
        </Typography>
      </Grid2>
    </Grid2>
  );
}

export default DetailsLayout;
