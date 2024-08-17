import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../helpers/AuthContext";

const schema = yup

  .object()
  .shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
const Sigin = () => {
  const navigate = useNavigate();
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

  const { setOpen, setTextNotify } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth", data);
      if (response.data.error) {
        setError("username", { message: response.data.error });
        setError("password", { message: response.data.error });
      } else {
        setTextNotify("User has been successfully created!");
        setOpen(true);
        navigate("/login");
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
        onSubmit={handleSubmit(onSubmit)}
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
          Register
        </Button>
        <Typography sx={{ fontSize: "small", textAlign: "center" }}>
          Already have account?{" "}
          <Link to="/login">
            <strong>Log in!</strong>
          </Link>
        </Typography>
      </form>
    </main>
  );
};

export default Sigin;
