import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const Login = () => {
  const {
    control,
    clearErrors,

    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { setAuthState, open, setOpen, textNotify } = useAuth();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const login = async ({ username, password }) => {
    const data = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        data
      );

      if (response.data.error) {
        setError("username", { message: response.data.error });
        setError("password", { message: response.data.error });
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          gap: "2rem",
          margin: "auto",
          marginTop: "10%",
          padding: "3rem",

          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
        onSubmit={handleSubmit(login)}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              label="Username"
              {...field}
              onChange={async (e) => {
                clearErrors("username");

                field.onChange(e);
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              label="Password"
              {...field}
              onChange={async (e) => {
                clearErrors("password");
                field.onChange(e);
              }}
            />
          )}
        />
        <Button type="submit" variant="outlined">
          Log in
        </Button>
        <Typography sx={{ fontSize: "small", textAlign: "center" }}>
          Don`t have an account?
          <Link to="/sigin">
            <strong> Sign up!</strong>
          </Link>
        </Typography>
      </form>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {textNotify}
        </Alert>
      </Snackbar>
    </main>
  );
};
