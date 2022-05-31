/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import Procedure from "./Procedure";

export default function MyProcedures({ currentUser }) {
  const [procedures, setProcedures] = useState([]);
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
    fetch(`${process.env.REACT_APP_API_URL}/procedures`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return [];
        }
        return response.json();
      })
      .then(setProcedures)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <p>{errorMessage}</p>
      <h1> Tramites: </h1>
      {procedures.map((procedure) => (
        <Procedure procedure={procedure} />
      ))}
    </div>
  );
}
