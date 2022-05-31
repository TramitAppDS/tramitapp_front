import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/home">
          <img alt="" src="logo.png" width="112" height="28" />
        </a>
      </div>
      <div className="navbar-start">
        <NavLink className="navbar-item" activeClassName="is-active" to="/home">
          <strong>Inicio</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/profile">
          <strong>Perfil</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/sign-in">
          <strong>Ingresar</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/sign-up">
          <strong>Registrarse</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/request-procedure">
          <strong>Solicitar Tramite</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/tramiter-sign-in">
          <strong>Comenzar a Tramitar</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/tramiter-sign-up">
          <strong>Crear cuenta Traimter</strong>
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {currentUser && (
            <Button
              className="button is-white"
              activeClassName="is-active"
              onClick={handleUserLogout}
            >
              Cerrar sesion
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
