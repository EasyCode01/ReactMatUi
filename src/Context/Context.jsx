import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const getCartData = () => {
    const cartData = localStorage.getItem("cart-state");
    if (cartData) {
      return JSON.parse(cartData);
    } else {
      return [];
    }
  };

  const [cartState, setCartState] = useState(getCartData());

  // fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  }, []);

  // set ascending order
  const [order, setOrder] = useState("");

  const handleOrder = (e) => {
    setOrder(e.target.value);
  };

  const clearFilters = () => {
    setOrder("");
    console.log(order);
  };

  // set data to local storage
  useEffect(() => {
    localStorage.setItem("cart-state", JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = (id) => {
    const seletedItem = products.find((prod) => prod.id === id);
    if (seletedItem === undefined) return;
    else {
      setCartState((prev) => [{ ...seletedItem, qty: 1 }, ...prev]);
    }
  };

  const incQty = (id) => {
    const checkProductInCart = cartState.find((cart) => cart.id === id);

    if (checkProductInCart) {
      const updatedCartItem = cartState.map((cart) => {
        if (cart.id === id) {
          return { ...cart, qty: cart.qty + 1 };
        }
        return cart;
      });

      setCartState(updatedCartItem);
    }
  };

  const decQty = (id) => {
    const checkProductInCart = cartState.find((cart) => cart.id === id);
    if (checkProductInCart) {
      const updatedCartItem = cartState.map((cart) => {
        if (cart.id === id) {
          return { ...cart, qty: cart.qty - 1 < 1 ? 1 : cart.qty - 1 };
        }

        return cart;
      });
      setCartState(updatedCartItem);
    }
  };

  // set total cart price

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    totalCartItemPrice();
  }, [cartState]);

  const totalCartItemPrice = () => {
    const total = cartState
      .map((item) => item.price * item.qty)
      .reduce((total, current) => total + current, 0)
      .toFixed(2);
    setTotalPrice(total);
  };

  const removeItemFromCart = (id) => {
    const updatedCartItem = cartState.filter((cart) => cart.id !== id);
    setCartState(updatedCartItem);
  };
  return (
    <AppContext.Provider
      value={{
        products,
        cartState,
        order,
        handleOrder,
        clearFilters,
        addToCart,
        incQty,
        decQty,
        removeItemFromCart,
        totalPrice,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
