import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/home" />;

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1 className="title is-2">
        {" "}
        {currentUser.firstName} {currentUser.lastName}{" "}
      </h1>

      {currentUser.type === "tramiter" && (
        <>
          <p className="is-size-5">
            <strong>Calificación: </strong>
            {currentUser.rating}
          </p>
          <p className="is-size-5">
            <strong>Telefono: </strong>
            {currentUser.phone}
          </p>
          <p className="is-size-5">
            <strong>Email: </strong>
            {currentUser.email}
          </p>
          <p className="is-size-5">
            <strong>Ciudad: </strong>
            {currentUser.city}
          </p>
          <p className="is-size-5">
            <strong>Comuna: </strong>
            {currentUser.commune}
          </p>
        </>
      )}
      {currentUser.type === "user" && (
        <>
          <p className="is-size-5">
            <strong>Telefono: </strong>
            {currentUser.phone}
          </p>
          <p className="is-size-5">
            <strong>Email: </strong>
            {currentUser.email}
          </p>
        </>
      )}
    </div>
  );
}
