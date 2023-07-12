import React from "react";
import { useAppContext } from "../Context/Context";
import { Box, Stack, Typography } from "@mui/material";

const CartPage = () => {
  const { cartState, incQty, decQty, removeItemFromCart, totalPrice } =
    useAppContext();

  return (
    <div>
      {cartState.length === 0 ? (
        <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
          The cart is empty
        </h2>
      ) : (
        <>
          <Box height="80vh" overflow="auto">
            {cartState.map((cart, idx) => (
              <Stack
                key={idx}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                width="90%"
                margin={{ margin: "5px auto" }}
                sx={{ borderBottom: "2px solid #ccc", paddingBottom: "5px" }}
              >
                <Box style={{ flex: 3 }}>
                  <img src={cart.image} style={{ height: "100px" }} alt="" />
                  <Typography variant="body1">
                    {cart.title.slice(0, 30)}
                  </Typography>
                  <Typography variant="h6">${cart.price}</Typography>
                </Box>
                <Stack style={{ flex: 2 }} direction="row">
                  <span onClick={() => decQty(cart.id)} className="inc-dec">
                    -
                  </span>
                  <Typography sx={{ margin: "0 8px" }} variant="body1">
                    {cart.qty}
                  </Typography>
                  <span onClick={() => incQty(cart.id)} className="inc-dec">
                    +
                  </span>
                </Stack>
                <Box
                  style={{ flex: 1, textAlign: "right", justifySelf: "end" }}
                >
                  <span
                    onClick={() => removeItemFromCart(cart.id)}
                    className="remove-item"
                  >
                    &times;
                  </span>
                </Box>
              </Stack>
            ))}
          </Box>
          <Typography
            sx={{ textAlign: "right", marginTop: "10px", marginRight: "40px" }}
            variant="h5"
          >
            Subtotal: ${totalPrice}
          </Typography>
        </>
      )}
    </div>
  );
};

export default CartPage;
