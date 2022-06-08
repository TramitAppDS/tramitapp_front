import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function ProcedureInfo({ procedure }) {
  const { currentUser } = useAuth();
  const [tramiter, setTramiter] = useState(null);
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
    fetch(`${process.env.REACT_APP_API_URL}/tramiters/${procedure.tramiterId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return null;
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
      {!tramiter && <h1 className="title is-2">Conectando con un Tramiter...</h1>}

      {tramiter !== null && (
        <>
          <h1 className="title is-2">
            {" "}
            {tramiter.firstName} {tramiter.lastName}{" "}
          </h1>
          <p className="is-size-5">
            <strong>Calificación: </strong>
            {tramiter.rating ? tramiter.rating : "El Tramiter no ha sido calificado"}
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
        </>
      )}
      <br />
      <h1 className="title is-2">Estado actual del trámite:</h1>
      <p className="is-size-5">
        <strong>Status: </strong>
        {procedure.status}
      </p>
      <p className="is-size-5">
        <strong>Tipo: </strong>
        {procedure.type}
      </p>
      <p className="is-size-5">
        <strong>Comentarios: </strong>
        {procedure.comments}
      </p>
      <p className="is-size-5">
        <strong>Precio: </strong>
        {procedure.price}
      </p>
    </div>
  );
}
