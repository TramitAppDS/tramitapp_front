import React from "react";
import useAuth from "../hooks/useAuth";

import MyProcedures from "../components/MyProcedures";

export default function home() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1> Inicio tramitapp </h1>
      {currentUser && (
        <h4>
          Hello {currentUser.firstName} {currentUser.type}
          {currentUser.type === "user" && <MyProcedures currentUser={currentUser} />}
        </h4>
      )}
    </div>
  );
}
