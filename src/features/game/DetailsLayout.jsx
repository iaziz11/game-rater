import { Grid2, Typography } from "@mui/material";

function formatPlaytime(seconds) {
  const totalMinutes = Math.floor(seconds / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes === 0
    ? `${hours} hr${hours > 1 ? "s" : ""}`
    : `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`;
}

function DetailsLayout({ data }) {
  const { summary, storyline, platforms, first_release_date } = data;
  const timeToBeat =
    data.time_to_beat.length > 0 ? data.time_to_beat[0].hastily : null;
  return (
    <Grid2 container sx={{ backgroundColor: "green", margin: "50px" }}>
      <Grid2 size={11}>
        <Typography variant="h5">{storyline || summary}</Typography>
        <Typography variant="h6" sx={{ marginTop: "5px" }}>
          Platforms:{" "}
          {platforms.reduce(
            (acc, cur, idx) => (idx === 0 ? cur.name : acc + ", " + cur.name),
            ""
          )}
        </Typography>
        {first_release_date && (
          <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
            Release Date: {new Date(first_release_date * 1000).toDateString()}
          </Typography>
        )}
        {timeToBeat && (
          <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
            Time to beat: {formatPlaytime(timeToBeat)}
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
}

export default DetailsLayout;
