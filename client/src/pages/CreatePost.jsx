import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import { useEffect } from "react";

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
    postText: yup.string().required("Post text is required"),
  })
  .required();

const CreatePost = () => {
  const { checkAuth, setOpen, setTextNotify } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      postText: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    checkAuth();
  }, []);
  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/posts",
        formData,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      if (!data.error) {
        setTextNotify("Post has been created!");
        setOpen(true);
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
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "1rem",

          width: "20%",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...register("title")}
              autoComplete="false"
              label="Title"
              {...field}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
            />
          )}
        />
        <Controller
          name="postText"
          control={control}
          render={({ field }) => (
            <TextField
              {...register("postText")}
              autoComplete="false"
              label="Post Text"
              {...field}
              error={!!errors.postText}
              helperText={errors.postText ? errors.postText.message : ""}
            />
          )}
        />

        <Button type="submit" variant="outlined">
          Create new Post
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          variant="outlined"
        >
          Homepage
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
