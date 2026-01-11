import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

function CustomConfirmModal({
  open = false,
  handleClose,
  handleSubmit,
  variant,
  text,
}) {
  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      {
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form onSubmit={submitForm}>
                <Typography variant="h5">{text.header}</Typography>
                <Typography variant="h5">{text.subheader || ""}</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color={variant == "delete" ? "error" : "primary"}
                  sx={{ mt: 2 }}
                >
                  {text.button}
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      }
    </>
  );
}

export default CustomConfirmModal;
