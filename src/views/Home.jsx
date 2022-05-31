import React from "react";
import useAuth from "../hooks/useAuth";

import MyProcedures from "../components/MyProcedures";

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
          {currentUser.type === "user" && <MyProcedures currentUser={currentUser} />}
        </h4>
      )}
    </div>
  );
}
