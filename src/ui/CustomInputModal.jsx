import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";

function CustomInputModal({
  open = false,
  handleClose,
  handleSubmit,
  variant,
  text,
  defaults,
}) {
  const [inputValues, setInputValues] = useState({ listName: "" });
  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(e, inputValues);
    setInputValues({ listName: "" });
  };

  useEffect(() => {
    if (defaults) {
      setInputValues(defaults);
    }
  }, [defaults]);
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
      {(variant == "create" || variant == "edit") && (
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
                <TextField
                  fullWidth
                  label={text.namePlaceholder}
                  name="name"
                  variant="outlined"
                  margin="normal"
                  value={inputValues.listName}
                  onChange={(e) =>
                    setInputValues((old) => ({
                      ...old,
                      listName: e.target.value,
                    }))
                  }
                  required
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  {text.button}
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}

export default CustomInputModal;
