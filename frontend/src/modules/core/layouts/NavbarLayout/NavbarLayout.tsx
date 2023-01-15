import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

export const NavbarLayout = () => {
  const { user } = useAuth({
    middleware: "guest",
  });
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
};
