import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/Context";
import { Link } from "react-router-dom";

const Navbar = ({ theme }) => {
  let { cartState } = useAppContext();
  const [savedUser, setSavedUser] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setSavedUser(() => JSON.parse(user));
    }
  }, []);
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: theme ? "royalblue" : "royalblue",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 1 }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
            {" "}
            Shopping Cart
          </Link>
        </Typography>

        <Stack
          direction="row"
          sx={{ position: "relative", width: "280px" }}
          component="form"
        >
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              paddingRight: 48,
              border: "1px solid #ccc",
            }}
            type="text"
            placeholder="search..."
          />

          <IconButton sx={{ position: "absolute", right: "5px" }} type="submit">
            <SearchIcon />
          </IconButton>
        </Stack>
        {savedUser && (
          <Typography color="#fff" variant="h6">
            Welcome {savedUser}
          </Typography>
        )}
        <Stack
          sx={{ color: "#fff" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Link
            to="cart"
            style={{
              backgroundColor: "royalblue",
              padding: "2px 4px",
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ShoppingCartIcon />
            {cartState.length}
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
