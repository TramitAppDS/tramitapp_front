/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Button from "@mui/material/Button";

export default function TramiterProcedureInfo(prop) {
  const { procedure } = prop;
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${procedure.userId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return null;
        }
        return response.json();
      })
      .then(setUser)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  function handleSubmit() {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/procedures/advance/${procedure.id}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(setErrorMessage)
      .then(() => setLoading(false))
      .then(() => {
        procedure.status += 1;
      })
      .then(() =>
        navigate("/tramiter-procedure-info", {
          state: { procedure },
        })
      )
      .finally(() => window.location.reload());
  }

  if (!currentUser) return <Navigate to="/home" />;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (currentUser.type !== "tramiter") return <Navigate to="/home" />;
  if (procedure.tramiterId !== currentUser.id) return <Navigate to="/home" />;

  return (
    <div style={{ textAlign: "center" }}>
      <p>{errorMessage}</p>
      <br />
      {user !== null && (
        <>
          <h1 className="title is-2">
            {" "}
            {user.firstName} {user.lastName}{" "}
          </h1>
          <p className="is-size-5">
            <strong>Email: </strong>
            {user.email}
          </p>
        </>
      )}
      <br />
      <h1 className="title is-2">Estado actual del trámite:</h1>
      <p className="is-size-5">
        <strong>Status: </strong>
        {procedure.status === 1 && "Trámite en proceso"}
        {procedure.status === 2 && "Trámite Finalizado"}
      </p>
      <br />
      <p className="is-size-5">
        {procedure.status !== 2 && (
          <>
            <div>Reportar avance </div>
            <div>
              <Button
                type="button"
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Trámite finalizado
              </Button>
            </div>
          </>
        )}
      </p>
      <p className="is-size-5">
        <strong>Patente: </strong>
        {procedure.plate}
      </p>
      <p className="is-size-5">
        <strong>Dirección: </strong>
        {procedure.address}
      </p>
      <p className="is-size-5">
        <strong>Comentarios: </strong>
        {procedure.comments}
      </p>
      <p className="is-size-5">
        <strong>Precio: </strong>
        {procedure.price}
      </p>
      <p className="is-size-5">
        <strong>Calificación: </strong>
        {procedure.rating}
      </p>
    </div>
  );
}
