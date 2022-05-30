import React from "react";
import useAuth from "../hooks/useAuth";

export default function home() {
  const { currentUser, handleUserLogout } = useAuth();
  return (
    <div>
      <h1> Inicio tramitapp </h1>
      {currentUser && (
        <h4>
          Hello {currentUser.firstName} {currentUser.type}
          <button type="button" onClick={handleUserLogout}>
            Logout
          </button>
        </h4>
      )}
    </div>
  );
}
