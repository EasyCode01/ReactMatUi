import { Grid } from "@mui/material";
import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../Context/Context";

const Products = ({ item }) => {
  const { addToCart, cartState } = useAppContext();
  const { description, image, title, id, price } = item;

  const storedProduct = cartState.find((cart) => cart.id === item.id);

  const isSelected = storedProduct ? true : false;

  return (
    <Grid item sm={6} md={4}>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {title.slice(0, 30)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description.slice(0, 100)}
          </Typography>
          <Typography mt={1} variant="h6">
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ cursor: isSelected ? "not-allowed" : "pointer" }}
            onClick={() => addToCart(id)}
            variant="contained"
            size="small"
            disabled={isSelected}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Products;
