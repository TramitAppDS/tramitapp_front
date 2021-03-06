import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

import AvailableProceduresPage from "layouts/procedures/available-procedures";
import UserProceduresPage from "layouts/user/my-procedures";
import PendingTramitersPage from "layouts/admin/pending-tramiters";

export default function home() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/sign-in" />;

  return (
    <div>
      {currentUser && (
        <div>
          {currentUser.type === "user" && !currentUser.admin && (
            <UserProceduresPage currentUser={currentUser} />
          )}
          {currentUser.type === "tramiter" && <AvailableProceduresPage currentUser={currentUser} />}
          {currentUser.type === "user" && currentUser.admin && (
            <PendingTramitersPage currentUser={currentUser} />
          )}
        </div>
      )}
    </div>
  );
}
