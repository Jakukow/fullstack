import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        sessionStorage.setItem("accessToken", response.data);
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
      <div>
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

        <Button onClick={login} sx={{ width: "100%" }}>
          Log In
        </Button>
      </div>
    </div>
  );
};
