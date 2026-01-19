// import { Box, Button, Fade, Modal, Typography } from "@mui/material";
// import Backdrop from "@mui/material/Backdrop";

// function CustomConfirmModal({
//   open = false,
//   handleClose,
//   handleSubmit,
//   variant,
//   text,
// }) {
//   const submitForm = (e) => {
//     e.preventDefault();
//     handleSubmit(e);
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };
//   return (
//     <>
//       {
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={open}
//           onClose={handleClose}
//           closeAfterTransition
//           slots={{ backdrop: Backdrop }}
//           slotProps={{
//             backdrop: {
//               timeout: 500,
//             },
//           }}
//         >
//           <Fade in={open}>
//             <Box sx={style}>
//               <form onSubmit={submitForm}>
//                 <Typography variant="h5">{text.header}</Typography>
//                 <Typography variant="h5">{text.subheader || ""}</Typography>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   type="submit"
//                   color={variant == "delete" ? "error" : "primary"}
//                   sx={{ mt: 2 }}
//                 >
//                   {text.button}
//                 </Button>
//               </form>
//             </Box>
//           </Fade>
//         </Modal>
//       }
//     </>
//   );
// }

// export default CustomConfirmModal;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

function CustomConfirmModal({
  open = false,
  handleClose,
  handleSubmit,
  variant,
  text,
}) {
  const isDelete = variant === "delete";

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <form onSubmit={submitForm}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: 900,
            pb: 1,
          }}
        >
          {isDelete && <WarningAmberRoundedIcon color="error" />}
          {text?.header}
        </DialogTitle>

        {(text?.subheader || "").trim().length > 0 && (
          <DialogContent sx={{ pt: 0.5 }}>
            <DialogContentText sx={{ color: "text.secondary" }}>
              {text.subheader}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{ fontWeight: 800 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color={isDelete ? "error" : "primary"}
            sx={{ fontWeight: 900, borderRadius: 2 }}
          >
            {text?.button}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CustomConfirmModal;
