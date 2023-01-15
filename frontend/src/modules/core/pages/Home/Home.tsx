import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

export const Home = () => {
  const { user, logout } = useAuth({ middleware: "guest" });

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar user={user} />
      {user ? (
        <div>
          Bem vindo(a), {user?.name}
        </div>
      ) : (
        <div>
          Você está descontado.
        </div>
      )}
    </>
  );
};
