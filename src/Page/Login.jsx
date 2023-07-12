import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setLoginDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginDetails.username,
        password: loginDetails.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network request was not ok");
        }
        return res.json();
      })
      .then((json) => {
        sessionStorage.setItem("user", JSON.stringify(loginDetails.username));
        navigate("/");
      })
      .catch((err) => console.log(err.message, "doest get here"));
  };
  return (
    <Stack
      gap={3}
      alignItems="center"
      padding={5}
      height={90}
      className="login"
    >
      <Typography variant="h4">E-zzy store</Typography>
      <Stack
        onSubmit={handleLogin}
        boxShadow="1px 3px 5px rgba(0,0,0,.4)"
        width="400px"
        maxWidth="90%"
        component="form"
        gap={3}
        padding={2}
        borderRadius="8px"
      >
        <Typography textAlign="center" variant="h6">
          Login to E-zzy Store
        </Typography>
        <input
          className="login-input"
          onChange={(e) => handleOnchange(e)}
          type="text"
          name="username"
          placeholder="Enter username"
          value={loginDetails.username}
        />
        <input
          className="login-input"
          onChange={(e) => handleOnchange(e)}
          type="password"
          name="password"
          placeholder="Enter password"
          value={loginDetails.password}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
