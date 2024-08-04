import { useState } from "react";
import TextField from "@mui/material/TextField";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      postText: "",
      username: "",
    },
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField label="Title" {...field} />}
      />
      <Controller
        name="postText"
        control={control}
        render={({ field }) => <TextField label="Post Text" {...field} />}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => <TextField label="Username" {...field} />}
      />
      <Button type="submit" variant="outlined">
        Create new Post
      </Button>
    </form>
  );
};

export default CreatePost;
