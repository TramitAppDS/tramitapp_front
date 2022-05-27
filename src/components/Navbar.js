import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
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

        <NavLink className="navbar-item" activeClassName="is-active" to="/tramiter-sign-in">
          <strong>Comenzar a Tramitar</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/tramiter-sign-up">
          <strong>Crear cuenta Traimter</strong>
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <NavLink className="button is-white" activeClassName="is-active" to="/home">
            <strong>Realizar tramite</strong>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
