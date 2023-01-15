import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Root } from "./modules/core/pages/Root/Root";
import { Login } from "./modules/core/pages/Login/Login";
import { Register } from "./modules/core/pages/Register/Register";
import { Home } from "./modules/core/pages/Home/Home";
import { TodoRoutes } from "./modules/todos/TodoRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {TodoRoutes}
    </Route>,
  ),
  {
    basename: "/",
  },
);
