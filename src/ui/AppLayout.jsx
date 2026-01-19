// import { Outlet } from "react-router-dom";
// import ResponsiveAppBar from "./Header";
// import { Grid2 } from "@mui/material";

// function AppLayout() {
//   return (
//     <div>
//       <ResponsiveAppBar />
//       <Grid2 container>
//         <Grid2 size={2} />
//         <Grid2 size={8}>
//           <Outlet />
//         </Grid2>
//         <Grid2 size={2} />
//       </Grid2>
//     </div>
//   );
// }

// export default AppLayout;

import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Header";
import { Box, Container } from "@mui/material";

function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
      }}
    >
      <ResponsiveAppBar />

      <Box component="main" sx={{ py: { xs: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default AppLayout;
