import React from "react";
import useAuth from "hooks/useAuth";

import AvailableProceduresPage from "layouts/procedures/available-procedures";
import UserProceduresPage from "layouts/user/my-procedures";

export default function home() {
  const { currentUser } = useAuth();

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
