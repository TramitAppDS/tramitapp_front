import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function ProcedureInfo({ procedure }) {
  const { currentUser } = useAuth();
  const [tramiter, setTramiter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${procedure.tramiterId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return 0;
        }
        return response.json();
      })
      .then(setTramiter)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (procedure.userId !== currentUser.id) return <Navigate to="/home" />;

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1 className="title is-2">
        {" "}
        {tramiter.firstName} {tramiter.lastName}{" "}
      </h1>

      <p className="is-size-5">
        <strong>Calificación: </strong>
        {tramiter.rating}
      </p>
      <p className="is-size-5">
        <strong>Telefono: </strong>
        {tramiter.phone}
      </p>
      <p className="is-size-5">
        <strong>Email: </strong>
        {tramiter.email}
      </p>
      <p className="is-size-5">
        <strong>Ciudad: </strong>
        {tramiter.city}
      </p>
      <p className="is-size-5">
        <strong>Comuna: </strong>
        {tramiter.commune}
      </p>
    </div>
  );
}
