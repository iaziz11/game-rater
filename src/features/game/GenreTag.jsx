// import { Box } from "@mui/material";

// function GenreTag({ icon, genreName, backgroundColor = "white" }) {
//   return (
//     <Box
//       sx={{
//         backgroundColor,
//         width: "fit-content",
//         padding: "4px 8px",
//         borderRadius: "5px",
//       }}
//     >
//       <img
//         src={icon}
//         height="15px"
//         width="15px"
//         style={{ margin: "0px 5px 0px 0px", verticalAlign: "text-top" }}
//       />
//       {genreName}
//     </Box>
//   );
// }

// export default GenreTag;

import { Avatar, Chip } from "@mui/material";

function GenreTag({ icon, genreName, backgroundColor }) {
  return (
    <Chip
      size="small"
      avatar={
        <Avatar alt={genreName} src={icon} sx={{ width: 20, height: 20 }} />
      }
      label={genreName}
      sx={{
        bgcolor: backgroundColor || "grey.100",
        borderRadius: 999,
        fontWeight: 900,
        lineHeight: 1.5,
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}

export default GenreTag;
