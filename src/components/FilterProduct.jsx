import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../Context/Context";

const FilterProduct = () => {
  let { handleOrder, clearFilters } = useAppContext();
  return (
    <Stack
      sx={{
        backgroundColor: "",
        padding: "10px 15px",
        borderRadius: "8px",
        boxShadow: "1px 3px 5px rgba(0,0,0,.3)",
        height: "calc(100vh - 100px)",
      }}
      spacing={3}
    >
      <Typography variant="h5">Filter Product</Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          //   value={value}
          //   onChange={handleChange}
        >
          <FormControlLabel
            value="Ascending"
            control={<Radio />}
            label="Ascending"
            onChange={(e) => handleOrder(e)}
          />
          <FormControlLabel
            value="Descending"
            control={<Radio />}
            label="Descending"
            onChange={(e) => handleOrder(e)}
          />
        </RadioGroup>
      </FormControl>
      <Typography>Ratings</Typography>
      <Button onClick={clearFilters} variant="contained">
        Clear filters
      </Button>
    </Stack>
  );
};

export default FilterProduct;
