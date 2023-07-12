import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import CartPage from "../Page/CartPage";
import Login from "../Page/Login";

export const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "cart", element: <CartPage /> },
    { path: "login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};
