/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import Procedure from "./Procedure";

export default function MyProcedures({ currentUser }) {
  const [procedures, setProcedures] = useState([]);
  async function getProcedures() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/procedures`, requestOptions);
    setProcedures(await response.json());
  }
  useEffect(() => {
    getProcedures();
  }, []);
  return (
    <div>
      <h1> Tramites: </h1>
      {procedures.map((procedure) => (
        <Procedure procedure={procedure} />
      ))}
    </div>
  );
}
