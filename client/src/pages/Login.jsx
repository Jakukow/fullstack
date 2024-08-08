import { Button, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const login = async () => {
    const data = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        data
      );

      if (response.data.error) alert(response.data.error);
      else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
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

        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <Button onClick={login} variant="outlined" sx={{ width: "100%" }}>
          Log In
        </Button>
        <Button
          onClick={() => navigate("/sigin")}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          Sign up
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          HOME PAGE
        </Button>
      </div>
    </div>
  );
};
