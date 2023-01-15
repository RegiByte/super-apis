import { Route } from "react-router-dom";
import React from "react";
import { NavbarLayout } from "../core/layouts/NavbarLayout/NavbarLayout";
import { Todos } from "./pages/Todos/Todos";

export const TodoRoutes: React.ReactNode = (
  <Route path="/todos" element={<NavbarLayout />}>
    <Route path="" element={<Todos />} />
  </Route>
);
