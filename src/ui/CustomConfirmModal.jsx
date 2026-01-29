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
