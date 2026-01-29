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
