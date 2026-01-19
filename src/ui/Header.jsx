// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// const pages = ["Search"];

// function ResponsiveAppBar() {
//   const { currentUser, logout } = useContext(AuthContext);
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate = useNavigate();

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleMenuClick = (setting) => {
//     handleCloseUserMenu();
//     if (setting === "Logout") {
//       logout();
//     } else if (setting === "Profile") {
//       navigate("/profile");
//     }
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Logo and Title (Desktop) */}
//           <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 4,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".1rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             GameShelf
//           </Typography>

//           {/* Mobile Menu Icon */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Logo and Title (Mobile) */}
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".1rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             GameShelf
//           </Typography>

//           {/* Search Tab */}
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             <Button
//               href="/search"
//               sx={{ my: 2, color: "white", display: "block" }}
//             >
//               Search
//             </Button>
//           </Box>

//           {/* User Section */}
//           <Box sx={{ flexGrow: 0 }}>
//             {currentUser ? (
//               <>
//                 <Tooltip title="Open settings">
//                   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                     <Avatar
//                       alt={currentUser.name}
//                       src={currentUser.avatarUrl || ""}
//                     />
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   sx={{ mt: "45px" }}
//                   id="menu-appbar-user"
//                   anchorEl={anchorElUser}
//                   anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                   keepMounted
//                   transformOrigin={{ vertical: "top", horizontal: "right" }}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                 >
//                   {["Profile", "Logout"].map((setting) => (
//                     <MenuItem
//                       key={setting}
//                       onClick={() => handleMenuClick(setting)}
//                     >
//                       <Typography textAlign="center">{setting}</Typography>
//                     </MenuItem>
//                   ))}
//                 </Menu>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => navigate("/register")}>
//                   Register
//                 </Button>
//                 <Button color="inherit" onClick={() => navigate("/login")}>
//                   Login
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const pages = [{ label: "Search", path: "/search" }];

function ResponsiveAppBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavClick = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === "Logout") logout();
    if (setting === "Profile") navigate("/profile");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(17, 24, 39, 0.92)",
        color: "common.white",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "rgba(255,255,255,0.10)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 68 }}>
          {/* Brand (Desktop) */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <SportsEsportsRoundedIcon />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: ".08rem",
                lineHeight: 1,
              }}
            >
              GameShelf
            </Typography>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "inherit",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
              PaperProps={{
                sx: { borderRadius: 2, minWidth: 220, overflow: "hidden" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavClick(page.path)}
                >
                  <Typography sx={{ fontWeight: 700 }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Brand (Mobile) */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <SportsEsportsRoundedIcon />
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, letterSpacing: ".08rem" }}
            >
              GameShelf
            </Typography>
          </Box>

          {/* Nav (Desktop) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavClick(page.path)}
                sx={{
                  my: 2,
                  color: "common.white",
                  fontWeight: 800,
                  borderRadius: 999,
                  px: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.10)",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* User Section */}
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <>
                <Tooltip title="Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser?.name || "User"}
                      src={currentUser?.avatarUrl || ""}
                      sx={{
                        width: 36,
                        height: 36,
                        border: "1px solid rgba(255,255,255,0.18)",
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "48px" }}
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  slotProps={{
                    paper: {
                      sx: {
                        borderRadius: 2,
                        minWidth: 200,
                        overflow: "hidden",
                      },
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuClick("Profile")}>
                    <Typography sx={{ fontWeight: 700 }}>Your Lists</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleMenuClick("Logout")}>
                    <Typography sx={{ fontWeight: 700 }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="text"
                  onClick={() => navigate("/register")}
                  sx={{
                    color: "common.white",
                    fontWeight: 800,
                    borderRadius: 999,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
                  }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: 900,
                    borderRadius: 999,
                    px: 2.25,
                    bgcolor: "rgba(255,255,255,0.95)",
                    color: "grey.900",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.85)" },
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
