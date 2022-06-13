/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function UserProcedureInfo(prop) {
  const { procedure } = prop;
  const { currentUser } = useAuth();
  const [tramiter, setTramiter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(false);
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

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    object.userId = currentUser.id;
    const body = JSON.stringify(object);
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body,
    };
    fetch(`${process.env.REACT_APP_API_URL}/procedures/rating/${procedure.id}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }

  if (!currentUser) return <Navigate to="/home" />;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (currentUser.type !== "user") return <Navigate to="/home" />;
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
        {procedure.status === 2 && !(procedure.rating >= 0) ? (
          <>
            <div>Tramite completado </div>
            <div>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Rating</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="rating"
                    name="rating"
                    label="Rating"
                    onChange={() => setSelect(true)}
                    required
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={0.5}>0.5</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={2.5}>2.5</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={3.5}>3.5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={4.5}>4.5</MenuItem>
                    <MenuItem value={5}>5.0</MenuItem>
                  </Select>
                </FormControl>
                <Button disabled={!select} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Calificar
                </Button>
              </Box>
            </div>
          </>
        ) : (
          <p className="is-size-5">
            <strong>Rating: </strong>
            {procedure.rating}
          </p>
        )}
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
