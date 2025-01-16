import { Avatar, Grid2, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function ProfileInfo() {
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
          Username
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
