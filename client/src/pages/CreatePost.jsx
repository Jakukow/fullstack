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
    <form
      style={{
        margin: "auto",

        display: "flex",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",

        flexDirection: "column",
        width: "20%",
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
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField autoComplete="false" label="Username" {...field} />
        )}
      />
      <Button type="submit" variant="outlined">
        Create new Post
      </Button>
    </form>
  );
};

export default CreatePost;
