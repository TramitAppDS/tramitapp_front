import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

import AvailableProceduresPage from "layouts/procedures/available-procedures";
import UserProceduresPage from "layouts/user/my-procedures";

export default function home() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/sign-in" />;

  return (
    <div>
      <h1> Inicio tramitapp </h1>
      {currentUser && (
        <h4>
          Hello {currentUser.firstName} {currentUser.type}
          {currentUser.type === "user" && <UserProceduresPage currentUser={currentUser} />}
          {currentUser.type === "tramiter" && <AvailableProceduresPage currentUser={currentUser} />}
        </h4>
      )}
    </div>
  );
}
