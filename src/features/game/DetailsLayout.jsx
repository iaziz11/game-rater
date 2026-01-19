// import { Grid2, Typography } from "@mui/material";

// function formatPlaytime(seconds) {
//   const totalMinutes = Math.floor(seconds / 60);

//   if (totalMinutes < 60) {
//     return `${totalMinutes} min`;
//   }

//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;

//   return minutes === 0
//     ? `${hours} hr${hours > 1 ? "s" : ""}`
//     : `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`;
// }

// function DetailsLayout({ data }) {
//   const { summary, storyline, platforms, first_release_date } = data;
//   const timeToBeat =
//     data.time_to_beat.length > 0 ? data.time_to_beat[0].hastily : null;
//   return (
//     <Grid2 container sx={{ backgroundColor: "green", margin: "50px" }}>
//       <Grid2 size={11}>
//         <Typography variant="h5">{storyline || summary}</Typography>
//         <Typography variant="h6" sx={{ marginTop: "5px" }}>
//           Platforms:{" "}
//           {platforms.reduce(
//             (acc, cur, idx) => (idx === 0 ? cur.name : acc + ", " + cur.name),
//             ""
//           )}
//         </Typography>
//         {first_release_date && (
//           <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
//             Release Date: {new Date(first_release_date * 1000).toDateString()}
//           </Typography>
//         )}
//         {timeToBeat && (
//           <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
//             Time to beat: {formatPlaytime(timeToBeat)}
//           </Typography>
//         )}
//       </Grid2>
//     </Grid2>
//   );
// }

// export default DetailsLayout;

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";

function formatPlaytime(seconds) {
  const totalMinutes = Math.floor(seconds / 60);

  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes === 0
    ? `${hours} hr${hours > 1 ? "s" : ""}`
    : `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`;
}

function DetailsLayout({ data }) {
  const summary = data?.summary || "";
  const storyline = data?.storyline || "";
  const platforms = Array.isArray(data?.platforms) ? data.platforms : [];
  const first_release_date = data?.first_release_date;

  // IGDB time_to_beat can vary; guard hard.
  let timeToBeatSeconds = null;
  const ttb = data?.time_to_beat;
  if (Array.isArray(ttb) && ttb.length > 0) {
    timeToBeatSeconds =
      ttb[0]?.hastily ?? ttb[0]?.normally ?? ttb[0]?.completely ?? null;
  } else if (ttb && typeof ttb === "object") {
    timeToBeatSeconds =
      ttb?.hastily ?? ttb?.normally ?? ttb?.completely ?? null;
  }

  const releaseText = first_release_date
    ? new Date(first_release_date * 1000).toDateString()
    : null;

  const platformText = platforms
    .map((p) => p?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 1000, letterSpacing: "-0.02em" }}
        >
          About
        </Typography>

        {(storyline || summary) && (
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.75 }}
          >
            {storyline || summary}
          </Typography>
        )}

        <Divider />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 1.25,
          }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1.5,
              bgcolor: "grey.50",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <CalendarMonthRoundedIcon color="action" />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 900 }}
                >
                  Release date
                </Typography>
                <Typography sx={{ fontWeight: 900 }}>
                  {releaseText || "—"}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1.5,
              bgcolor: "grey.50",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <DevicesRoundedIcon color="action" />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 900 }}
                >
                  Platforms
                </Typography>
                <Typography
                  sx={{ fontWeight: 900 }}
                  noWrap
                  title={platformText}
                >
                  {platformText || "—"}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1.5,
              bgcolor: "grey.50",
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center">
              <TimerRoundedIcon color="action" />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 900 }}
                >
                  Time to beat
                </Typography>
                <Typography sx={{ fontWeight: 900 }}>
                  {timeToBeatSeconds ? formatPlaytime(timeToBeatSeconds) : "—"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Optional: show summary separately if both exist */}
        {storyline && summary && (
          <>
            <Divider />
            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
              Summary
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.75 }}
            >
              {summary}
            </Typography>
          </>
        )}
      </Stack>
    </Paper>
  );
}

export default DetailsLayout;
