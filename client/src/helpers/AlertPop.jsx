import { Alert, Snackbar } from "@mui/material";
import useAuth from "./AuthContext";

const AlertPop = () => {
  const { setOpen, open, textNotify } = useAuth();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {textNotify}
      </Alert>
    </Snackbar>
  );
};

export default AlertPop;
