import { Button, TextField } from "@mui/material";
import axios from "axios";

import { Controller, useForm } from "react-hook-form";

const Sigin = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      console.log(response);
    });
  };

  return (
    <main>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
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
    </main>
  );
};

export default Sigin;
