import axios from "axios";

import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../helpers/AuthContext";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object()
  .shape({
    oldPassword: yup.string().required("Old password is required"),
    newPassword: yup.string().required("New password is required"),
  })
  .required();

const ChangePassword = () => {
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
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { setOpen, setTextNotify } = useAuth();

  const changePass = async ({ oldPassword, newPassword }) => {
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
      if (data.error) {
        setError("oldPassword", { message: data.error });
        setError("newPassword", { message: data.error });
      } else {
        setOpen(true);
        setTextNotify("Password has been changed");
        navigate("/");
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
        <form
          onSubmit={handleSubmit(changePass)}
          style={{ display: "flex", gap: "1rem" }}
        >
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...register("oldPassword")}
                error={!!errors.oldPassword}
                helperText={
                  errors.oldPassword ? errors.oldPassword.message : ""
                }
                label="Old Password"
                {...field}
                onChange={async (e) => {
                  clearErrors("oldPassword");

                  field.onChange(e);
                }}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={
                  errors.newPassword ? errors.newPassword.message : ""
                }
                label="New Password"
                {...field}
                onChange={async (e) => {
                  clearErrors("newPassword");
                  field.onChange(e);
                }}
              />
            )}
          />
          <Button type="submit" variant="outlined">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
