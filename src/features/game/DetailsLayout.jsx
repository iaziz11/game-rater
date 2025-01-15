import { Grid2, Typography } from "@mui/material";

function DetailsLayout() {
  return (
    <Grid2 container sx={{ backgroundColor: "green", margin: "50px" }}>
      <Grid2 size={11}>
        <Typography variant="h5">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="h6" sx={{ marginTop: "5px" }}>
          Platforms: PS5, Xbox One, Nintendo Switch
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
          Release Date: 4/5/2020
        </Typography>
      </Grid2>
    </Grid2>
  );
}

export default DetailsLayout;
