import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Header";
import { Grid2 } from "@mui/material";

function AppLayout() {
  return (
    <div>
      <ResponsiveAppBar />
      <Grid2 container>
        <Grid2 size={2} />
        <Grid2 size={8}>
          <Outlet />
        </Grid2>
        <Grid2 size={2} />
      </Grid2>
    </div>
  );
}

export default AppLayout;
