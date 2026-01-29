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
