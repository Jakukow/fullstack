import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import { useEffect } from "react";

const CreatePost = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      postText: "",
    },
  });
  useEffect(() => {
    checkAuth();
  }, []);
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });

      navigate("/");
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
            <TextField autoComplete="false" label="Title" {...field} />
          )}
        />
        <Controller
          name="postText"
          control={control}
          render={({ field }) => (
            <TextField autoComplete="false" label="Post Text" {...field} />
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
