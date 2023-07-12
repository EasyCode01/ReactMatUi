import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import Products from "./Products";
import { useAppContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { products, error, cartState, order, clearFilters } = useAppContext();
  const [saveduser, setSavedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (!savedUser) {
      return navigate("/login");
    }
    setSavedUser(savedUser);
  });

  const transformProducts = () => {
    let sortedProducts = products;

    if (order) {
      sortedProducts = sortedProducts.sort((a, b) =>
        order === "Ascending" ? a.price - b.price : b.price - a.price
      );
    }

    return sortedProducts;
  };

  return (
    <>
      {saveduser ? (
        <Container
          sx={{
            marginTop: "30px",
            maxHeight: "100vh",
            overflow: "scroll",
          }}
          maxWidth="xl"
        >
          <Grid
            container
            spacing={3}
            sx={{ height: "100%", overflow: "auto", position: "relative" }}
          >
            <Grid
              sx={{
                display: { xs: "none", md: "block" },
              }}
              item
              sm={4}
              md={3}
            >
              <FilterProduct />
            </Grid>
            <Grid item sm={12} md={9}>
              <Grid container justifyContent="center" spacing={3}>
                {error ? (
                  <h1 style={{ paddingTop: "30px" }}>Error! fetching Data</h1>
                ) : (
                  transformProducts() &&
                  transformProducts().map((product, idx) => {
                    if (product.id === cartState[idx]?.id) {
                      return <Products key={idx} item={cartState[idx]} />;
                    }
                    return <Products item={product} key={idx} />;
                  })
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
