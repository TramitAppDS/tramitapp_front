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

export default function TramiterProcedureInfo(prop) {
  const { procedure } = prop;
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
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
    fetch(`${process.env.REACT_APP_API_URL}/procedures/avance/${procedure.id}`, requestOptions)
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


  if (currentUser.type !== "tramiter") return <Navigate to="/home" />;
  if (procedure.tramiterId !== currentUser.id) return <Navigate to="/home" />;

  return (
    <div style={{ textAlign: "center" }}>
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
        {procedure.status}
      </p>
      <p className="is-size-5">
        {procedure.status !== 2 && (
          <>
            <div>Reportar avance </div>
            <div>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">Estado del trámite</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="status"
                    name="status"
                    label="Status"
                    onChange={() => setSelect(true)}
                    required
                  >
                    {procedure.status === 0 && (
                      <>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                      </>
                    )}
                    {procedure.status === 1 && <MenuItem value={2}>2</MenuItem>}
                  </Select>
                </FormControl>
                <Button disabled={!select} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Reportar
                </Button>
              </Box>
            </div>
          </>
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
