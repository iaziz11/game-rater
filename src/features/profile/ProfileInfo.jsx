import { Avatar, Grid2, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ProfileInfo() {
  const { isUserLoggedIn, currentUser } = useContext(AuthContext);
  console.log(currentUser.email);
  console.log(isUserLoggedIn);
  return (
    <Grid2 container>
      <Grid2 item size={4}>
        <Avatar
          alt="profile picture"
          src="pfp.jpg"
          sx={{ width: 350, height: 350 }}
        />
      </Grid2>
      <Grid2 item size={7}>
        <Typography variant="h2" sx={{ padding: "50px 0px 0px 0px" }}>
          {isUserLoggedIn ? currentUser.email : ""}
        </Typography>
        <Typography variant="h4">Joined Jan 1, 2020</Typography>
      </Grid2>
      <Grid2 item size={1}>
        <button>
          <SettingsIcon />
        </button>
      </Grid2>
    </Grid2>
  );
}

export default ProfileInfo;
