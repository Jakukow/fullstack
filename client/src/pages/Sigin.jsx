import { Button, TextField } from "@mui/material";
import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Sigin = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
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
        display: "flex",
        flexDirection: "column",
        width: "20%",
        gap: "2rem",
        margin: "auto",
        height: "100vh",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => <TextField label="Username" {...field} />}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField type="password" label="Password" {...field} />
        )}
      />
      <Button type="submit" variant="outlined">
        Create New User
      </Button>
    </form>
  );
};

export default Sigin;
