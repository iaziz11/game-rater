// import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
// import Backdrop from "@mui/material/Backdrop";
// import { useEffect, useState } from "react";

// function CustomInputModal({
//   open = false,
//   handleClose,
//   handleSubmit,
//   variant,
//   text,
//   defaults,
// }) {
//   const [inputValues, setInputValues] = useState({ listName: "" });
//   const submitForm = (e) => {
//     e.preventDefault();
//     handleSubmit(e, inputValues);
//     setInputValues({ listName: "" });
//   };

//   useEffect(() => {
//     if (defaults) {
//       setInputValues(defaults);
//     }
//   }, [defaults]);
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
//       {(variant == "create" || variant == "edit") && (
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
//                 <TextField
//                   fullWidth
//                   label={text.namePlaceholder}
//                   name="name"
//                   variant="outlined"
//                   margin="normal"
//                   value={inputValues.listName}
//                   onChange={(e) =>
//                     setInputValues((old) => ({
//                       ...old,
//                       listName: e.target.value,
//                     }))
//                   }
//                   required
//                 />
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   type="submit"
//                   sx={{ mt: 2 }}
//                 >
//                   {text.button}
//                 </Button>
//               </form>
//             </Box>
//           </Fade>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default CustomInputModal;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

function CustomInputModal({
  open = false,
  handleClose,
  handleSubmit,
  variant,
  text,
  defaults,
}) {
  const enabled = variant === "create" || variant === "edit";

  const initial = useMemo(
    () =>
      defaults?.listName ? { listName: defaults.listName } : { listName: "" },
    [defaults],
  );

  const [inputValues, setInputValues] = useState({ listName: "" });

  useEffect(() => {
    if (!open) return;
    setInputValues(initial);
  }, [open, initial]);

  const submitForm = (e) => {
    e.preventDefault();
    const trimmed = (inputValues.listName || "").trim();
    if (!trimmed) return;

    handleSubmit(e, { ...inputValues, listName: trimmed });
    setInputValues({ listName: "" });
  };

  if (!enabled) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <form onSubmit={submitForm}>
        <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>
          {text?.header}
        </DialogTitle>

        <DialogContent sx={{ pt: 0.5 }}>
          <TextField
            fullWidth
            autoFocus
            label={text?.namePlaceholder}
            name="name"
            variant="outlined"
            margin="dense"
            value={inputValues.listName}
            onChange={(e) =>
              setInputValues((old) => ({
                ...old,
                listName: e.target.value,
              }))
            }
            required
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{ fontWeight: 800 }}
          >
            Cancel
          </Button>
          <Button
            fullWidth={false}
            variant="contained"
            type="submit"
            sx={{ fontWeight: 900, borderRadius: 2 }}
          >
            {text?.button}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CustomInputModal;
