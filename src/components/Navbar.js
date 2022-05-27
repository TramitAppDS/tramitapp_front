import React, { useState } from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-start">
        <NavLink className="navbar-item" activeClassName="is-active" to="/home">
          <strong>Inicio</strong>
        </NavLink>

        <NavLink className="navbar-item" activeClassName="is-active" to="/profile">
        <strong>Perfil</strong>
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
};

export default Navbar;