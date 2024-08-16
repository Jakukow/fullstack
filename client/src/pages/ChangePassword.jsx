import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Button, TextField } from "@mui/material";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  const changePass = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(data);
      if (data.error) {
        setIsError(true);
        setErrorMsg(data.error);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
          gap: "2rem",
        }}
      >
        <h1>
          <strong>Change Your Password</strong>
        </h1>
        <form onSubmit={changePass} style={{ display: "flex", gap: "1rem" }}>
          <TextField
            required
            error={isError}
            value={oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={(e) => {
              if (isError) setIsError(false);
              setOldPassword(e.target.value);
            }}
          />
          <TextField
            required
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <Button type="submit" variant="outlined">
            Save Changes
          </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangePassword;
