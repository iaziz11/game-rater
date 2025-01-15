import { Box } from "@mui/material";

function GenreTag({ icon, genreName, backgroundColor = "white" }) {
  return (
    <Box
      sx={{
        backgroundColor,
        width: "fit-content",
        padding: "4px 8px",
        borderRadius: "5px",
      }}
    >
      <img
        src={icon}
        height="15px"
        width="15px"
        style={{ margin: "0px 5px 0px 0px", verticalAlign: "text-top" }}
      />
      {genreName}
    </Box>
  );
}

export default GenreTag;
