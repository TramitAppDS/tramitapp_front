import React from "react";
import { Navigate, Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import useAuth from "hooks/useAuth";
import Button from "@mui/material/Button";

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
            {currentUser.rating ? (
              <StarRatings
                rating={currentUser.rating}
                starRatedColor="yellow"
                starDimension="20px"
                name="rating"
              />
            ) : (
              "Sin calificaciones"
            )}
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

          <br />

          <p className="is-size-5">
            <strong>Información de Pago</strong>
          </p>

          {currentUser.bank ? (
            <div>
              <p className="is-size-5">
                <strong>Banco: </strong>
                {currentUser.bank}
              </p>

              <p className="is-size-5">
                <strong>Tipo de Cuenta: </strong>
                {currentUser.accountType}
              </p>

              <p className="is-size-5">
                <strong>Nro de Cuenta: </strong>
                {currentUser.accountNumber}
              </p>

              <p className="is-size-5">
                <strong>RUT: </strong>
                {currentUser.rut}
              </p>
            </div>
          ) : (
            <p className="is-size-5"> Actualmente no presenta información de pago </p>
          )}

          <br />

          <p>
            <Button component={Link} to="/edit-payment-info" variant="contained">
              Editar Datos de Pago
            </Button>
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
